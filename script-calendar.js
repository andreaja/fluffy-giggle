const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

var view = { };

var hours = [ ];

for (var i = 6; i < 22; i++){
    hours.push({'hour':i});
}

view.events = hours;


var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
