using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EspressOrder.Roles.Dto;
using EspressOrder.Users.Dto;

namespace EspressOrder.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);

        Task<bool> ChangePassword(ChangePasswordDto input);
    }
}
