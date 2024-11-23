using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RolesController(RoleManager<IdentityRole> roleManager) : ControllerBase
    {
        [HttpGet]        
        public async Task<ActionResult<IEnumerable<string>>> Roles()
        {                       
            return Ok(await Task.FromResult(roleManager.Roles.Select(x=>x.Name).ToList()));
        }    
    }
}
