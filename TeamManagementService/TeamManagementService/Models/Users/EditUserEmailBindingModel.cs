using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeamManagementService.Models.Users
{
    public class EditUserEmailBindingModel
    {
        [Required]
        public string UserId { get; set; }
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string OldEmail { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
