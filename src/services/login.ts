export async function callParseLogin(username: string, password: string) {
    const res = await fetch(`https://nuxi.b4a.io/parse/login`, {
      body: `{"username": "${username}", "password": "${password}"}`,
      headers: {
        "X-Parse-Application-Id": "PQ4eFYpo4l2h5PPUEC4BAdRMuEgJwWBDv0E6e9pG",
        "X-Parse-Rest-Api-Key": "rx2gY8RW9ywb9PPjCTXHQQhySktaj5rsoQX6GtyA",
        "X-Parse-Revocable-Session": "1",
        "Content-Type": "application/json",
      },
      method: "POST"
    });
    return await res.json();
  }