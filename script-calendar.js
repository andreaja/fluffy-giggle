const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var view = { };

var viewingdate = new Date('2018-01-10T00:00:00+01:00');

view['pov-day'] = `
${week[viewingdate.getDay()]}
${year[viewingdate.getMonth()]}
${viewingdate.getDate()}`;

var hours = [ ];

for (var i = 6; i < 22; i++){
  hours.push({'hour':i});
}

view.events = hours;

var weekdays = [ ];

for (var i = 0; i < 7; i++){
  var d = new Date(viewingdate);
  d.setDate(d.getDate() + 1 + i);
  weekdays.push({'day': `${week[d.getDay()]} ${d.getDate()}/${d.getMonth()+1} `});
}

view.weekday = weekdays;

var months = [ ];

months[0] = {'day': []};

for (var i = 0; i < 21; i++){
  var d = new Date(viewingdate);
  d.setDate(d.getDate() + 8 + i);
  months[0].day.push({'date': d.getDate()});
  //TODO finish adding info here, like week and month separators
}

view.months = months;
// TODO add rest of year view

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
