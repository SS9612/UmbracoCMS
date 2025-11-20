using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Antiforgery;

namespace UmbracoCMS.Filters
{
    public class SafeValidateAntiForgeryTokenAttribute : Attribute, IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var antiforgery = context.HttpContext.RequestServices.GetService(typeof(IAntiforgery)) as IAntiforgery;
            if (antiforgery == null)
            {
                return;
            }

            try
            {
                await antiforgery.ValidateRequestAsync(context.HttpContext);
            }
            catch (AntiforgeryValidationException)
            {
                context.ModelState.AddModelError(string.Empty, "The anti-forgery token validation failed. Please try again.");
            }
        }
    }
}

