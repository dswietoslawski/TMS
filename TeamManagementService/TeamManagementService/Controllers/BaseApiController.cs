using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TeamManagementService.Infrastructure;
using TeamManagementService.Models;
using TeamManagementService.Repositories;

namespace TeamManagementService.Controllers {
    public class BaseApiController : ApiController {
        private ModelFactory _modelFactory;
        private ApplicationUserManager _appUserManager = null;
        private IAuthenticationManager _authManager = null;
        private UnitOfWork _uow;

        protected ApplicationUserManager AppUserManager {
            get {
                return _appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }

        protected IAuthenticationManager AuthenticationManager {
            get {
                return _authManager ?? Request.GetOwinContext().Authentication;
            }
        }

        protected UnitOfWork UnitOfWork {
            get {
                if (_uow == null)
                    _uow = new UnitOfWork();
                return _uow;
            }
        }


        public BaseApiController() {

        }

        protected ModelFactory ModelFactory {
            get {
                if (_modelFactory == null) {
                    _modelFactory = new ModelFactory(this.Request, this.AppUserManager);
                }
                return _modelFactory;
            }
        }


        protected IHttpActionResult GetErrorResult(IdentityResult result) {
            if (result == null) {
                return InternalServerError();
            }

            if (!result.Succeeded) {
                if (result.Errors != null) {
                    foreach (string error in result.Errors) {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid) {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
