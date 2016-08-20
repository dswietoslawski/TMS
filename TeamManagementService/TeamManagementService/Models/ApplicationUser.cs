using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TeamManagementService.Models.Tasks;
using TeamManagementService.Models.Projects;

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

        public virtual IEnumerable<ToDoItem> Tasks { get; set; }
        public virtual IEnumerable<Project> Groups { get; set; }
    }
}