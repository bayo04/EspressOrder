using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.MenuItems.Dto
{
    [AutoMapTo(typeof(MenuItem))]
    [AutoMapFrom(typeof(MenuItemDto))]
    public class UpdateMenuItemDto : CreateMenuItemDto, IEntityDto<Guid>
    {
        public Guid Id { get; set; }
    }
}
