using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Repositories {
    public class ProjectRepository : BaseRepository, IProjectRepository {

        public ProjectRepository(ApplicationDbContext context) : base(context) {

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

        public void AddUserToTeam(int teamId, ApplicationUser user) {
            var team = context.Teams.Where(t => t.Id == teamId).Include(t => t.Members).Single();
            team.Members.Add(user);
        }
    }
}
