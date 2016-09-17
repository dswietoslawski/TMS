using System.Collections.Generic;
using TeamManagementService.Models;

namespace TeamManagementService.Repositories.User {
    public interface IUserRepository {
        ApplicationUser Get(string id);
        IEnumerable<ApplicationUser> GetByTeam(int teamId);
    }
}