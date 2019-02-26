using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mennu.Utilities
{
    public static class Extensions
    {
        public static bool HasValue(this Guid guid)
        {
            return (guid == null || guid == Guid.Empty);
        }
    }
}
