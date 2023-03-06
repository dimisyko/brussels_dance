import home from "../pages/home.js";
import program from "../pages/program.js"
import artistes from "../pages/artistes.js"
import contact from "../pages/contact.js"
export default function loadFunction() {
    const path = {
        '/' : home,
        '/programme': program,
        '/artistes' : artistes,
        '/contact' : contact
    }
    new path[window.location.pathname]
}


