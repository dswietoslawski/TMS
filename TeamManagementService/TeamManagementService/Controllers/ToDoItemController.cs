using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using TeamManagementService.Models.Tasks;

namespace TeamManagementService.Controllers {
    [RoutePrefix("api")]
    public class ToDoItemController : BaseApiController {

        [HttpPost]
        [Route("teams/{teamId}/users/{userId}/todoitems")]
        [Authorize]
        public IHttpActionResult Post(ToDoItemBindingModel toDoItemModel, int teamId, string userId) {
            if (ModelState.IsValid) {
                var toDoItem = ModelFactory.Create(toDoItemModel);

                toDoItem.Team = UnitOfWork.TeamRepository.Get(teamId);
                toDoItem.User = UnitOfWork.UserRepository.Get(userId);

                var entity = UnitOfWork.ToDoItemRepository.Add(toDoItem);
                UnitOfWork.Save();

                var response = ModelFactory.Create(entity);
                var location = new Uri(Request.RequestUri + "/" + response.Id);

                return Created(location, response);
            };

            return BadRequest();
        }

        [HttpGet]
        [Route("teams/{teamId}/todoitems")]
        [Authorize]
        public IHttpActionResult GetByTeam(int teamId) {
            var response = ModelFactory.Create(UnitOfWork.ToDoItemRepository.GetByTeam(teamId));
            return Ok(response);
        }

        [HttpGet]
        [Route("todoitems/{id}")]
        public IHttpActionResult Get(int id) {
            var response = ModelFactory.Create(UnitOfWork.ToDoItemRepository.Get(id));
            return Ok(response);
        }

        [HttpGet]
        [Route("teams/{teamId}/users/{userId}/todoItems")]
        public IHttpActionResult Get(int teamId, string userId) {
            return Ok(ModelFactory.Create(UnitOfWork.ToDoItemRepository.Get(teamId, userId)));
        }

        [HttpGet]
        [Route("users/{userId}/todoitems")]
        public IHttpActionResult GetByUser(string userId) {
            return Ok(ModelFactory.Create(UnitOfWork.ToDoItemRepository.GetByUser(userId)));
        }

        [HttpPut]
        [Route("teams/{teamId}/users/{userId}/todoitems")]
        public IHttpActionResult Update(ToDoItemBindingModel model, int teamId, string userId) {
            if (ModelState.IsValid) {
                var entity = ModelFactory.Create(model);
                entity.User = UnitOfWork.UserRepository.Get(userId);
                entity.Team = UnitOfWork.TeamRepository.Get(teamId);

                var response = ModelFactory.Create(UnitOfWork.ToDoItemRepository.Update(entity));
                UnitOfWork.Save();
                return Ok(response);
            };
            return BadRequest();
        }

        [HttpDelete]
        [Route("teams/{teamId}/todoitems")]
        public IHttpActionResult Delete(ToDoItemBindingModel model, int teamId, string userId) {
            if (ModelState.IsValid) {
                var entity = ModelFactory.Create(model);
                bool response = UnitOfWork.ToDoItemRepository.Delete(entity);
                UnitOfWork.Save();
                if (response) return Ok();
            }
            return BadRequest();
        }
    }
}
