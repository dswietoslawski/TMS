using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Models.Teams {
    public class Team {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        public virtual ApplicationUser Admin { get; set; }
        public virtual IEnumerable<ApplicationUser> Members { get; set; }
        public virtual IEnumerable<ToDoItem> Tasks { get; set; }
    }
}