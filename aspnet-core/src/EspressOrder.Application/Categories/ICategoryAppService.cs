using Abp.Application.Services;
using EspressOrder.Categories.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories
{
    public interface ICategoryAppService : IAsyncCrudAppService<CategoryDto, Guid, CategoryRequestDto, CreateCategoryDto, UpdateCategoryDto>
    {
    }
}
