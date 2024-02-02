class Todo {
  constructor(title, details, date) {
    this._title = title; // Using underscore-prefixed private property
    this._details = details;
    this._date = date;
    this._starred = false;
  }

  // Getters
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

  // Setters
  set title(newTitle) {
    // Optionally, add validation or other logic here
    this._title = newTitle;
  }

  set details(newDetails) {
    this._details = newDetails;
  }

  set date(newDate) {
    this._date = newDate;
  }

  //methods make starred, remove starred
}

export { Todo };
