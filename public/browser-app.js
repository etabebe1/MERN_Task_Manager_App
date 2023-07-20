// html elements as variables
const formDOM = document.querySelector(".task-input");
const taskInput = document.querySelector(".task-name");
const formAlert = document.querySelector(".form-alert");
const loadingTask = document.querySelector(".loading-task");
const listOfTask = document.querySelector(".list-of-task");
const mainSection = document.querySelector(".main");

// Load task from /api/v1/task || GET-request

const showTask = async () => {
  loadingTask.style.display = "block";

  fetch("/api/v1/task")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response is not OK!\u{274C}");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const {
        data: { task: tasks, nbHits },
      } = data;

      if (nbHits < 1) {
        loadingTask.style.display = "none";
        listOfTask.innerHTML = `<h4 class="empty-task">\u{1F494} You have no task added BORKIEE! Start working. \u{1F494}<h4>`;
      } else if (nbHits >= 1) {
        loadingTask.style.display = "none";
        const allTasks = tasks
          .map((task) => {
            const { _id: taskID, name: taskName, completed } = task;

            return `
             <div class="single-task ${completed && "task-completed"}">
                <div class="heading-update">
                  <input type="checkbox" id="checkbox" />
                  <h1 class="task-name-header">${taskName}</h1>
                </div>
              
                <div class="btn">
                  <button id="edit">
                     <a href="task.html?id=${taskID}">edit</a>
                  </button>
                   <button class="delete-btn" data-id="${taskID}">delete</button>
                </div>
            </div>
                    `;
          })
          .join("");

        listOfTask.innerHTML = allTasks;

        // implementing functionality for the checkboxes
        const checkboxes = document.querySelectorAll("#checkbox");
        const taskNameHeader = document.querySelectorAll(".task-name-header");

        checkboxes.forEach((checkbox, index) => {
          checkbox.disabled = true;
          const parentEl = checkbox.parentNode.parentNode;
          const parentElContains =
            parentEl.classList.contains("task-completed");

          if (parentElContains) {
            checkbox.checked = true;
            taskNameHeader[index].style.textDecoration = "line-through";
          } else if (!parentElContains) {
            taskNameHeader[index].style.textDecoration = "none";
            checkbox.style.display = "none";
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      listOfTask.innerHTML = `<h3 class="empty-task "> \u{274C}There was an error, please try again later. \u{274C}</h3>`;
    });
};
showTask();

// deleting task using /api/v1/task/:{id} || DELETE-request

listOfTask.addEventListener("click", async (event) => {
  const deleteBtn = event.target;
  if (deleteBtn.classList.contains("delete-btn")) {
    loadingTask.style.display = "block";
    const id = deleteBtn.dataset.id;

    try {
      fetch(`/api/v1/task/${id}`, { method: "Delete" }).then((response) => {
        if (response.ok) {
          // alert("You've successfully deleted. \u{1F60D}");
          showTask();
        } else {
          // alert("Failed to delete task. \u{1F625}");
          showTask();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

//Form submit functionality || POST-request using /api/v1/task/

const form = document.querySelector(".task-input");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = taskInput.value;

  try {
    fetch("/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}` }),
    }).then((response) => {
      if (response.ok) {
        // alert("You've successfully submitted. \u{1F60D}");
        showTask();
        taskInput.value = "";
        formAlert.innerHTML = `<h4>Success, task added</h4>`;
        formAlert.style.display = "block";
        formAlert.classList.add("success");
      } else {
        // alert("Failed to submit task. \u{1F625}");
        showTask();
        formAlert.innerHTML = `<h4>Error, please try again.</h4>`;
        formAlert.style.display = "block";
        formAlert.classList.add("warning");
      }

      setTimeout(() => {
        formAlert.style.display = "none";
        if (
          formAlert.classList.contains("warning") ||
          formAlert.classList.contains("success")
        ) {
          formAlert.classList.remove("warning");
          formAlert.classList.remove("success");
        }
      }, 3000);
    });
  } catch (error) {
    console.log(error);
  }
});
