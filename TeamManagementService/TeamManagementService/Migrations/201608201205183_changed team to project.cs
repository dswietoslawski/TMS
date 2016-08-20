namespace TeamManagementService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedteamtoproject : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Team", newName: "Project");
            RenameColumn(table: "dbo.AspNetUsers", name: "Team_Id", newName: "Project_Id");
            RenameIndex(table: "dbo.AspNetUsers", name: "IX_Team_Id", newName: "IX_Project_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.AspNetUsers", name: "IX_Project_Id", newName: "IX_Team_Id");
            RenameColumn(table: "dbo.AspNetUsers", name: "Project_Id", newName: "Team_Id");
            RenameTable(name: "dbo.Project", newName: "Team");
        }
    }
}
