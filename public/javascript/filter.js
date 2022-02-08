

function filterButton() {
    console.log('checkbox clicked');
    const HTML = document.getElementById("htmlcheckbox").checked
    const CSS = document.getElementById("csscheckbox").checked
    const Javascript = document.getElementById("javascriptcheckbox").checked
    const MYSQL = document.getElementById("mysqlcheckbox").checked
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

    category = category.substring(1)

    window.location.replace("/category/" + category)
}

document.querySelector("#filterbutton").addEventListener("click", filterButton);