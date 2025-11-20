using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Models.Email;
using Umbraco.Cms.Core.Mail;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Extensions;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using UmbracoCMS.ViewModels;
using UmbracoCMS.Services;
using UmbracoCMS.Filters;
using ContentModels = Umbraco.Cms.Web.Common.PublishedModels;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace UmbracoCMS.Controllers
{
    public class FormController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        FormSubmissionsService formSubmissions,
        IEmailSender emailSender,
        ILogger<FormController> logger) : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        private readonly FormSubmissionsService _formSubmissions = formSubmissions;
        private readonly IEmailSender _emailSender = emailSender;
        private readonly ILogger<FormController> _logger = logger;

        [HttpPost]
        [SafeValidateAntiForgeryToken]
        public async Task<IActionResult> HandleCallbackForm(CallbackFormViewModel model, [FromQuery] string? returnUrl)
        {
            if (model == null)
            {
                return new RedirectResult("/", permanent: false);
            }

            if (!ModelState.IsValid)
            {
                return new RedirectResult("/", permanent: false);
            }

            try
            {
                PopulateFormOptions(model);
            }
            catch
            {
                model.Options = new[] { "Financial consulting", "Business consulting", "Tax planning" };
                model.FormId = string.IsNullOrWhiteSpace(model.FormId) ? "callback-request" : model.FormId;
            }

            var saveResult = await _formSubmissions.SaveCallbackRequestAsync(model);

            if (!saveResult)
            {
                return new RedirectResult("/", permanent: false);
            }

            try
            {
                await SendConfirmationEmailAsync(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send confirmation email");
            }

            TempData["CallbackFormSuccess"] = string.IsNullOrWhiteSpace(model.FormId) ? "callback-request" : model.FormId;
            TempData["CallbackFormRecipient"] = model.Name ?? model.Email ?? string.Empty;

            string redirectUrl = "/";
            if (!string.IsNullOrEmpty(returnUrl))
            {
                try
                {
                    if (Url.IsLocalUrl(returnUrl))
                    {
                        redirectUrl = returnUrl;
                    }
                }
                catch
                {
                    redirectUrl = "/";
                }
            }

            return new RedirectResult(redirectUrl, permanent: false);
        }

        private void PopulateFormOptions(CallbackFormViewModel model)
        {
            if (model == null)
            {
                return;
            }

            if (model.Options != null && model.Options.Any())
            {
                return;
            }

            try
            {
                var current = UmbracoContext?.PublishedRequest?.PublishedContent;
                if (current != null)
                {
                    var root = current.Root();
                    if (root != null)
                    {
                        var servicePages = root.ChildrenOfType(ContentModels.ServicePage.ModelTypeAlias)
                            ?? Enumerable.Empty<IPublishedContent>();
                        var servicePage = servicePages.FirstOrDefault();
                        if (servicePage != null)
                        {
                            var serviceChildren = servicePage.ChildrenOfType(ContentModels.ServiceDetail.ModelTypeAlias)
                                ?? Enumerable.Empty<IPublishedContent>();

                            var serviceOptions = serviceChildren
                                .Select(x => x.Name)
                                .Where(x => !string.IsNullOrWhiteSpace(x))
                                .Distinct(System.StringComparer.OrdinalIgnoreCase)
                                .ToList();

                            if (serviceOptions.Any())
                            {
                                model.Options = serviceOptions;
                                model.FormId = string.IsNullOrWhiteSpace(model.FormId) ? "callback-request" : model.FormId;
                                return;
                            }
                        }
                    }
                }
            }
            catch
            {
            }

            model.Options = new[] { "Financial consulting", "Business consulting", "Tax planning" };
            model.FormId = string.IsNullOrWhiteSpace(model.FormId) ? "callback-request" : model.FormId;
        }

        private async Task SendConfirmationEmailAsync(CallbackFormViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                return;
            }

            string fromEmail = "noreply@onatrix.com";
            string fromName = "Onatrix";

            try
            {
#pragma warning disable 618
                var rootContent = UmbracoContext?.Content?.GetAtRoot() ?? Enumerable.Empty<IPublishedContent>();
#pragma warning restore 618
                var siteSettings = rootContent.OfType<ContentModels.SiteSettings>().FirstOrDefault();
                if (siteSettings != null)
                {
                    fromEmail = !string.IsNullOrWhiteSpace(siteSettings.ContactEmail) ? siteSettings.ContactEmail : fromEmail;
                    fromName = !string.IsNullOrWhiteSpace(siteSettings.SiteName) ? siteSettings.SiteName : fromName;
                }
            }
            catch
            {
            }

            var subject = $"{fromName} – we received your callback request";
            var selectedService = string.IsNullOrWhiteSpace(model.SelectedOption) ? "N/A" : model.SelectedOption;
            var body = $"""
                <p>Hi {model.Name ?? "there"},</p>
                <p>Thanks for reaching out to {fromName}. We've received your callback request and will be in touch shortly.</p>
                <p><strong>Details</strong></p>
                <ul>
                    <li>Name: {model.Name}</li>
                    <li>Phone: {model.Phone}</li>
                    <li>Selected service: {selectedService}</li>
                </ul>
                <p>We look forward to speaking with you.</p>
                <p>— {fromName}</p>
                """;

            var message = new EmailMessage(
                fromEmail,
                model.Email,
                subject,
                body,
                true);

            try
            {
                await _emailSender.SendAsync(message, "callback-confirmation");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send callback confirmation email to {Email}", model.Email);
            }
        }
    }
}
