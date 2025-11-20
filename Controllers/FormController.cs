using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using UmbracoCMS.ViewModels;
using UmbracoCMS.Services;
using Umbraco.Extensions;

namespace UmbracoCMS.Controllers
{
    public class FormController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        FormSubmissionsService formSubmissions)
        : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        private readonly FormSubmissionsService _formSubmissions = formSubmissions;
        private readonly IPublishedUrlProvider _publishedUrlProvider = publishedUrlProvider;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult HandleCallbackForm(CallbackFormViewModel model)
        {
            var currentPageUrl = GetCurrentPageUrl();

            if (!ModelState.IsValid)
            {
                return Redirect(currentPageUrl);
            }

            var result = _formSubmissions.SaveCallbackRequest(model);
            if (!result)
            {
                TempData["FormError"] = "Something went wrong while submitting your request. Please try again later.";
                return Redirect(currentPageUrl);
            }

            TempData["FormSuccess"] = "Thank you! Your request has been received and we will get back to you soon";

            return Redirect(currentPageUrl);
        }

        private string GetCurrentPageUrl()
        {
            var currentPage = UmbracoContext?.PublishedRequest?.PublishedContent;
            if (currentPage != null)
            {
                return currentPage.Url(_publishedUrlProvider);
            }

            var request = HttpContext.Request;
            return $"{request.Path}{request.QueryString}";
        }
    }
}
