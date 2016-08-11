using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace TeamManagementService.Models.Users {
    public class UserReturnModel {
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string FullName { get; set; }
        public string Id { get; set; }
        public DateTime JoinDate { get; set; }
        public string UserName { get; set; }
    }
}