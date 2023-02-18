export async function callParseSession(token: string) {
  const res = await fetch(`https://shenda.b4a.io/parse/users/me`, {
    headers: {
      "X-Parse-Session-Token": token,
      "X-Parse-Application-Id": "otstUvnHvd6JbqA469Vi5BECK6QYum6LXyiMBxw7",
      "X-Parse-Rest-Api-Key": "FIdXQWqaTIrvUcWVuHOGCyNJGOGekOgMEVIXJgXl"
    },
    method: "GET"
  });
  return await res.json();
}

export async function callParseLogin(username: string, password: string) {
  const res = await fetch(`https://shenda.b4a.io/parse/login`, {
    body: `{"username": "${username}", "password": "${password}"}`,
    headers: {
      "X-Parse-Application-Id": "otstUvnHvd6JbqA469Vi5BECK6QYum6LXyiMBxw7",
      "X-Parse-Rest-Api-Key": "FIdXQWqaTIrvUcWVuHOGCyNJGOGekOgMEVIXJgXl",
      "X-Parse-Revocable-Session": "1",
      "Content-Type": "application/json",
    },
    method: "POST"
  });
  return await res.json();
}



export async function getSessionOfCurrentUser(token: string) {
  return await callParseSession(token);
}

export async function loginUserApi(username: string, password: string) {
  return await callParseLogin(username, password);
}