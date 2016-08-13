using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using TeamManagementService.Models;
using TeamManagementService.Models.Users;

namespace TeamManagementService.Controllers {
    [RoutePrefix("api/accounts")]
    public class AccountController : BaseApiController {
        [Route("users")]
        public IHttpActionResult GetUsers() {
            return Ok(this.AppUserManager.Users.ToList().Select(u => this.ModelFactory.Create(u)));
        }

        [Route("users/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string id) {
            var user = await this.AppUserManager.FindByIdAsync(id);
            if (user != null) {
                return Ok(this.ModelFactory.Create(user));
            }
            return NotFound();
        }

        [Authorize]
        [Route("user/{username}")]
        public async Task<IHttpActionResult> GetUserByName(string username) {
            var user = await this.AppUserManager.FindByNameAsync(username);
            if (user != null) {
                return Ok(this.ModelFactory.Create(user));
            }
            return NotFound();
        }

        [AllowAnonymous]
        [Route("register")]
        public async Task<IHttpActionResult> Register([FromBody] RegisterUserBindingModel user) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var appUser = ModelFactory.Create(user);
            IdentityResult registerUserResult = await this.AppUserManager.CreateAsync(appUser, user.Password);
            if (!registerUserResult.Succeeded)
                return GetErrorResult(registerUserResult);

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = appUser.Id }));
            return Created(locationHeader, ModelFactory.Create(appUser));
        }

        [AllowAnonymous]
        [Route("login")]
        public async Task<IHttpActionResult> Login([FromBody] LoginUserBindingModel user) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var appUser = await this.AppUserManager.FindAsync(user.UserName, user.Password);

            if (appUser != null) {
                await SignInAsync(appUser, user.RememberMe);
                return Ok(this.ModelFactory.Create(appUser));
            } else {
                ModelState.AddModelError("", "Invalid username or password.");
            }
            return BadRequest(ModelState);
        }


        [Route("logout")]
        public async Task<IHttpActionResult> Logout([FromBody] UserBindingModel user) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var appUser = await this.AppUserManager.FindByNameAsync(user.UserName);

            if (appUser != null) {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return Ok(this.ModelFactory.Create(appUser));
            } else {
                ModelState.AddModelError("", "There's no user by that name");
                return BadRequest();
            }
        }

        private async Task SignInAsync(ApplicationUser appUser, bool rememberMe) {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            var identity = await AppUserManager.CreateIdentityAsync(appUser, DefaultAuthenticationTypes.ApplicationCookie);

            AuthenticationManager.SignIn(new Microsoft.Owin.Security.AuthenticationProperties() {
                IsPersistent = rememberMe
            }, identity);
        }

    }
}
