using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace UmbracoCMS.ViewModels
{
    public class CallbackFormViewModel
    {
        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Name")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [Display(Name = "Email address")]
        [RegularExpression(
            @"^(([^<>()\[\]\\.,;:\s@\""]+(\.[^<>()\[\]\\.,;:\s@\""]+)*)|(\"".+\""))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$",
            ErrorMessage = "Invalid email address"
        )]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        [Display(Name = "Phone")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Please select an option")]
        public string? SelectedOption { get; set; }

        [BindNever]
        public IEnumerable<string> Options { get; set; } = [];

        public string FormId { get; set; } = string.Empty;
    }
}