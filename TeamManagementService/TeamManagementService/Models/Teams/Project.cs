using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Models.Teams {
    public class Project {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        public virtual ApplicationUser Admin { get; set; }
        public virtual ICollection<ApplicationUser> Members { get; set; }
        public virtual ICollection<ToDoItem> Tasks { get; set; }
    }
}