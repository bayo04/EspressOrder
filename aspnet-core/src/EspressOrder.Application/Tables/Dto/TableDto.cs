using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Tables.Dto
{
    [AutoMapFrom(typeof(Table))]
    public class TableDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }

        public int Index { get; set; }

        public double PositionX { get; set; }

        public double PositionY { get; set; }

        public double Height { get; set; }

        public double Width { get; set; }

        public bool Rounded { get; set; }
    }
}
