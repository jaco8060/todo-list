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

      // update dom
      todoView.updateProjectListDisplay();
      inputBox.value = "";
      todoView.hidePopupDisplay();
    }
  }

  static addProjectButton(projectName, index) {
    const projectList = document.getElementById("customProjects");
    // Create the button container
    const buttonContainer = document.createElement("div");

    buttonContainer.setAttribute("class", "project-button-container");

    // Create the button element
    const projectListButton = document.createElement("button");
    projectListButton.setAttribute("class", "project-button");

    // Create the img element
    const img = document.createElement("img");
    img.setAttribute("src", "img/menu-icon.svg");
    img.setAttribute("alt", "add icon");
    img.setAttribute("class", "project-button-icon");

    // Append the img to the button
    projectListButton.appendChild(img);

    // Add text node for project name to the button
    projectListButton.appendChild(document.createTextNode(projectName));
    // Add event listener to update the dom
    projectListButton.addEventListener("click", this.displayContentWindow);

    // Add button to button container
    buttonContainer.appendChild(projectListButton);

    // create delete button to delete project and append to button container
    const deleteButton = document.createElement("i");
    deleteButton.setAttribute("class", "fa-solid fa-xmark");
    deleteButton.addEventListener("click", this.deleteProjectButton);

    buttonContainer.appendChild(deleteButton);

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

  static deleteProjectButton(e) {
    // Prevent the default action
    e.preventDefault();

    // Access the parent container of the clicked delete button
    const buttonContainer = e.target.parentNode;

    // Find the project button within the container
    const projectButton = buttonContainer.querySelector(".project-button");

    // Retrieve the 'data-index' attribute from the project button
    const index = projectButton.getAttribute("data-index");

    //delete from project list
    webStorage.deleteFromStorage(index);

    // delete from dom
    buttonContainer.remove();
  }
}

export { todoView };
