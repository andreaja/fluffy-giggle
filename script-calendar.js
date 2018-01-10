const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

var view = { };

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
