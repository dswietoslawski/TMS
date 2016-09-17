using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace TeamManagementService.Controllers {
    [RoutePrefix("api")]
    public class UserController : BaseApiController {
        [HttpGet]
        [Route("teams/{teamId}/users")]
        [Authorize]
        public IHttpActionResult GetByTeam(int teamId) {
            try {
                var response = ModelFactory.Create(UnitOfWork.UserRepository.GetByTeam(teamId));
                return Ok(response);
            } catch (KeyNotFoundException) {
                return BadRequest();
            }
        }
    }
}
