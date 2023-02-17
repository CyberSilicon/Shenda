import Parse from "../services/parse";

export var client = new Parse.LiveQueryClient({
  applicationId: "otstUvnHvd6JbqA469Vi5BECK6QYum6LXyiMBxw7",
  serverURL: "wss://shenda.b4a.io/",
  javascriptKey: "50UpxxHxCo8dWbcZKqn8nHyhGApZLYxDQ03kUb3P",
});
client.open();
