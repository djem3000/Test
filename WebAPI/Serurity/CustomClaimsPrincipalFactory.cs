using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using WebAPI.Serurity;

public class CustomClaimsPrincipalFactory : UserClaimsPrincipalFactory<IdentityUserExt>
{
    public CustomClaimsPrincipalFactory(UserManager<IdentityUserExt> userManager, IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, optionsAccessor)
    { }

    public async override Task<ClaimsPrincipal> CreateAsync(IdentityUserExt user)
    {
        var principal = await base.CreateAsync(user);

        // update login info
        user.LoginCount++;
        user.LastLoginTimestamp = DateTime.UtcNow;
        await UserManager.UpdateAsync(user);


        if (principal.Identity != null)
        {
            foreach (var role in await UserManager.GetRolesAsync(user))
                ((ClaimsIdentity)principal.Identity).AddClaims(new[] { new Claim(ClaimTypes.Role, role) });
        }        

        return principal;
    }
}