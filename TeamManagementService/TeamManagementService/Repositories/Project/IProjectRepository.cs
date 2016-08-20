using System.Collections.Generic;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Repositories {
    public interface IProjectRepository {
        IEnumerable<Project> Get();
        Project Get(int id);
        Project Add(Project team);
    }
}