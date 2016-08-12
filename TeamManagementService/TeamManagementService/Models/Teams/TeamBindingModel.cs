using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models.Teams {
    public class TeamBindingModel {

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string AdminUserId { get; set; }
    }
}
