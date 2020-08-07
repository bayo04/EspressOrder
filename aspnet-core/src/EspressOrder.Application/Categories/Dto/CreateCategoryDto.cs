using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace EspressOrder.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoryDto
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
