using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Tables
{
    public class Table : Entity<Guid>
    {
        public int Index { get; set; }

        public double? PositionX { get; set; }

        public double? PositionY { get; set; }

        public double? Height { get; set; }

        public double? Width { get; set; }

        public bool? Rounded { get; set; }
    }
}
