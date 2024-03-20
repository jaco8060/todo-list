import { format, isBefore, parseISO, startOfToday } from "date-fns";

class Todo {
  constructor(title, details, date, index) {
    this._title = title;
    this._details = details;
    this._date = this.parseDate(date); // Use parseDate to ensure _date is a Date object
    this._index = index;
    this._starred = false;
    this.updateOverdueStatus();
  }
  // Parses a date input to a Date object
  parseDate(date) {
    return typeof date === "string" ? parseISO(date) : date;
  }

  // Formats a Date object to "YYYY-MM-DD" string
  formatDate(date) {
    return format(date, "yyyy-MM-dd");
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

  get index() {
    return this._index;
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
  }

  set details(newDetails) {
    // Set _details to newDetails or '-' if newDetails is falsy (but not 0 or false)
    this._details =
      newDetails ||
      (newDetails !== 0 && newDetails !== false ? "-" : newDetails);
  }

  // Parses the date from "YYYY-MM-DD" format when setting
  set date(newDate) {
    this._date = this.parseDate(newDate);
    this.updateOverdueStatus();
  }

  set index(newIndex) {
    this._index = newIndex;
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
      index: this._index,
      starred: this._starred,
      isOverdue: this._isOverdue, // Optionally include if you want to persist this status
    };
  }
}

export { Todo };
