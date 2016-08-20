using System.Collections.Generic;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Repositories {
    public interface ITeamRepository {
        IEnumerable<Project> Get();
        Project Get(int id);
        Project Add(Project team);
    }
}