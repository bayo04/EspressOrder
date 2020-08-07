using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using EspressOrder.Categories.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.MenuItems.Dto
{
    [AutoMapFrom(typeof(MenuItem))]
    public class MenuItemDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string MeasureUnit { get; set; }

        public decimal Price { get; set; }

        public CategoryDto Category { get; set; }
    }
}
