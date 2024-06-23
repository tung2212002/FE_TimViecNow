const getLocalItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

const setLocalItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const updateLocalItem = (key, newValue) => {
    const item = getLocalItem(key);
    const updatedItem = { ...item, ...newValue };
    setLocalItem(key, updatedItem);
};

const removeLocalItem = (key) => {
    localStorage.removeItem(key);
};

export { getLocalItem, setLocalItem, updateLocalItem, removeLocalItem };
