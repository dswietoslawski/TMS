﻿using TeamManagementService.Models.Projects;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models.Tasks {
    public class ToDoItemReturnModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ProjectReturnModel Team { get; set; }
        public UserReturnModel User { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}
