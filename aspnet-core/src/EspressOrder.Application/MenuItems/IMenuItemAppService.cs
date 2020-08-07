using Abp.Application.Services;
using EspressOrder.MenuItems.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.MenuItems
{
    public interface IMenuItemAppService : IAsyncCrudAppService<MenuItemDto, Guid, MenuItemRequestDto, CreateMenuItemDto, UpdateMenuItemDto>
    {
    }
}
