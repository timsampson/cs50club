// parceljs recipe https://parceljs.org/recipes.html

import 'bootstrap'
import '../scss/main.scss'

// mdn https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

function sayHello() {
    document.getElementById("jsLoaded").innerText = "Updated";
}

if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', sayHello);
} else {  // `DOMContentLoaded` has already fired
    sayHello();
}