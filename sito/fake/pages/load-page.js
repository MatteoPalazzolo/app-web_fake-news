let main_element;

window.addEventListener("load", () => {
    main_element = document.querySelector("main");
    LoadPage("pages/page-1.html");
});

/************* REQUEST *************/
let request = new XMLHttpRequest();
request.addEventListener("load", e => { main_element.innerHTML = GetElement("main", e.target.response); });

/************* FUNCTIONS *************/
function LoadPage(pageName="") {
    request.open("GET", pageName, true),
    request.send();
}

function GetElement(element="main", content="") { 
   let x = content.indexOf("<" + element);
   x = content.indexOf(">", x);    
   let y = content.lastIndexOf("</" + element +">"); 
   return content.slice(x + 1, y);
}