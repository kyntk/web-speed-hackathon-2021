/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.arrayBuffer();
    }
  });
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  return fetch(url, {
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);

  return fetch(url, {
    body: jsonString,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
