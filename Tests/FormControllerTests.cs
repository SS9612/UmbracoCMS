using System.ComponentModel.DataAnnotations;
using UmbracoCMS.ViewModels;
using Xunit;

namespace UmbracoCMS.Tests
{
    public class FormControllerTests
    {
        [Fact]
        public void CallbackFormViewModel_EmptyForm_FailsValidation()
        {
            var model = new CallbackFormViewModel();
            var context = new ValidationContext(model);
            var results = new List<ValidationResult>();
            
            var isValid = Validator.TryValidateObject(model, context, results, true);
            
            Assert.False(isValid);
        }
    }
}
