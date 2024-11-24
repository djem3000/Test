using Microsoft.AspNetCore.Identity;

namespace WebAPI.Serurity
{
    public class IdentityUserExt : IdentityUser
    {
        public byte[]? Image { get; set; }
        public int LoginCount { get; set; }
        public DateTime? LastLoginTimestamp { get; set; }
    }
}
