//at services/parse.js
//import Parse from "parse";
import Parse from "parse/dist/parse.min.js";

//checking if env is browser
if (typeof window !== "undefined") {
  Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
  Parse.serverURL = "https://shenda.b4a.io/";
}

export default Parse;
