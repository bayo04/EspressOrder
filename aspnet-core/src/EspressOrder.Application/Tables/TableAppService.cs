using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using EspressOrder.Authorization;
using EspressOrder.Tables.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Tables
{
    [AbpAuthorize(PermissionNames.Pages_Tables)]
    public class TableAppService : AsyncCrudAppService<Table, TableDto, Guid, TableRequestDto, CreateTableDto, UpdateTableDto>, ITableAppService
    {
        public TableAppService(IRepository<Table, Guid> repository) : base(repository)
        {
        }
    }
}
