using System.Collections.Generic;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Repositories.ToDoItems {
    public interface IToDoItemRepository {
        ToDoItem Add(ToDoItem team);
        IEnumerable<ToDoItem> Get();
        ToDoItem Get(int id);
        IEnumerable<ToDoItem> GetByTeam(int teamId);
        IEnumerable<ToDoItem> Get(int teamId, string userId);
    }
}