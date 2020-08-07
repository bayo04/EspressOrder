using Abp.Domain.Entities;
using EspressOrder.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Orders
{
    public class Order : Entity<Guid>
    {
        public Table Table { get; set; }

        public string Status { get; set; }

        public DateTime OrderTime { get; set; }

        public DateTime CompletionTime { get; set; }
    }
}
