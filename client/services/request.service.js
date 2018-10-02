const baseUrl = "http://localhost:8080/board";

async function makeRequest(url, method, body) {
  const request = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  return (await fetch(baseUrl + url, request)).json();
}
export default {
  getBoard: async () => {
    return (await fetch(baseUrl)).json();
  },
  postList: async newList => {
    return makeRequest("/lists", "POST", newList);
  },
  putList: async (idList, newData) => {
    return makeRequest(`/lists/${idList}`, "PUT", newData);
  },
  deleteList: async idList => {
    return makeRequest(`/lists/${idList}`, "DELETE");
  },
  postCard: async (idList, newData) => {
    return makeRequest(`/lists/${idList}/cards`, "POST", newData);
  },
  putCard: async (idList, idCard, newData) => {
    return makeRequest(`/lists/${idList}/cards/${idCard}`, "PUT", newData);
  },
  deleteCard: async (idList, idCard) => {
    return makeRequest(`/lists/${idList}/cards/${idCard}`, "DELETE");
  }
};
