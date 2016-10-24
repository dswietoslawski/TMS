using System;
using TeamManagementService.Infrastructure;
using TeamManagementService.Repositories.ToDoItems;
using TeamManagementService.Repositories.User;

namespace TeamManagementService.Repositories {
    public class UnitOfWork {

        private ApplicationDbContext context = new ApplicationDbContext();

        private IProjectRepository projectRepository;
        public IProjectRepository ProjectRepository {
            get {
                if (projectRepository == null) projectRepository = new ProjectRepository(context);
                return projectRepository;
            }
        }

        private IUserRepository userRepository;
        public IUserRepository UserRepository {
            get {
                if (userRepository == null) userRepository = new UserRepository(context);
                return userRepository;
            }
        }

        private IToDoItemRepository toDoItemRepository;
        public IToDoItemRepository ToDoItemRepository {
            get {
                if (toDoItemRepository == null) toDoItemRepository = new ToDoItemRepository(context);
                return toDoItemRepository;
            }
        }

        public void Save() {
            try {
                context.SaveChanges();
            } catch (Exception ex) {
                throw ex;
            }
        }
    }
}
