using Abp.Domain.Entities;
using EspressOrder.Categories;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.MenuItems
{
    public class MenuItem : Entity<Guid>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string MeasureUnit { get; set; }

        public decimal Price { get; set; }

        public Category Category { get; set; }
    }
}
