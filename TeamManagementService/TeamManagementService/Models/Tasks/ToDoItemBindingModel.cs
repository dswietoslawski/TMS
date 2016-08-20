using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Projects;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models.Tasks {
    public class ToDoItemBindingModel {
        public int Id { get; set; }
        
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        [Required]
        public int TeamId { get; set; }

        public string UserId { get; set; }
        public ToDoItemType Type { get; set; }
    }
}
