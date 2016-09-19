using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models.Projects
{
    public class ProjectReturnModel
    {
        public UserReturnModel Admin { get; internal set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
