export function setDataToStorageForMain(formattedData) {
    localStorage.setItem('active-search-items', JSON.stringify(formattedData));
}