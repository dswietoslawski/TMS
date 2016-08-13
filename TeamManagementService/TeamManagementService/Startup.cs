using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using TeamManagementService.Infrastructure;

namespace TeamManagementService
{
    public class Startup
    {
        public void Configuration(IAppBuilder app) {
            HttpConfiguration httpConfig = new HttpConfiguration();
            configureOAuthTokenGeneration(app);
            configureWebApi(httpConfig);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(httpConfig);
        }

        private void configureWebApi(HttpConfiguration httpConfig) {
            httpConfig.MapHttpAttributeRoutes();

            var jsonFormatter = httpConfig.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        private void configureOAuthTokenGeneration(IAppBuilder app) {
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                ExpireTimeSpan = TimeSpan.FromDays(7),
                LoginPath = new PathString("/accounts/Login")
            });
        }
    }
}
