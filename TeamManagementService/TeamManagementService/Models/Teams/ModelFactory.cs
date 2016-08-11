using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TeamManagementService.Models.Teams;

namespace TeamManagementService.Models {
    public partial class ModelFactory {

        public TeamReturnModel Create(Team team) {
            return new TeamReturnModel() {
                Id = team.Id,
                Name = team.Name
            };
        }

        public Team Create(TeamBindingModel team) {
            return new Team() {
                Name = team.Name
            };
        }
    }
}