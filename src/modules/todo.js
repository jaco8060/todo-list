import { isBefore, startOfToday } from "date-fns";
class Todo {
  constructor(title, details, date) {
    this._title = title; // Using underscore-prefixed private property
    this._details = details;
    this._date = date instanceof Date ? date : new Date(date); // Ensure _date is a Date object
    this._starred = false;
    this.updateOverdueStatus();
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

  updateOverdueStatus() {
    this._isOverdue = isBefore(this._date, startOfToday());
  }
  get isOverdue() {
    return this._isOverdue;
  }

  // Method to mark the todo as starred
  makeStarred() {
    this._starred = true;
  }

  // Method to remove the starred status
  removeStarred() {
    this._starred = false;
  }

  get starred() {
    return this._starred;
  }
}

export { Todo };
