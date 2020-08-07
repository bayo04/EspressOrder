using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using EspressOrder.Configuration;
using EspressOrder.Web;

namespace EspressOrder.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class EspressOrderDbContextFactory : IDesignTimeDbContextFactory<EspressOrderDbContext>
    {
        public EspressOrderDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<EspressOrderDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            EspressOrderDbContextConfigurer.Configure(builder, configuration.GetConnectionString(EspressOrderConsts.ConnectionStringName));

            return new EspressOrderDbContext(builder.Options);
        }
    }
}
