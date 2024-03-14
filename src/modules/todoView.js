import { add } from "date-fns";
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

    inboxBtn.addEventListener("click", this.displayContentWindowInbox);
    todayBtn.addEventListener("click", this.displayContentWindowToday);
    weekBtn.addEventListener("click", this.displayContentWindowWeek);
    starredBtn.addEventListener("click", this.displayContentWindowStarred);
    addProjectPopup.addEventListener("click", this.showPopupDisplay);
    addProject.addEventListener("click", this.addProject);
    cancelProject.addEventListener("click", this.hidePopupDisplay);
    addProjectForm.addEventListener("submit", this.addProject);
  }
  static displayContentWindow(e) {
    e.stopImmediatePropagation();
    // reset content
    const content = document.getElementById("content");
    content.innerHTML = "";

    //create div to contain todos
    const todoContainer = document.createElement("div");
    todoContainer.setAttribute("class", "todo-container");
    content.appendChild(todoContainer);

    //change active project selection
    todoView.updateActiveProjectSelection(e.currentTarget);

    // create heading and place it on the dom for the current project selected
    const projectHeading = document.createElement("h1");
    const buttonText = e.currentTarget.textContent; // or e.target.innerText
    projectHeading.textContent = buttonText;
    content.appendChild(projectHeading);

    // retrieve project index
    const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);

    // load project based on index
    const projectData = webStorage.loadStorage("myProjectList")[index];

    const project = Project.rehydrate(projectData);
    // call on function to create addTodoWindowcontainer using project data
    todoView.createAddWindowContainer(project);

    // create Add Todo button
    const addTodoContainer = document.createElement("div");
    addTodoContainer.innerHTML = `
    <button id="addTodoPopup">
      <i class="fa-solid fa-plus"></i>
      Add Todo
    </button>
    `;
    content.appendChild(addTodoContainer);
    const addTodoPopup = document.getElementById("addTodoPopup");
    addTodoPopup.addEventListener("click", todoView.showAddTodoDisplay);

    // create add project button
    const addIcon = document.createElement("i");
    addIcon.setAttribute("class", "fa-solid fa-plus");
    addIcon.addEventListener("click", todoView.showAddTodoDisplay);
  }

  static updateActiveProjectSelection(currentSelectedContainer) {
    const previousSelectedContainer = document.querySelector(".active");

    const currentSelectedButton =
      currentSelectedContainer.querySelector(".project-button");
    // If there is a previously selected element, remove the .active class
    if (previousSelectedContainer !== null) {
      const previousSelectedButton =
        previousSelectedContainer.querySelector(".project-button");
      previousSelectedContainer.classList.remove("active");
      previousSelectedButton.classList.remove("active");
    }
    // Add the .active class to the clicked element
    currentSelectedContainer.classList.add("active");
    currentSelectedButton.classList.add("active");
  }
  static createAddWindowContainer(project) {
    // create Add Todo window
    const addTodoWindowContainer = document.createElement("form");
    const content = document.getElementById("content");

    addTodoWindowContainer.setAttribute("id", "addTodoWindowContainer");
    addTodoWindowContainer.innerHTML = `
        <label for="todo-title">Name of Todo:</label>
        <input type="text" id="todo-title" required />
        <label for="date-input">Date of Todo:</label>
        <input type="date" id="date-input" name="date-input" required />
        <label for="todo-details">Todo Details:</label>
        <textarea id="todo-details" rows="2"></textarea>
        <button id="addTodoButton">Add Todo</button>
        <button id="cancelTodoButton">Cancel Todo</button>
        `;
    content.appendChild(addTodoWindowContainer);
    const addTodoButton = document.getElementById("addTodoButton");
    const cancelTodoButton = document.getElementById("cancelTodoButton");
    cancelTodoButton.addEventListener("click", todoView.hideAddTodoDisplay);

    addTodoButton.addEventListener("click", (e) =>
      todoView.addTodo(e, project)
    );
  }

  static addTodo(e, project) {
    e.preventDefault(); // Prevent the form from submitting
    const todoTitle = document.getElementById("todo-title");
    const todoDetails = document.getElementById("todo-details");
    const dateInput = document.getElementById("date-input");
    const addTodoWindowContainer = document.getElementById(
      "addTodoWindowContainer"
    );
    todoView.updateTodoContainer(project.todoList);
    // Check if required fields are filled
    if (addTodoWindowContainer.checkValidity()) {
      project.addProjectTask(
        todoTitle.value,
        todoDetails.value,
        dateInput.value
      );
      todoView.updateTodoContainer(project.todoList);
      todoView.hideAddTodoDisplay();
    } else {
      addTodoWindowContainer.reportValidity();
      return;
    }

    console.log(project.todoList);
  }

  static updateTodoContainer(projectList) {
    const todoContainer = document.querySelector(".todo-container");

    // clear container
    todoContainer.innerHTML = "";

    projectList.forEach((todo) => console.log(todo));
  }

  static createTodoObjectDisplay(todo) {
    const todoContainer = document.querySelector(".todo-container");
  }

  static showAddTodoDisplay(e) {
    const addTodoWindowContainer = document.getElementById(
      "addTodoWindowContainer"
    );
    const addTodoPopup = document.getElementById("addTodoPopup");
    addTodoWindowContainer.style.display = "flex";
    addTodoPopup.style.display = "none";
  }

  static hideAddTodoDisplay(e) {
    const addTodoWindowContainer = document.getElementById(
      "addTodoWindowContainer"
    );
    const todoTitle = document.getElementById("todo-title");
    const todoDetails = document.getElementById("todo-details");
    const dateInput = document.getElementById("date-input");
    const addTodoPopup = document.getElementById("addTodoPopup");
    //clear input values and hide display
    todoTitle.value = "";
    todoDetails.value = "";
    dateInput.value = "";

    addTodoWindowContainer.style.display = "none";
    addTodoPopup.style.display = "flex";
  }

  static createTodoWindow(todo) {
    const content = document.getElementById("content");

    //create a container to contain todo
    const todoContainer = document.createElement("div");
    todoContainer.setAttribute("class", "todo-container");
  }

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
    buttonContainer.setAttribute("data-index", index);

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

    // Add button to button container
    buttonContainer.appendChild(projectListButton);

    // create delete button to delete project and append to button container
    const deleteButton = document.createElement("i");
    deleteButton.setAttribute("class", "fa-solid fa-xmark");
    deleteButton.addEventListener("click", todoView.deleteProjectButton);

    buttonContainer.appendChild(deleteButton);

    // Add click event listener to the button container
    buttonContainer.addEventListener("click", todoView.displayContentWindow);

    // Append the button to project list
    projectList.appendChild(buttonContainer);
  }

  static updateProjectListDisplay() {
    const projectList = document.getElementById("customProjects");

    // first reset the dom and then add all the elements together
    projectList.innerHTML = "";

    const localStorageList = webStorage.loadStorage("myProjectList");

    // console.log(localStorageList);
    localStorageList.forEach((list_item) => {
      this.addProjectButton(list_item.projectName, list_item.index);
    });
  }

  static deleteProjectButton(e) {
    // Prevent the default action
    e.preventDefault();
    // Stop the event from bubbling up and prevent other handlers from being executed
    e.stopImmediatePropagation();

    // Access the parent container of the clicked delete button
    const buttonContainer = e.currentTarget.parentNode;

    // Retrieve the 'data-index' attribute from the project button
    const index = parseInt(buttonContainer.getAttribute("data-index"), 10);

    //delete from project list
    webStorage.deleteFromStorage(index);

    // delete from dom
    buttonContainer.remove();

    //update indices in the dom
    todoView.updateProjectListDisplay();
  }
}

export { todoView };
