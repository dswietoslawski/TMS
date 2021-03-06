﻿using System.Collections.Generic;
using TeamManagementService.Extensions;
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
                Type = toDoItem.Type.ToString(),
                Status = toDoItem.Status.ToString()
            };
        }

        public ToDoItem Create(ToDoItemBindingModel toDoItem) {
            return new ToDoItem() {
                Description = toDoItem.Description,
                Id = toDoItem.Id,
                Name = toDoItem.Name,
                Status = toDoItem.Status.ToEnum<ToDoItemStatus>(),
                Type = toDoItem.Type.ToEnum<ToDoItemType>()
            };
        }

        public IEnumerable<ToDoItemReturnModel> Create(IEnumerable<ToDoItem> toDoItems) {
            ICollection<ToDoItemReturnModel> result = new List<ToDoItemReturnModel>();

            foreach (var toDo in toDoItems)
                result.Add(Create(toDo));
            return result;
        }
    }
}
