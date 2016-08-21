using System;

namespace TeamManagementService.Extensions {
    public static class StringExtensions
    {
        public static T ToEnum<T>(this string value) {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}
