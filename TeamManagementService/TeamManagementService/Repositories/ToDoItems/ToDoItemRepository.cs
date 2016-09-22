using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models.Tasks;
using System.Data.Entity;

namespace TeamManagementService.Repositories.ToDoItems {
    public class ToDoItemRepository : BaseRepository, IToDoItemRepository {
        public ToDoItemRepository(ApplicationDbContext context) : base(context) {
        }

        public ToDoItem Add(ToDoItem item) {
            return context.Tasks.Add(item);
        }

        public IEnumerable<ToDoItem> Get() {
            return context.Tasks;
        }

        public ToDoItem Get(int id) {
            return context.Tasks.Find(id);
        }

        public IEnumerable<ToDoItem> GetByUser(string userId) {
            return context.Tasks.Where(t => t.User.Id == userId).ToList();
        }

        public IEnumerable<ToDoItem> Get(int teamId, string userId) {
            return context.Tasks.Where(t => t.User.Id == userId && t.Team.Id == teamId).ToList();
        }

        public IEnumerable<ToDoItem> GetByTeam(int teamId) {
            return context.Tasks.Where(t => t.Team.Id == teamId).Include(t => t.User).Include(t => t.Team).Include(t => t.Team.Admin).ToList();
        }

        public ToDoItem Update(ToDoItem toDoItem) {
            var entity = context.Tasks.Include(t => t.Team).Include(t => t.User).Where(t => t.Id == toDoItem.Id).Single();
            try {
                context.Entry(entity).CurrentValues.SetValues(toDoItem);
                entity.User = toDoItem.User;
                return entity;
            } catch (NullReferenceException) {
                throw new KeyNotFoundException();
            }
        }

        public bool Delete(ToDoItem entity) {
            context.Tasks.Attach(entity);
            context.Tasks.Remove(entity);
            return true;
        }
    }
}
