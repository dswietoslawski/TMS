using System;
using System.Net.Http;
using System.Web.Http.Routing;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models.Teams;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Models {
    public partial class ModelFactory {
        private UrlHelper _urlHelper;
        private ApplicationUserManager _appUserManager;

        public ModelFactory(HttpRequestMessage request, ApplicationUserManager appUserManager) {
            _urlHelper = new UrlHelper(request);
            _appUserManager = appUserManager;
        }

        public UserReturnModel Create(ApplicationUser appUser) {
            return new UserReturnModel {
                Id = appUser.Id,
                UserName = appUser.UserName,
                FullName = string.Format("{0} {1}", appUser.FirstName, appUser.LastName),
                Email = appUser.Email,
                EmailConfirmed = appUser.EmailConfirmed,
                JoinDate = appUser.JoinTime,
            };
        }

        public ApplicationUser Create(RegisterUserBindingModel userModel) {
            return new ApplicationUser() {

                UserName = userModel.UserName,
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                Level = 3,
                JoinTime = DateTime.Now.Date,
            };
        }
    }
}
