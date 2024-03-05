import { isBefore, startOfToday } from "date-fns";

class Todo {
  constructor(title, details, date) {
    this._title = title;
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

  get isOverdue() {
    return this._isOverdue;
  }

  get starred() {
    return this._starred;
  }

  // Setters
  set title(newTitle) {
    this._title = newTitle;
    this.updateOverdueStatus(); // Update overdue status in case the change affects it
  }

  set details(newDetails) {
    this._details = newDetails;
  }

  set date(newDate) {
    this._date = newDate instanceof Date ? newDate : new Date(newDate);
    this.updateOverdueStatus(); // Always update overdue status when date changes
  }

  updateOverdueStatus() {
    this._isOverdue = isBefore(this._date, startOfToday());
  }

  // Method to mark the todo as starred
  makeStarred() {
    this._starred = true;
  }

  // Method to remove the starred status
  removeStarred() {
    this._starred = false;
  }

  // Method to prepare Todo for JSON serialization
  toJSON() {
    return {
      title: this._title,
      details: this._details,
      date: this._date.toISOString(), // Convert Date to ISO string for serialization
      starred: this._starred,
      isOverdue: this._isOverdue, // Optionally include if you want to persist this status
    };
  }
}

export { Todo };
