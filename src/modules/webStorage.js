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

  const deleteFromStorage = (index) => {
    let storedData = loadStorage("myProjectList");

    storedData.splice(index, 1);

    // reset indices
    for (let i = 0; i < storedData.length; i++) {
      storedData[i].index = i;
    }

    localStorage.setItem("myProjectList", JSON.stringify(storedData));
  };
  const loadStorage = (name) => {
    const myLocalData = JSON.parse(localStorage.getItem(name));
    return myLocalData;
  };

  const countProjectsInStorage = () => {
    // Use the loadStorage function to retrieve the projects array
    const projectsArray = loadStorage("myProjectList");

    // Check if the projectsArray exists and is an array, then return its length
    if (Array.isArray(projectsArray)) {
      return projectsArray.length;
    }

    // If the projectsArray doesn't exist, return 0
    return 0;
  };

  return {
    saveToStorage,
    clearStorage,
    loadStorage,
    countProjectsInStorage,
    deleteFromStorage,
  };
})();

export { webStorage };
