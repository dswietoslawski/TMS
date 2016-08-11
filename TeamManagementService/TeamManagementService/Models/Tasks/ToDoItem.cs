using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Models.Tasks {
    public class ToDoItem {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        public virtual Team Team { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual ToDoItemType Type { get; set; }
    }
}
