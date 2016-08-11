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

        public Team Add(Team team) {
            var user = context.Users.Single(u => u.UserName == team.Admin.UserName);
            team.Admin = user;
            return context.Teams.Add(team);
        }

        public IEnumerable<Team> Get() {
            return context.Teams;
        }

        public Team Get(int id) {
            return context.Teams.Find(id);
        }
    }
}
