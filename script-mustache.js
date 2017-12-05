const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

var view = {
  "events": [
    {"hour":6},
    {"hour":7},
    {"hour":8, "title":"demo", "location": "M1802", "participants": "3 accepted"},
    {"hour":9, "title":"developer only", "location": "M1702", "participants": "30 accepted, 2 declined, 5 pending"},
    {"hour":10}]

};

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
