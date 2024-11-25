using Microsoft.AspNetCore.Identity;

namespace WebAPI.Serurity
{
    public class IdentityUserExt : IdentityUser
    {
        public byte[]? Avatar { get; set; }
        public string? AvatarMimeType { get; set; } 
        public int SuccessLoginCount { get; set; }
        public DateTime? LastLoginTimestamp { get; set; }
    }
}
