const cohortId = 'wff-cohort-14';
const token = 'fcc46029-2fc5-44ef-9720-7eb1a6c61d97';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

const config = {
  baseUrl: baseUrl,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function getUserInfo() {
  try {
    const response = await fetch(`${config.baseUrl}/users/me`, { headers: config.headers });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}

export async function getInitialCards() {
  try {
    const response = await fetch(`${config.baseUrl}/cards`, { headers: config.headers });
    const cards = await handleResponse(response);
    console.log("Initial Cards:", cards);
    return cards;
  } catch (error) {
    console.error('Error fetching initial cards:', error);
    throw error;
  }
}

export async function updateUserInfo(name, about) {
  try {
    const response = await fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
}

export async function addNewCard(name, link) {
  try {
    const response = await fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error adding new card:', error);
    throw error;
  }
}

export async function deleteCardFromServer(cardId) {
  try {
    const response = await fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
}

export async function likeCardOnServer(cardId) {
  try {
    const response = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error liking card:', error);
    throw error;
  }
}

export async function unlikeCardOnServer(cardId) {
  try {
    const response = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error unliking card:', error);
    throw error;
  }
}

export async function updateAvatar(avatar) {
  try {
    const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
}

export async function editCard(cardId, newName, newLink) {
  try {
    const response = await fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name: newName, link: newLink })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error editing card:', error);
    throw error;
  }
}
