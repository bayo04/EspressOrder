using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EspressOrder.EntityFrameworkCore;
using EspressOrder.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace EspressOrder.Web.Tests
{
    [DependsOn(
        typeof(EspressOrderWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class EspressOrderWebTestModule : AbpModule
    {
        public EspressOrderWebTestModule(EspressOrderEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EspressOrderWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(EspressOrderWebMvcModule).Assembly);
        }
    }
}