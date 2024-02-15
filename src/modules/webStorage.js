const webStorage = (function () {
  const saveToStorage = (objectToSave, listName, index) => {
    // Retrieve the existing array from local storage
    let storedData = localStorage.getItem(listName);

    // Initialize myArray
    // Parse the retrieved data or initialize an empty array if null
    let myArray;
    if (storedData) {
      myArray = JSON.parse(storedData);
    } else {
      myArray = [];
    }

    // replace/add tasks to project lists
    myArray[index] = objectToSave;

    // Save the updated array back to local storage
    localStorage.setItem(listName, JSON.stringify(myArray));
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  const loadStorage = (index) => {
    const myLocalData = JSON.parse(localStorage.getItem(index));
    return myLocalData;
  };

  return { saveToStorage, clearStorage, loadStorage };
})();

export { webStorage };
