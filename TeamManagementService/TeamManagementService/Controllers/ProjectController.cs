using System;
using System.Collections.Generic;
using System.Web.Http;
using TeamManagementService.Models.Projects;

namespace TeamManagementService.Controllers {
    [RoutePrefix("api")]
    public class ProjectController : BaseApiController {

        [HttpGet]
        [Route("teams")]
        public IHttpActionResult Get() {
            var entities = UnitOfWork.ProjectRepository.Get();
            var response = new List<ProjectReturnModel>();

            foreach (var entity in entities)
                response.Add(ModelFactory.Create(entity));

            return Ok(response);
        }

        [HttpGet]
        [Route("teams")]
        public IHttpActionResult Get(int id) {
            var team = UnitOfWork.ProjectRepository.Get(id);
            return Ok(ModelFactory.Create(team));
        }

        [HttpGet]
        [Route("users/{userId}/teams")]
        [Authorize]
        public IHttpActionResult GetByUser(string userId) {
            var entities = UnitOfWork.ProjectRepository.GetByUser(userId);
            var response = new List<ProjectReturnModel>();

            foreach (var entity in entities)
                response.Add(ModelFactory.Create(entity));

            return Ok(response);
        }


        [HttpPost]
        [Route("teams")]
        [Authorize]
        public IHttpActionResult Post(ProjectBindingModel teamModel) {
            if (ModelState.IsValid) {

                var team = ModelFactory.Create(teamModel);
                team.Admin = UnitOfWork.UserRepository.Get(teamModel.AdminId);

                var entity = UnitOfWork.ProjectRepository.Add(team);
                UnitOfWork.Save();

                var response = ModelFactory.Create(entity);
                var location = new Uri(Request.RequestUri + "/" + response.Id);

                return Created(location, response);
            };

            return BadRequest();
        }

        [HttpDelete]
        [Route("teams/{teamId}/users/{userId}")]
        [Authorize]
        public IHttpActionResult DeleteUser(int teamId, string userId) {
            var user = UnitOfWork.UserRepository.Get(userId);
            if (user == null) return BadRequest();

            if (UnitOfWork.ProjectRepository.DeleteUserFromTeam(teamId, user))
                try {
                    UnitOfWork.Save();
                    return Ok();
                } catch (Exception) {
                    return InternalServerError();
                }
            return BadRequest();
        }


        [HttpPut]
        [Route("teams/{teamId}/users/{userId}")]
        [Authorize]
        public IHttpActionResult Update(int teamId, string userId) {
            var user = UnitOfWork.UserRepository.Get(userId);
            if (user == null) return BadRequest();

            UnitOfWork.ProjectRepository.AddUserToTeam(teamId, user);
            UnitOfWork.Save(); return Ok();
        }

        [HttpDelete]
        [Route("teams/{teamId}")]
        [Authorize]
        public IHttpActionResult Delete(int teamId) {
            try {
                UnitOfWork.ProjectRepository.Delete(teamId);
                UnitOfWork.Save();
                return Ok();
            } catch (Exception ex) {
                return InternalServerError(ex);
            }
        }
    }
}
