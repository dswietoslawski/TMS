using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Repositories {
    public class TeamRepository : BaseRepository, ITeamRepository {

        public TeamRepository(ApplicationDbContext context) : base(context) {

        }

        public Project Add(Project team) {
            return context.Teams.Add(team);
        }

        public IEnumerable<Project> Get() {
            return context.Teams;
        }

        public Project Get(int id) {
            return context.Teams.Find(id);
        }
    }
}
