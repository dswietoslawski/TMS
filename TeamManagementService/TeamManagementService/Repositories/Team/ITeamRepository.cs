using System.Collections.Generic;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Repositories {
    public interface ITeamRepository {
        IEnumerable<Team> Get();
        Team Get(int id);
        Team Add(Team team);
    }
}