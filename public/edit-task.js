//* requiring necessary html element *//
const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector("#name");
const checkboxInput = document.querySelector("#completed");
const editBtn = document.querySelector(".edit-btn");
const formAlert = document.querySelector(".form-alert");
const editForm = document.querySelector("#form-edit");
const showLoading = document.querySelector(".loading-show");
const submitText = document.querySelector("#submitText");

// requiring req.params form search option on the window
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

//* creating a function that shows the current editable task *//

function showTask() {
  fetch(`/api/v1/task/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response is not OK! \u{274C}");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const {
        task: { _id: taskID, name: taskName, completed },
      } = data;

      taskIdDOM.textContent = taskID;
      taskNameDOM.value = taskName;

      if (completed) {
        checkboxInput.checked = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

showTask();

// Edit a task using patch method through ?
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitText.style.display = "none";
  showLoading.style.display = "flex";

  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = checkboxInput.checked;

    fetch(`/api/v1/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${taskName}`,
        completed: taskCompleted,
      }),
    }).then((response) => {
      if (!response.ok) {
        formAlert.style.display = "block";
        formAlert.textContent = "Failed to update task! \u{1F625}";
        formAlert.classList.add("warning");
        throw new Error("Failed to update task! \u{274C}");
      } else {
        showTask();
        formAlert.textContent = "Successful, task updated! \u{1F917}";
        formAlert.classList.add("success");
        formAlert.style.display = "block";

        // alert("Task updated successfully");
      }
    });

    // console.log("fetch");
  } catch (error) {
    console.log(error);
  }

  submitText.style.display = "block";
  showLoading.style.display = "none";

  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("success");
    formAlert.classList.remove("warning");
  }, 5000);
});
