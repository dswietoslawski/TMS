namespace TeamManagementService.Migrations
{
    using Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using Models.Projects;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TeamManagementService.Infrastructure.ApplicationDbContext>
    {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context) {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            ApplicationUser user = getDefaultUser();
            manager.Create(user, "MySuperP@ssword!");
            context.SaveChanges();

            IEnumerable<Project> Teams = getTeams(manager.FindByName("SuperPowerUser"));
            // context.Teams.AddRange(Teams);

            context.SaveChanges();

        }

        private IEnumerable<Project> getTeams(ApplicationUser user) {
            return new List<Project>() {
                new Project() {
                    Name = "TestTeam",
                    Admin = user
                }
            };
        }

        private static ApplicationUser getDefaultUser() {
            return new ApplicationUser() {
                UserName = "SuperPowerUser",
                Email = "dawid.swietoslawski@mymail.com",
                EmailConfirmed = true,
                FirstName = "Dawid",
                LastName = "Swietoslawski",
                Level = 1,
                JoinTime = DateTime.Now.AddYears(-3)
            };
        }
    }
}
