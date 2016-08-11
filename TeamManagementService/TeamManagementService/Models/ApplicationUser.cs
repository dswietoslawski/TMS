using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;

namespace TeamManagementService.Models {
    public class ApplicationUser : IdentityUser {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        public byte Level { get; set; }

        [Required]
        public DateTime JoinTime { get; set; }
    }
}