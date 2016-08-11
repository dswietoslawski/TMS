namespace TeamManagementService.Migrations
{
    using Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var user = new ApplicationUser() {
                UserName = "SuperPowerUser",
                Email = "taiseer.joudeh@mymail.com",
                EmailConfirmed = true,
                FirstName = "Taiseer",
                LastName = "Joudeh",
                Level = 1,
                JoinTime = DateTime.Now.AddYears(-3)
            };

            manager.Create(user, "MySuperP@ssword!");
        }
    }
}
