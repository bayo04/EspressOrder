using System.Threading.Tasks;
using EspressOrder.Models.TokenAuth;
using EspressOrder.Web.Controllers;
using Shouldly;
using Xunit;

namespace EspressOrder.Web.Tests.Controllers
{
    public class HomeController_Tests: EspressOrderWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}