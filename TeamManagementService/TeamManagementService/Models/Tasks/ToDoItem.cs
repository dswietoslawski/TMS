using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Models.Tasks {
    public class ToDoItem {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        public virtual Project Team { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual ToDoItemType Type { get; set; }
        public virtual ToDoItemStatus Status { get; set; }
    }
}
