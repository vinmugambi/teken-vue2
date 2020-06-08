import parse from "parse";

parse.initialize("teken-mobility-visa");
parse.serverURL=" http://localhost:1337/parse";

const Application = parse.Object.extend("Application");
const application = new Application();

