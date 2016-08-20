using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Models
{
    public partial class ModelFactory
    {
        public ToDoItemReturnModel Create(ToDoItem toDoItem) {
            return new ToDoItemReturnModel() {
                Description = toDoItem.Description,
                Id = toDoItem.Id,
                Name = toDoItem.Name,
                Team = Create(toDoItem.Team),
                User = Create(toDoItem.User),
                Type = toDoItem.Type
            };
        }

        public ToDoItem Create(ToDoItemBindingModel toDoItem) {
            return new ToDoItem() {
                Description = toDoItem.Description,
                Id = toDoItem.Id,
                Name = toDoItem.Name
            };
        }
    }
}
