using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    [AutoMapFrom(typeof(CategoryDto))]
    public class UpdateCategoryDto : CreateCategoryDto, IEntityDto<Guid>
    {
        public Guid Id { get; set; }
    }
}
