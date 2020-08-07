using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EspressOrder.Authorization;

namespace EspressOrder
{
    [DependsOn(
        typeof(EspressOrderCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class EspressOrderApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<EspressOrderAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(EspressOrderApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
