using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using WebAPI.Database;
using System.Linq;

public class CustomClaimsPrincipalFactory : UserClaimsPrincipalFactory<IdentityUserExt>
{
    public CustomClaimsPrincipalFactory(UserManager<IdentityUserExt> userManager, IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, optionsAccessor)
    { }

    //protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IdentityUserExt user)
    //{
    //    var identity = base.GenerateClaimsAsync(user);

    //    // updaet login info
    //    user.LoginCount++;
    //    user.LastLoginTimestamp = DateTime.UtcNow;
    //    await UserManager.UpdateAsync(user);

    //    identity.

    //    return await identity;
    //}

    // This method is called only when login. It means that "the drawback   
    // of calling the database with each HTTP request" never happen.  
    public async override Task<ClaimsPrincipal> CreateAsync(IdentityUserExt user)
    {
        var principal = await base.CreateAsync(user);

        // updaet login info
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