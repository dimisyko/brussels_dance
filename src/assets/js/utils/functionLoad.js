import home from "../pages/home.js";
import program from "../pages/program.js"
import places from "../pages/places.js"
export default function loadFunction(path) {
    switch (path) {
        case '/': new home(); break;
        case '/programme': new program(); break;
        case '/lieux': new places(); break;
    }
}


