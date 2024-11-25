using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.Claims;
using WebAPI.Serurity;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController(UserManager<IdentityUserExt> userManager) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> Users()
        {
            var data = userManager.Users.Select(x => new UserDTO { Id = x.Id, Name = x.UserName, Logins = x.SuccessLoginCount, LastLogin = x.LastLoginTimestamp }).ToList();
            data.ForEach(async x => { x.Roles = (await userManager.GetRolesAsync(new IdentityUserExt { Id = x.Id })).ToArray(); });
            return Ok(await Task.FromResult(data));
        }

        [HttpGet]
        [Route("{id}")]        
        public async Task<ActionResult<UserDTO>> UserDetails(string id)
        {
            if (id == "identity")
                id = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var data = userManager.Users.Where(x=>x.Id == id).Select(x=> new UserDTO { Id = x.Id, Name = x.UserName, Logins = x.SuccessLoginCount, LastLogin = x.LastLoginTimestamp }).FirstOrDefault();
            if (data == null)
                return NotFound();

            data.Roles = (await userManager.GetRolesAsync(new IdentityUserExt { Id = data.Id })).ToArray(); 
            return Ok(data);
        }
        
        [HttpGet]
        [Route("{id}/image")]
        public ActionResult UserImage(string id)
        {
            var user = userManager.Users.FirstOrDefault(x => x.Id == id);
            Byte[]? image = user?.Avatar;
            var mime = user?.AvatarMimeType;

            if (image == null) // not found
            {                
                image = Resources.Embedded.File("Resources.404.jpg");
                mime = "image/jpeg";
            }

            return File(image, $"{mime}");
        }


        [HttpPost]
        [Route("avatar")]
        public async Task<ActionResult> UploadAvatar(IFormFile file)
        {
            if (file == null)
                return BadRequest();

            if (file.Length > 20480)
                return BadRequest("File is very large. Max 20kB");

            var fileB = new byte[file.Length];
            using (var stream = new MemoryStream(fileB))
            {
                await file.CopyToAsync(stream);
            }

            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.Users.FirstAsync(x => x.Id == userId);
            user.Avatar = fileB;
            user.AvatarMimeType = file.ContentType;
            await userManager.UpdateAsync(user);

            return Accepted();
        }

        [HttpPost]
        [Route("{id}/roles")]
        public async Task<ActionResult> UpdateRoles(string id, UpdateUserRoleDTO update)
        {
            var role = update.Role;
            var action = update.Action;

            if (!User.IsInRole("admin"))
                return Forbid();

            var user = await userManager.FindByIdAsync(id);
            if (user == null)            
                return NotFound("User not found");

            if (action) // add roles
                await userManager.AddToRoleAsync(user, role);
            else            
                await userManager.RemoveFromRoleAsync(user, role);

            return Accepted();
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            if (!User.IsInRole("admin"))
                return Forbid("Only admin can remove user");

            if (id == this.User.FindFirstValue(ClaimTypes.NameIdentifier))
                return Forbid("You can't remove yourself. Please ask another admin.");

            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("User not found");

            await userManager.DeleteAsync(user);

            return Accepted();                        
        }
    }
}
