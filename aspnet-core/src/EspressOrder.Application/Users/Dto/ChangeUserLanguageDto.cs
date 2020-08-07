using System.ComponentModel.DataAnnotations;

namespace EspressOrder.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}