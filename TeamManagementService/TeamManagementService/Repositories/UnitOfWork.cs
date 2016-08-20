using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Infrastructure;
using TeamManagementService.Repositories.User;

namespace TeamManagementService.Repositories
{
    public class UnitOfWork
    {

        private ApplicationDbContext context = new ApplicationDbContext();

        private IProjectRepository teamRepository;
        public IProjectRepository TeamRepository
        {
            get
            {
                if (teamRepository == null) teamRepository = new ProjectRepository(context);
                return teamRepository;
            }
        }

        private IUserRepository userRepository;
        public IUserRepository UserRepository
        {
            get
            {
                if (userRepository == null) userRepository = new UserRepository(context);
                return userRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
