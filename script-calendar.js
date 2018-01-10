const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var view = { };

var hours = [ ];

for (var i = 6; i < 22; i++){
    hours.push({'hour':i});
}

view.events = hours;

var viewingdate = new Date('2018-01-10T00:00:00+01:00');

var weekdays = [ ];

for (var i = 0; i < 7; i++){
    var d = new Date(viewingdate);
    d.setDate(d.getDate() + 1 + i);
    weekdays.push({'day': `${week[d.getDay()]} ${d.getDate()}/${d.getMonth()+1} `});
}

view.weekday = weekdays;

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
