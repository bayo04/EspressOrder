using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories.Dto
{
    [AutoMapFrom(typeof(Category))]
    public class CategoryDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
