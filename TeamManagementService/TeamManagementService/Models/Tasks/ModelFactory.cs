using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Models {
    public partial class ModelFactory {
        public ToDoItemReturnModel Create(ToDoItem toDoItem) {
            return new ToDoItemReturnModel() {
                Description = toDoItem.Description,
                Id = toDoItem.Id,
                Name = toDoItem.Name,
                Team = Create(toDoItem.Team),
                User = Create(toDoItem.User),
                Type = toDoItem.Type.ToString()
            };
        }

        public ToDoItem Create(ToDoItemBindingModel toDoItem) {
            return new ToDoItem() {
                Description = toDoItem.Description,
                Id = toDoItem.Id,
                Name = toDoItem.Name
            };
        }

        public IEnumerable<ToDoItemReturnModel> Create(IEnumerable<ToDoItem> toDoItem) {
            ICollection<ToDoItemReturnModel> result = new List<ToDoItemReturnModel>();

            foreach (var toDo in toDoItem)
                result.Add(Create(toDo));
            return result;
        }
    }
}
