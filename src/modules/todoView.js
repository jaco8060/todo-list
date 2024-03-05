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

  static addProjectButton(projectName) {
    const projectList = document.getElementById("customProjects");

    // Create the button element
    const projectListButton = document.createElement("button");
    button.setAttribute("class", "project-button");

    // Create the img element
    const img = document.createElement("img");
    img.setAttribute("src", "img/menu-icon.svg");
    img.setAttribute("alt", "add icon");
    img.setAttribute("class", "project-button-icon");

    // Append the img to the button
    projectListButton.appendChild(img);
    projectListButton.appendChild(document.createTextNode(projectName));

    // Append the button to project list
    projectList.appendChild(projectListButton);
  }

  static updateProjectListDisplay() {
    const projectList = document.getElementById("customProjects");

    // first reset the dom and then add all the elements together

    this.addProjectButton();
  }
}

export { todoView };
