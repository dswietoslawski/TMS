﻿using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using TeamManagementService.Models;
using TeamManagementService.Models.Tasks;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Infrastructure {
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
        public ApplicationDbContext() : base("TmsConnection", throwIfV1Schema: false) {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static ApplicationDbContext Create() {
            return new ApplicationDbContext();
        }

        public DbSet<Project> Teams { get; set; }
        public DbSet<ToDoItem> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);

        }
    }
}