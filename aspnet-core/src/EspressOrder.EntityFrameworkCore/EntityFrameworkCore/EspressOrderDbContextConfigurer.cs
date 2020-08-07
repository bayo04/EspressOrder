using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace EspressOrder.EntityFrameworkCore
{
    public static class EspressOrderDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<EspressOrderDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<EspressOrderDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
