using Umbraco.Cms.Core.Services;
using UmbracoCMS.ViewModels;

namespace UmbracoCMS.Services
{
    public class FormSubmissionsService
    {
        private readonly IContentService _contentService;

        public FormSubmissionsService(IContentService contentService)
        {
            _contentService = contentService;
        }

        public bool SaveCallbackRequest(CallbackFormViewModel model)
        {
            try
            {
                var container = _contentService
                    .GetRootContent()
                    .FirstOrDefault(x => x.ContentType.Alias == "formSubmissions");

                if (container == null)
                    return false;

                var requestName = $"{DateTime.Now:yyyy-MM-dd HH:mm} - {model.Name}";
                var request = _contentService.Create(requestName, container, "callbackRequest");

                request.SetValue("callbackRequestName", model.Name);
                request.SetValue("callbackRequestEmail", model.Email);
                request.SetValue("callbackRequestPhone", model.Phone);
                request.SetValue("callbackRequestOption", model.SelectedOption);

                var saveResult = _contentService.Save(request);
                return saveResult.Success;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}