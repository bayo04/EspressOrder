using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using EspressOrder.Authorization.Roles;
using EspressOrder.Authorization.Users;
using EspressOrder.MultiTenancy;
using EspressOrder.Tables;
using EspressOrder.Categories;
using EspressOrder.MenuItems;

namespace EspressOrder.EntityFrameworkCore
{
    public class EspressOrderDbContext : AbpZeroDbContext<Tenant, Role, User, EspressOrderDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Table> Tables { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public EspressOrderDbContext(DbContextOptions<EspressOrderDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Table>()
                .HasIndex(u => u.Index)
                .IsUnique();
        }
    }
}
