class todoView {
  static displayTodo(Todo) {
    console.log(`Title: ${Todo.title}`);
    console.log(`Details: ${Todo.details}`);
    console.log(`Due Date: ${Todo.date}`);
  }
  static displayProjectList(projectList) {
    console.log(projectList.todoList);
  }
}

export { todoView };
