class Todo {
  constructor(title, details, date, project) {
    this.title = title;
    this.details = details;
    this.date = date;
    this.project = project;
  }

  // Getters
  get getTitle() {
    return this.title;
  }

  get getDetails() {
    return this.details;
  }

  get getDate() {
    return this.date;
  }

  get getProject() {
    return this.project;
  }
}
