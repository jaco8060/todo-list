import { allTodos } from "./allTodos";
import { Project } from "./projectController";
import { webStorage } from "./webStorage";
class todoView {
  static displayTodo(Todo) {
    console.log(`Title: ${Todo.title}`);
    console.log(`Details: ${Todo.details}`);
    console.log(`Due Date: ${Todo.date}`);
    console.log(`Due Date: ${Todo.isOverdue}`);
  }
  static displayProjectList(projectList) {
    console.log(projectList.todoList);
  }

  static initializeListeners() {
    const inboxBtn = document.getElementById("inboxBtn");
    const todayBtn = document.getElementById("todayBtn");
    const weekBtn = document.getElementById("weekBtn");
    const addProjectPopup = document.getElementById("addProjectPopup");
    const addProject = document.querySelector(".add-project");
    const cancelProject = document.querySelector(".cancel-project");
    const addProjectForm = document.getElementById("addProjectForm");
    const starredBtn = document.getElementById("starBtn");

    inboxBtn.addEventListener("click", this.displayContentWindow);
    todayBtn.addEventListener("click", this.displayContentWindow);
    weekBtn.addEventListener("click", this.displayContentWindow);
    starredBtn.addEventListener("click", this.displayContentWindow);
    addProjectPopup.addEventListener("click", this.showPopupDisplay);
    addProject.addEventListener("click", this.addProject);
    cancelProject.addEventListener("click", this.hidePopupDisplay);
    addProjectForm.addEventListener("submit", this.addProject);
  }
  static displayContentWindow(e) {}

  static hidePopupDisplay(e) {
    const projectPopup = document.querySelector(".input-group");
    const addProjectPopup = document.getElementById("addProjectPopup");

    projectPopup.style.display = "none";
    addProjectPopup.style.display = "flex";
  }

  static showPopupDisplay(e) {
    const projectPopup = document.querySelector(".input-group");
    e.target.style.display = "none";
    projectPopup.style.display = "flex";
  }

  static addProject(e) {
    e.preventDefault();
    const projectList = document.getElementById("customProjects");
    const inputBox = document.querySelector(".add-project-input");

    if (inputBox.value == "") {
      alert("Can't have a blank project name");
      return;
    } else {
      //count how many projects are currently in the dom
      const numProjects = webStorage.countProjectsInStorage();

      //create a new project using the count as the index
      const project = new Project(inputBox.value, numProjects);
    }
  }

  static addProjectButton(projectName, index) {
    const projectList = document.getElementById("customProjects");
    // Create the button container
    const buttonContainer = document.createElement("div");

    buttonContainer.setAttribute("class", "project-button-container");

    const buttonContainerHTML = `
    <button class="project-button" data-index="${index}">
        <img src="img/menu-icon.svg" alt="add icon" class="project-button-icon">
        ${projectName}
    </button>
    <i class="fa-solid fa-xmark" ></i>
    `;
    buttonContainer.innerHTML = buttonContainerHTML;

    //

    // Append the button to project list
    projectList.appendChild(buttonContainer);
  }

  static updateProjectListDisplay() {
    const projectList = document.getElementById("customProjects");

    // first reset the dom and then add all the elements together
    projectList.innerHTML = "";

    const localStorageList = webStorage.loadStorage("myProjectList");

    console.log(localStorageList);
    localStorageList.forEach((list_item) => {
      this.addProjectButton(list_item.projectName, list_item.index);
    });
  }
}

export { todoView };
