using Umbraco.Cms.Core.Services;
using UmbracoCMS.ViewModels;

namespace UmbracoCMS.Services
{
    public class FormSubmissionsService(IContentService contentService) : IFormSubmissionsService
    {
        private readonly IContentService _contentService = contentService;

        public Task<bool> SaveCallbackRequestAsync(CallbackFormViewModel model)
        {
            try
            {
                var container = _contentService.GetRootContent().FirstOrDefault(x => x.ContentType.Alias == "formSubmissions");
                if (container == null)
                    return Task.FromResult(false);

                var requestName = $"{DateTime.Now:yyyy-MM-dd HH:mm} - {model.Name}";
                var request = _contentService.Create(requestName, container, "callbackRequest");

                request.SetValue("callbackRequestName", model.Name);
                request.SetValue("callbackRequestEmail", model.Email);
                request.SetValue("callbackRequestPhone", model.Phone);
                request.SetValue("callbackRequestOption", model.SelectedOption ?? string.Empty);

                var saveResult = _contentService.Save(request);
                return Task.FromResult(saveResult.Success);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving form: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }

            return Task.FromResult(false);
        }
    }
}
