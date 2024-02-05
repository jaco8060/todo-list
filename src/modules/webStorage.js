const webStorage = (function () {
  const saveToStorage = (objectToSave, index) => {
    localStorage.setItem(index, JSON.stringify(objectToSave));
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
