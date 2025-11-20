using UmbracoCMS.ViewModels;

namespace UmbracoCMS.Services
{
    public interface IFormSubmissionsService
    {
        Task<bool> SaveCallbackRequestAsync(CallbackFormViewModel model);
    }
}

