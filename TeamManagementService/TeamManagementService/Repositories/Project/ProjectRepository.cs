using System;
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
            return context.Teams.Include(t => t.Admin);
        }

        public Project Get(int id) {
            return context.Teams.Include(t => t.Admin).Where(t => t.Id == id).FirstOrDefault();
        }

        public void AddUserToTeam(int teamId, ApplicationUser user) {
            var team = context.Teams.Where(t => t.Id == teamId).Include(t => t.Members).Single();
            team.Members.Add(user);
        }

        public bool DeleteUserFromTeam(int teamId, ApplicationUser user) {
            var team = context.Teams.Where(t => t.Id == teamId).Include(t => t.Members).Single();
            return team.Members.Remove(user);
        }

        public IEnumerable<Project> GetByUser(string userId) {
            var x = context.Teams.Include(t => t.Members).Include(t => t.Admin).Where(t => t.Members.Any(m => m.Id == userId) || t.Admin.Id == userId).Include(t => t.Admin).ToList();
            return context.Teams.Include(t => t.Members).Include(t => t.Admin).Where(t => t.Members.Any(m => m.Id == userId) || t.Admin.Id == userId).Include(t => t.Admin);
        }

        public void Delete(int teamId) {
            var team = context.Teams.Include(t => t.Members).Include(t => t.Tasks).First(t => t.Id == teamId);
            team.Members.Clear();
            team.Tasks.Clear();
            context.Teams.Remove(team);
        }
    }
}
