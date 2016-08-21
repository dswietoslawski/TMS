using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models;

namespace TeamManagementService.Repositories.User {
    public class UserRepository : BaseRepository, IUserRepository {
        public UserRepository(ApplicationDbContext context) : base(context) {

        }
        public ApplicationUser Get(string id) {
            return context.Users.Find(id);
        }

        public IEnumerable<ApplicationUser> GetByTeam(int teamId) {

            var team = context.Teams.Where(t => t.Id == teamId).Single();
            var result = team.Members;
            result.Add(team.Admin);

            return result;
        }
    }
}
