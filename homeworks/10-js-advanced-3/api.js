const rootList = document.getElementById('root');
const apiUrl = 'https://randomuser.me/api';
const testQuery = 'gender=female&results=10';
const areTesting = 'xhr';

/**
 * Fetches user data from the Random User API using the Fetch API.
 * @async
 * @param {string} query - The query string to append to the API URL.
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */
const getData = async (apiUrl, query) => {
  try {
    const response = await fetch(`${apiUrl}/?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

/**
 * Fetches user data from the Random User API using XMLHttpRequest.
 * @param {string} query - The query string to append to the API URL.
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */
const getDataXHR = (apiUrl, query) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/?${query}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const jsonResponse = JSON.parse(xhr.responseText);
          resolve(jsonResponse.results);
        } catch (parseError) {
          reject(new Error(`Error parsing JSON: ${parseError.message}`));
        }
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Network error occurred'));
    };
    xhr.send();
  });
};

/**
 * Renders a list of users to the specified rootList element.
 * @param {HTMLElement} rootList - The rootList element to render the user list into.
 * @param {Array} userList - An array of user objects to render.
 */
const renderUserList = (rootList, userList) => {
  const list = userList.reduce((acc, user) => {
    const name = Object.values(user.name).join(' ');
    const listElement = `
    <li key="${user.id.value}">
        <img src="${user.picture.large}" alt="${name}"/>
        <p>${name}<br>
        from ${user.location.city}, ${user.location.country}</p>
    </li>`;
    return (acc += listElement);
  }, '');
  rootList.innerHTML = list;
};

areTesting === 'xhr'
  ? getDataXHR(apiUrl, testQuery).then((list) => renderUserList(rootList, list))
  : getData(apiUrl, testQuery).then((list) => renderUserList(rootList, list));
