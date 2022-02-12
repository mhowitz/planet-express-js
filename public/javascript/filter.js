

function filterButton() {
    console.log('checkbox clicked');
    const HTML = document.getElementById("htmlcheckbox").checked
    const CSS = document.getElementById("csscheckbox").checked
    const Javascript = document.getElementById("javascriptcheckbox").checked
    const MYSQL = document.getElementById("mysqlcheckbox").checked
    const Node = document.getElementById("nodecheckbox").checked
    const Express = document.getElementById("expresscheckbox").checked
    var category = ""
    if (HTML) {
        category += "&HTML"
    }
   if (CSS) {
        category += "&CSS"
    }
   if (Javascript) {
        category += "&Javascript"
    }
   if (MYSQL) {
        category += "&MYSQL"
    }
    if (Express) {
        category += "&Express"
    }
    if (Node) {
        category += "&Node"
    }

    category = category.substring(1)

    window.location.replace("/category/" + category)
}

document.querySelector("#filterbutton").addEventListener("click", filterButton);