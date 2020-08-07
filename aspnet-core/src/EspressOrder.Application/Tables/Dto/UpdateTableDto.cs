using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Tables.Dto
{
    [AutoMapTo(typeof(Table))]
    [AutoMapFrom(typeof(TableDto))]
    public class UpdateTableDto : CreateTableDto, IEntityDto<Guid>
    {
        public Guid Id { get; set; }
    }
}
