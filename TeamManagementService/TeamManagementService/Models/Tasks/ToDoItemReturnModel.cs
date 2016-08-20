﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeamManagementService.Models.Projects;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models.Tasks
{
    public class ToDoItemReturnModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ProjectReturnModel Team { get; set; }
        public virtual UserReturnModel User { get; set; }
        public virtual ToDoItemType Type { get; set; }
    }
}
