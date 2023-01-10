import home from "../pages/home.js";
import program from "../pages/program.js"
export default function loadFunction(path) {
    switch (path) {
        case '/': new home(); break;
        case '/programme': new program(); break;
    }
}


