using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Database;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController(AppDbContext dbContext) : Controller
    {

        // [Authorize]
        public ActionResult Profile(int id)
        {
            var profile = dbContext.Users.FirstOrDefault(x => x.Id == this.User.Identity.Name);
            if (profile == null)
                return NotFound();

            return Ok(profile);
        }

    }
}
