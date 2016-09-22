using System.Collections.Generic;
using TeamManagementService.Models;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Repositories {
    public interface IProjectRepository {
        IEnumerable<Project> Get();
        Project Get(int id);
        Project Add(Project team);
        void AddUserToTeam(int teamId, ApplicationUser user);
        bool DeleteUserFromTeam(int teamId, ApplicationUser user);
        IEnumerable<Project> GetByUser(string userId);
    }
}