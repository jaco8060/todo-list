import { add } from "date-fns";
import menuIcon from "../img/menu-icon.svg";

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
  static displayContentWindow(e) {
    e.stopImmediatePropagation();
    // reset content
    const content = document.getElementById("content");
    content.innerHTML = "";

    //update default todos

    //change active project selection
    todoView.updateActiveProjectSelection(e.currentTarget);

    // create heading and place it on the dom for the current project selected
    const projectHeading = document.createElement("h1");
    const buttonText = e.currentTarget.textContent.trim(); // or e.target.innerText
    projectHeading.textContent = buttonText;
    content.appendChild(projectHeading);

    //create div to contain todos
    const projectContainer = document.createElement("div");
    projectContainer.setAttribute("class", "project-container");
    content.appendChild(projectContainer);

    // retrieve project index
    const index = e.currentTarget.getAttribute("data-index");

    // load project based on index

    const projectData = webStorage.loadStorage("myProjectList")[index];
    const project = Project.rehydrate(projectData);
    // call on function to create addTodoWindowcontainer using project data
    todoView.createAddWindowContainer(project);
    if (
      buttonText !== "Inbox" &&
      buttonText !== "Today" &&
      buttonText !== "This Week" &&
      buttonText !== "Starred"
    ) {
      // create Add Todo button
      const addTodoContainer = document.createElement("div");
      addTodoContainer.setAttribute("class", "addTodoPopupContainer");
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

    //update todos on the page

    todoView.updateProjectContainer(project);
  }

  static updateActiveProjectSelection(currentSelectedContainer) {
    const previousSelectedContainer = document.querySelector(".active");

    // If there is a previously selected element, remove the .active class
    if (previousSelectedContainer !== null) {
      const previousSelectedButton =
        previousSelectedContainer.querySelector(".project-button");
      previousSelectedContainer.classList.remove("active");
      previousSelectedButton.classList.remove("active");
    }

    let currentSelectedButton =
      currentSelectedContainer.querySelector(".project-button");
    if (currentSelectedContainer.classList == "project-button-container") {
      // Add the .active class to the clicked element
      currentSelectedContainer.classList.add("active");
      currentSelectedButton.classList.add("active");
    } else {
      currentSelectedContainer.classList.add("active");
    }
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

    // Regular expression to match the date format YYYY-MM-DD
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    const projectTodolist = project.todoList;
    // Check if required fields are filled and the date format is correct
    if (
      addTodoWindowContainer.checkValidity() &&
      dateFormatRegex.test(dateInput.value)
    ) {
      project.addProjectTask(
        todoTitle.value,
        todoDetails.value,
        dateInput.value,
        projectTodolist.length //set it to be the last element in the array + 1
      );
      todoView.updateProjectContainer(project);
      todoView.hideAddTodoDisplay();
      //update default projects
      allTodos.updateAllTodoListFromStorage();
    } else {
      if (!dateFormatRegex.test(dateInput.value)) {
        alert("Please enter the date in YYYY-MM-DD format.");
      } else {
        addTodoWindowContainer.reportValidity();
      }
      return;
    }
  }

  static updateProjectContainer(project) {
    const projectContainer = document.querySelector(".project-container");
    const projectList = project.todoList;
    // clear container
    projectContainer.innerHTML = "";

    //sort todos by date:
    project.sortTodoListByDate();

    projectList.forEach((todo) => todoView.createTodoWindow(todo, project));
  }

  static createTodoWindow(todo, project) {
    const projectContainer = document.querySelector(".project-container");
    //create a container to contain todo
    const todoContainer = document.createElement("div");
    console.log(project.index);
    todoContainer.setAttribute("class", "todo-container");
    todoContainer.setAttribute("data-index", todo.index);
    if (project.index >= 4) {
      // console.log("greater than 3");
      todoContainer.innerHTML = `
      <div class="leftPanel">
      <span
      ><h2 class="todoTitle"></h2>
      <i class="fa-solid fa-pen-to-square"></i
      ></span>
      <p class="todoDetails"></p>
      </div>
      <div class="rightPanel">
      <input type="date" class="todoDate" />
      <i class="fa-regular fa-star"></i>
      <i class="fa-solid fa-trash"></i>
      </div>
      `;
      const todoTitle = todoContainer.querySelector(".todoTitle");
      const todoDetails = todoContainer.querySelector(".todoDetails");
      const todoDate = todoContainer.querySelector(".todoDate");
      const starButton = todoContainer.querySelector(".fa-star");

      starButton.addEventListener("click", (e) =>
        todoView.toggleStarred(e, todo, project)
      );
      const trashButton = todoContainer.querySelector(".fa-trash");
      trashButton.addEventListener("click", (e) =>
        todoView.deleteTodo(e, todo, project)
      );
      // add listener for todo title
      todoTitle.addEventListener("click", (e) =>
        todoView.editTitle(e, todo, project)
      );

      // add listener for todo details
      todoDetails.addEventListener("click", (e) =>
        todoView.editDetails(e, todo, project)
      );
      // add listener for todo date change
      todoDate.addEventListener("change", (e) =>
        todoView.editDate(e, todo, project)
      );

      todoTitle.textContent = todo.title;
      todoDetails.textContent = todo.details;
      todoDate.value = todo.formatDate(todo.date);

      todo.starred
        ? starButton.setAttribute("class", "fa-solid fa-star")
        : starButton.setAttribute("class", "fa-regular fa-star");
    } else {
      todoContainer.innerHTML = `
      <div class="leftPanel">
      <h2 class="todoTitle"></h2>
      <p class="todoDetails"></p>
      </div>
      <div class="rightPanel">
      <input type="date" class="todoDate" />
      </div>
      `;
      const todoTitle = todoContainer.querySelector(".todoTitle");
      const todoDetails = todoContainer.querySelector(".todoDetails");
      const todoDate = todoContainer.querySelector(".todoDate");
      todoTitle.textContent = todo.title;
      todoDetails.textContent = todo.details;
      todoDate.value = todo.formatDate(todo.date);
    }

    projectContainer.appendChild(todoContainer);
  }

  static editDate(e, todo, project) {
    todo.date = e.currentTarget.value;
    project.saveProject();
  }
  static editTitle(e, todo, project) {
    const todoTitle = e.currentTarget;

    // Create a new input element
    const input = document.createElement("input");

    // Set the input type to text
    input.type = "text";
    // Set the input's initial value to the current title
    input.value = todoTitle.textContent;
    // Replace the todoTitle with the input element
    todoTitle.replaceWith(input);
    // Focus the input field to start editing immediately
    input.focus();

    // Define what happens when the input loses focus
    input.addEventListener("blur", function () {
      // Update the todo's title with the new value
      todoTitle.textContent = input.value;

      // Replace the input with the updated todoTitle element
      input.replaceWith(todoTitle);

      todo.title = input.value;
      project.saveProject();
    });

    //  Save the change if the user presses Enter
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        input.blur(); // This triggers the blur event handler above
      }
    });
  }

  static editDetails(e, todo, project) {
    const todoTitle = e.currentTarget;

    // Create a new input element
    const input = document.createElement("input");

    // Set the input type to text
    input.type = "text";
    // Set the input's initial value to the current title
    input.value = todoTitle.textContent;
    // Replace the todoTitle with the input element
    todoTitle.replaceWith(input);
    // Focus the input field to start editing immediately
    input.focus();

    // Define what happens when the input loses focus
    input.addEventListener("blur", function () {
      // Update the todo's title with the new value
      todoTitle.textContent = input.value;

      // Replace the input with the updated todoTitle element
      input.replaceWith(todoTitle);

      todo.details = input.value;
      project.saveProject();
      //update default projects
      allTodos.updateAllTodoListFromStorage();
    });

    //  Save the change if the user presses Enter
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        input.blur(); // This triggers the blur event handler above
      }
    });
  }

  static toggleStarred(e, todo, project) {
    if (e.currentTarget.className == "fa-regular fa-star") {
      e.currentTarget.setAttribute("class", "fa-solid fa-star");
      todo.makeStarred();
      project.saveProject();
    } else if (e.currentTarget.className == "fa-solid fa-star") {
      e.currentTarget.setAttribute("class", "fa-regular fa-star");
      todo.removeStarred();
      project.saveProject();
    }
    //update default projects
    allTodos.updateAllTodoListFromStorage();
  }

  static deleteTodo(e, todo, project) {
    project.removeProjectTask(todo.index);
    todoView.updateProjectContainer(project);

    //update default projects
    allTodos.updateAllTodoListFromStorage();
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
    img.setAttribute("src", menuIcon);
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

    //update the list with all projects except default projects
    for (let i = 4; i < localStorageList.length; i++) {
      this.addProjectButton(
        localStorageList[i].projectName,
        localStorageList[i].index
      );
    }

    // localStorageList.forEach((list_item) => {
    //   this.addProjectButton(list_item.projectName, list_item.index);
    // });
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
