using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Models {
    public partial class ModelFactory {

        public ProjectReturnModel Create(Project team) {
            return new ProjectReturnModel() {
                Id = team.Id,
                Name = team.Name
            };
        }

        public Project Create(ProjectBindingModel team) {
            return new Project() {
                Name = team.Name
            };
        }
    }
}