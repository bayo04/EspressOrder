using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using EspressOrder.Authorization;
using EspressOrder.MenuItems.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EspressOrder.MenuItems
{
    [AbpAuthorize(PermissionNames.Pages_MenuItems)]
    public class MenuItemAppService : AsyncCrudAppService<MenuItem, MenuItemDto, Guid, MenuItemRequestDto, CreateMenuItemDto, UpdateMenuItemDto>, IMenuItemAppService
    {
        public MenuItemAppService(IRepository<MenuItem, Guid> repository) : base(repository)
        {
        }

        public override Task<PagedResultDto<MenuItemDto>> GetAllAsync(MenuItemRequestDto input)
        {
            return base.GetAllAsync(input);
        }
    }
}
