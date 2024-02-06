const webStorage = (function () {
  const saveToStorage = (objectToSave, listName) => {
    // Retrieve the existing array from local storage
    let storedData = localStorage.getItem(listName);

    // Parse the retrieved data or initialize an empty array if null
    let myArray = storedData ? JSON.parse(storedData) : [];

    //append new data to parsed array:
    myArray.push(objectToSave);
    localStorage.setItem(listName, JSON.stringify(myArray));
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  const loadStorage = (index) => {
    const myLocalData = JSON.parse(localStorage.getItem(index));
    return myLocalData;
  };

  const removeStorage = (index) => {
    localStorage.removeItem(index);
  };
  return { saveToStorage, clearStorage, loadStorage, removeStorage };
})();

export { webStorage };
