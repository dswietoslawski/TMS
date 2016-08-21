namespace TeamManagementService.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedstatustotodoitems : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ToDoItem", "Status", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ToDoItem", "Status");
        }
    }
}
