using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebAPI.Database;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController(UserManager<IdentityUserExt> userManager) : ControllerBase
    {
        //// [Authorize]
        //[HttpGet]
        //public ActionResult Profile(string id)
        //{
        //    var profile = dbContext.Users.FirstOrDefault(x => x.Id == this.User.Identity.Name);
        //    if (profile == null)
        //        return NotFound();

        //    return Ok(profile);
        //}


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> Users()
        {
            var data = userManager.Users.Select(x => new UserDTO { Id = x.Id, Name = x.UserName, Logins = x.LoginCount, LastLogin = x.LastLoginTimestamp }).ToList();
            data.ForEach(async x => { x.Roles = (await userManager.GetRolesAsync(new IdentityUserExt { Id = x.Id })).ToArray(); });
            return Ok(data);
        }


        [HttpGet]
        [Route("{id}/image")]
        public async Task<ActionResult> UserImage(string id)
        {
            Byte[]? image = userManager.Users.FirstOrDefault(x => x.Id == id)?.Image;
            return image != null ? File(image, "image/*") : NotFound();
        }
    }
}
