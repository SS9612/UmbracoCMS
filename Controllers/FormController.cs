using UmbracoCMS.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Website.Controllers;
using UmbracoCMS.Services;

namespace UmbracoCMS.Controllers
{
    public class FormController(
        IUmbracoContextAccessor umbracoContextAccessor,
        IUmbracoDatabaseFactory databaseFactory,
        ServiceContext services,
        AppCaches appCaches,
        IProfilingLogger profilingLogger,
        IPublishedUrlProvider publishedUrlProvider,
        FormSubmissionsService formSubmissions) : SurfaceController(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
    {
        private readonly FormSubmissionsService _formSubmissions = formSubmissions;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult HandleCallbackForm(CallbackFormViewModel model, [FromQuery] string? returnUrl)
        {
            Console.WriteLine($"Form submitted - ModelState.IsValid: {ModelState.IsValid}");
            Console.WriteLine($"Return URL: {returnUrl}");
            
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Model validation failed");
                // Return to the page we came from
                if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                {
                    return Redirect(returnUrl);
                }
                // Fallback to home if no return URL
                return Redirect("/");
            }

            Console.WriteLine("Saving form submission...");
            var result = _formSubmissions.SaveCallbackRequest(model);
            Console.WriteLine($"Save result: {result}");
            
            if (!result)
            {
                Console.WriteLine("Save failed, adding error to ModelState");
                ModelState.AddModelError("", "There was an error saving your request. Please try again later.");
                if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                {
                    return Redirect(returnUrl);
                }
                return Redirect("/");
            }

            Console.WriteLine("Redirecting to current Umbraco page");
            // Redirect back to the page with a success message
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl + "?success=true");
            }
            return Redirect("/");
        }
    }
}
