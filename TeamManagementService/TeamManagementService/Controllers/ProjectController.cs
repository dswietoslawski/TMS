using System;
using System.Collections.Generic;
using System.Web.Http;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Controllers {
    [RoutePrefix("api/teams")]
    public class ProjectController : BaseApiController {

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get() {
            var entities = UnitOfWork.TeamRepository.Get();
            var response = new List<ProjectReturnModel>();

            foreach (var entity in entities)
                response.Add(ModelFactory.Create(entity));

            return Ok(response);
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get(int id) {
            var team = UnitOfWork.TeamRepository.Get(id);
            return Ok(ModelFactory.Create(team));
        }

        [HttpPost]
        [Route("")]
        [Authorize]
        public IHttpActionResult Post(ProjectBindingModel teamModel) {
            if (ModelState.IsValid) {

                var team = ModelFactory.Create(teamModel);
                team.Admin = UnitOfWork.UserRepository.Get(teamModel.AdminId);

                var entity = UnitOfWork.TeamRepository.Add(team);
                UnitOfWork.Save();

                var response = ModelFactory.Create(entity);
                var location = new Uri(Request.RequestUri + "/" + response.Id);

                return Created(location, response);
            };

            return BadRequest();
        }

        [HttpDelete]
        [Route("{teamId}/users/{userId}")]
        [Authorize]
        public IHttpActionResult DeleteUser(int teamId, string userId) {
            var user = UnitOfWork.UserRepository.Get(userId);
            if (user == null) return BadRequest();

            if (UnitOfWork.TeamRepository.DeleteUserFromTeam(teamId, user))
                try {
                    UnitOfWork.Save();
                    return Ok();
                } catch (Exception) {
                    return InternalServerError();
                }
            return BadRequest();
        }


        [HttpPut]
        [Route("{teamId}/users/{userId}")]
        [Authorize]
        public IHttpActionResult Update(int teamId, string userId) {
            var user = UnitOfWork.UserRepository.Get(userId);
            if (user == null) return BadRequest();

            UnitOfWork.TeamRepository.AddUserToTeam(teamId, user);
            UnitOfWork.Save(); return Ok();
        }
    }
}
