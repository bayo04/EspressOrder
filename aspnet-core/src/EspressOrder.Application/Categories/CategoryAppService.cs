using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using EspressOrder.Authorization;
using EspressOrder.Categories.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories
{
    [AbpAuthorize(PermissionNames.Pages_Categories)]
    public class CategoryAppService : AsyncCrudAppService<Category, CategoryDto, Guid, CategoryRequestDto, CreateCategoryDto, UpdateCategoryDto>, ICategoryAppService
    {
        public CategoryAppService(IRepository<Category, Guid> repository) : base(repository)
        {
        }
    }
}
