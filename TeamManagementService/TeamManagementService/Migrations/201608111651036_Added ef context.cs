namespace TeamManagementService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedefcontext : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ToDoItem",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 20),
                        Description = c.String(maxLength: 100),
                        Type = c.Int(nullable: false),
                        Team_Id = c.Int(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Team", t => t.Team_Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.Team_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Team",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 20),
                        Admin_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Admin_Id)
                .Index(t => t.Admin_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ToDoItem", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.ToDoItem", "Team_Id", "dbo.Team");
            DropForeignKey("dbo.Team", "Admin_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Team", new[] { "Admin_Id" });
            DropIndex("dbo.ToDoItem", new[] { "User_Id" });
            DropIndex("dbo.ToDoItem", new[] { "Team_Id" });
            DropTable("dbo.Team");
            DropTable("dbo.ToDoItem");
        }
    }
}
