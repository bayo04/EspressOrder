using Abp.Application.Services;
using EspressOrder.Tables.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Tables
{
    public interface ITableAppService : IAsyncCrudAppService<TableDto, Guid, TableRequestDto, CreateTableDto, UpdateTableDto>
    {
    }
}
