using Microsoft.AspNetCore.Identity;

namespace WebAPI.Database
{
    public class IdentityUserExt : IdentityUser
    {
        public Byte[]? Image { get; set; }
        public int LoginCount {  get; set; }
        public DateTime? LastLoginTimestamp { get; set; }        
    }
}
