namespace TeamManagementService.Migrations {
    using Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using Models.Teams;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationDbContext context) {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            ApplicationUser user = getDefaultUser();

            IEnumerable<Team> Teams = getTeams();
            context.Teams.AddRange(Teams);

            manager.Create(user, "MySuperP@ssword!");
            context.SaveChanges();

        }

        private IEnumerable<Team> getTeams() {
            return new List<Team>() {
                new Team() {
                    Name = "TestTeam"
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
