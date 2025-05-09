const rootList = document.getElementById('root');
const apiUrl = 'https://randomuser.me/api';

/**
 * Fetches user data from the Random User API using the Fetch API.
 * @async
 * @param {string} apiUrl - The base API URL.
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
 * @param {string} apiUrl - The base API URL.
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
    <li key="${user.id.value || Math.random()}">
        <img src="${user.picture.large}" alt="${name}"/>
        <p>${name}<br>
        from ${user.location.city}, ${user.location.country}</p>
    </li>`;
    return acc + listElement;
  }, '');
  rootList.innerHTML = list;
};

// ======== INTERACTIVE SECTION ========

const method = prompt('Which method to use? Enter "fetch" or "xhr":', 'fetch').toLowerCase();
const gender = prompt('Enter gender filter ("male", "female", or leave blank):', 'female');
const results = prompt('How many users do you want to fetch?', '10');

const queryParts = [];
if (gender) queryParts.push(`gender=${gender}`);
if (results) queryParts.push(`results=${results}`);
const finalQuery = queryParts.join('&');

(method === 'xhr' ? getDataXHR(apiUrl, finalQuery) : getData(apiUrl, finalQuery))
  .then((list) => renderUserList(rootList, list))
  .catch((error) => {
    rootList.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  });
