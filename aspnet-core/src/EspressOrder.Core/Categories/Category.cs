using Abp.Domain.Entities;
using EspressOrder.MenuItems;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories
{
    public class Category : Entity<Guid>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public List<MenuItem> MenuItems { get; set; }
    }
}
