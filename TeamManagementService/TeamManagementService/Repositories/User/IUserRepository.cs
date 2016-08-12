using TeamManagementService.Models;

namespace TeamManagementService.Repositories.User
{
    public interface IUserRepository
    {
        ApplicationUser Get(string id);
    }
}