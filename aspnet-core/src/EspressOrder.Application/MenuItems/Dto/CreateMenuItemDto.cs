using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.MenuItems.Dto
{
    [AutoMapTo(typeof(MenuItem))]
    public class CreateMenuItemDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string MeasureUnit { get; set; }

        public decimal Price { get; set; }

        public Guid CategoryId { get; set; }
    }
}
