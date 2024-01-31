class Todo {
  constructor(title, details, date, project) {
    this._title = title; // Using underscore-prefixed private property
    this._details = details;
    this._date = date;
    this._project = project;
  }

  get title() {
    return this._title;
  }

  get details() {
    return this._details;
  }

  get date() {
    return this._date;
  }

  get project() {
    return this._project;
  }
}

export { Todo };
