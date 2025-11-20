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
        IFormSubmissionsService formSubmissions,
        IEmailSender emailSender,
        ILogger<FormController> logger) : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        private readonly IFormSubmissionsService _formSubmissions = formSubmissions;
        private readonly IEmailSender _emailSender = emailSender;
        private readonly ILogger<FormController> _logger = logger;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> HandleCallbackForm(CallbackFormViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .Select(x => $"{x.Key}: {string.Join(", ", x.Value?.Errors.Select(e => e.ErrorMessage) ?? Enumerable.Empty<string>())}")
                    .ToList();
                
                _logger.LogWarning("ModelState is invalid. Errors: {Errors}", string.Join("; ", errors));
                
                TempData["FormValidationErrors"] = string.Join("; ", errors);
                return RedirectToCurrentUmbracoPage();
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

            var result = await _formSubmissions.SaveCallbackRequestAsync(model);
            if (!result)
            {
                TempData["FormError"] = "Something went wrong while submitting your request. Please try again later.";
                return RedirectToCurrentUmbracoPage();
            }

            try
            {
                await SendConfirmationEmailAsync(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send confirmation email");
            }

            TempData["FormSuccess"] = "Thank you! Your request has been received and we will get back to you soon";
            TempData["CallbackFormSuccess"] = string.IsNullOrWhiteSpace(model.FormId) ? "callback-request" : model.FormId;
            TempData["CallbackFormRecipient"] = model.Name ?? model.Email ?? string.Empty;

            return RedirectToCurrentUmbracoPage();
        }

        private void PopulateFormOptions(CallbackFormViewModel model)
        {
            if (model?.Options?.Any() == true) return;

            try
            {
                var current = UmbracoContext?.PublishedRequest?.PublishedContent;
                var servicePage = current?.Root()?.ChildrenOfType(ContentModels.ServicePage.ModelTypeAlias)?.FirstOrDefault();
                var options = servicePage?.ChildrenOfType(ContentModels.ServiceDetail.ModelTypeAlias)
                    ?.Select(x => x.Name)
                    ?.Where(x => !string.IsNullOrWhiteSpace(x))
                    ?.Distinct(StringComparer.OrdinalIgnoreCase)
                    ?.ToList();

                if (options?.Any() == true && model != null)
                {
                    model.Options = options;
                    model.FormId = model.FormId ?? "callback-request";
                    return;
                }
            }
            catch { }

            if (model != null)
            {
                model.Options = new[] { "Financial consulting", "Business consulting", "Tax planning" };
                model.FormId = model.FormId ?? "callback-request";
            }
        }

        private async Task SendConfirmationEmailAsync(CallbackFormViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model?.Email)) return;

            var fromEmail = "stefan.m.strandberg@hotmail.com";
            var fromName = "Onatrix";

            try
            {
#pragma warning disable 618
                var siteSettings = UmbracoContext?.Content?.GetAtRoot()?.OfType<ContentModels.SiteSettings>()?.FirstOrDefault();
#pragma warning restore 618
                if (siteSettings != null)
                {
                    fromEmail = siteSettings.ContactEmail ?? fromEmail;
                    fromName = siteSettings.SiteName ?? fromName;
                }
            }
            catch { }

            var message = new EmailMessage(
                fromEmail,
                model.Email,
                $"{fromName} – we received your callback request",
                $"""
                <p>Hi {model.Name ?? "there"},</p>
                <p>Thanks for reaching out to {fromName}. We've received your callback request and will be in touch shortly.</p>
                <p><strong>Details</strong></p>
                <ul>
                    <li>Name: {model.Name}</li>
                    <li>Phone: {model.Phone}</li>
                    <li>Selected service: {model.SelectedOption ?? "N/A"}</li>
                </ul>
                <p>We look forward to speaking with you.</p>
                <p>— {fromName}</p>
                """,
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
