using TeamManagementService.Models.Projects;

namespace TeamManagementService.Models {
    public partial class ModelFactory {

        public ProjectReturnModel Create(Project project) {
            if (project != null)
                return new ProjectReturnModel() {
                    Id = project.Id,
                    Name = project.Name
                };
            return null;
        }

        public Project Create(ProjectBindingModel project) {
            if (project != null)
                return new Project() {
                Name = project.Name,
                Id = project.Id
            };
            return null;
        }
    }
}