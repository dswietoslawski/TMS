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
        [Route("")]
        [Authorize]
        public IHttpActionResult Post(ToDoItemBindingModel toDoItemModel) {
            if (ModelState.IsValid) {
                var toDoItem = ModelFactory.Create(toDoItemModel);

                toDoItem.Team = UnitOfWork.TeamRepository.Get(toDoItemModel.TeamId);
                toDoItem.User = UnitOfWork.UserRepository.Get(toDoItemModel.UserId);

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
            return Ok(UnitOfWork.ToDoItemRepository.GetByTeam(teamId));
        }

        [HttpGet]
        [Route("todoitems/{id}")]
        public IHttpActionResult Get(int id) {
            return Ok(UnitOfWork.ToDoItemRepository.Get(id));
        }

        [HttpGet]
        [Route("teams/{teamId}/users/{userId}/todoItems")]
        public IHttpActionResult Get(int teamId, string userId) {
            return Ok(UnitOfWork.ToDoItemRepository.Get(teamId, userId));
        }

        [HttpGet]
        [Route("users/{userId}/todoitems")]
        public IHttpActionResult GetByUser(string userId) {
            return Ok(UnitOfWork.ToDoItemRepository.GetByUser(userId));
        }
    }
}
