const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthsoftheyear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var view = { };

var viewingdate = new Date('2018-01-10T00:00:00+01:00');

view['pov-day'] = `
${week[viewingdate.getDay()]}
${monthsoftheyear[viewingdate.getMonth()]}
${viewingdate.getDate()}`;

var hours = [ ];

for (let i = 6; i < 22; i++){
  hours.push({'hour':i});
}

view.events = hours;

var weekdays = [ ];

for (let i = 0; i < 7; i++){
  let d = new Date(viewingdate);
  d.setDate(d.getDate() + 1 + i);
  weekdays.push({'day': `${week[d.getDay()]} ${d.getDate()}/${d.getMonth()+1} `});
}

view.weekday = weekdays;

var months = [ ];

months[0] = {'day': []};

for (let i = 0; i < 21; i++){
  let d = new Date(viewingdate);
  d.setDate(d.getDate() + 8 + i);
  months[0].day.push({'date': d.getDate()});
  //TODO finish adding info here, like week and month separators
}

view.months = months;

var year = [ ];

for (let i = 0; i < 13; i++){
  let d = new Date(viewingdate);
  d.setMonth(d.getMonth() + 1 + i);
  year.push({'display-date': monthsoftheyear[d.getMonth()]});
}

view.year = year;



var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
