using System.ComponentModel.DataAnnotations;

namespace TeamManagementService.Models.Tasks {
    public class ToDoItemBindingModel {
        public int Id { get; set; }
        
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}
