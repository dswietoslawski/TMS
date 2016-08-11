using TeamManagementService.Infrastructure;

namespace TeamManagementService.Repositories {
    public class BaseRepository {
        protected ApplicationDbContext context { get; set; }

        public BaseRepository(ApplicationDbContext context) {
            this.context = context;
        }
    }
}