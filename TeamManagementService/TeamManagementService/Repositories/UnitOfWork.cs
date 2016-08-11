using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Infrastructure;

namespace TeamManagementService.Repositories {
    public class UnitOfWork {

        ApplicationDbContext context = new ApplicationDbContext();

        private ITeamRepository teamRepository;
        public ITeamRepository TeamRepository {
            get {
                if (teamRepository == null) teamRepository = new TeamRepository(context);
                return teamRepository;
            }
        }

        public void Save() {
            context.SaveChanges();
        }
    }
}
