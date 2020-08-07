using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EspressOrder.Configuration;

namespace EspressOrder.Web.Host.Startup
{
    [DependsOn(
       typeof(EspressOrderWebCoreModule))]
    public class EspressOrderWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public EspressOrderWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EspressOrderWebHostModule).GetAssembly());
        }
    }
}
