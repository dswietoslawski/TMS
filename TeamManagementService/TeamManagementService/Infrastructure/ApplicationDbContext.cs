using Microsoft.AspNet.Identity.EntityFramework;
using TeamManagementService.Models;

namespace TeamManagementService.Infrastructure {
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
        public ApplicationDbContext() : base("TmsConnection", throwIfV1Schema: false) {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static ApplicationDbContext Create() {
            return new ApplicationDbContext();
        }
    }
}