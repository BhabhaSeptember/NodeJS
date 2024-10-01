//Ensure no JS is run until DOM is loaded and ready
// $(document).ready(() => {
//   $("#modal-button").click(() => {
//     $(".modal-body").html("");
//Remember: Difference between Line 6 and 8
// //  //  $.get("/courses?format=json", data => {
// // // $.get("/api/courses", data => {
//       data.forEach(course => {
//         $(".modal-body").append(
//           `<div>
// 						<span class="course-title">
// 							${course.title}
// 						</span>
// 						<div class="course-description">
// 							${course.description}
// 						</div>
// 					</div>`
//         );
//       });
//     });
//   });
// });

//--------------------------------------------------------------------------------------

$(document).ready( () => {
  $("#modal-button").click( () => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach( (course) => {
        $(".modal-body").append(
          `<div>
          <span class="course-title">
          ${course.title}
          </span>
          <button class= '${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}"> ${course.joined ? "Joined" : "Join"}</button>
          <div class="course-description">
          ${course.description}
          </div>         
          </div>`
        );
      });
    }).then( () => {
      addJoinButtonListener();
    });
  });
});

//$ indicates that it represents a jQuery object
let addJoinButtonListener = () => {
  $(".join-button").click( (event) => {
    //Grab the target of the click/button
    let $button = $(event.target);
    //Pull the data ID set earlier with courses ID
    let courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button.text("Joined")
        .addClass("joined-button")
        .removeClass("join-button");
      } else {
        $button.text("Sorry, please login. Then try again");
      }
    });
  });
}
