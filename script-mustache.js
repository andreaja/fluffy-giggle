const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
