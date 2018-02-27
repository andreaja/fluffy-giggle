const Mustache = require('mustache');

const fs = require('fs');

const exchangedata = require('./exchange-calendar');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthsoftheyear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendaritems = exchangedata.ResponseMessages.FindItemResponseMessage.RootFolder.Items.CalendarItem;

var view = { };

var viewingdate = new Date('2017-12-19T00:00:00+01:00');

view['pov-day'] = `
${week[viewingdate.getDay()]}
${monthsoftheyear[viewingdate.getMonth()]}
${viewingdate.getDate()}`;

var hours = [ ];

for (let columns = [], i = 6; i < 22; i++){
  let windowstart = new Date(viewingdate);
  windowstart.setHours(i);
  let windowend = new Date(viewingdate);
  windowend.setHours(i+1);
  let eventlist = calendaritems.filter(function(item){
    var d = new Date(item.Start);
    return d >= windowstart && d < windowend;
  });
  if (eventlist.length > 0) {
    for(let j = 0; j < eventlist.length ; j++){
      let start = new Date(eventlist[j].Start);
      let end = new Date(eventlist[j].End);

      let displayStart = start.getHours();
      if(start.getMinutes() != 0){
        let minutes = Math.round(start.getMinutes()/15)*15;
        if(minutes==60){
          displayStart += 1;
        }else{
          displayStart += ":" + minutes;
        }
      }
      let displayEnd = end.getHours();
      if(end.getMinutes() != 0){
        let minutes = Math.round(end.getMinutes()/15)*15;
        if(minutes == 60){
          displayEnd += 1;
        }else{
          displayEnd += ":" + minutes;
        }
      }

      let firstRow = Math.round((start.getHours()-6 + start.getMinutes()/60.0)*4);
      let lastRow = Math.round((end.getHours()-6 + end.getMinutes()/60.0)*4);
      let k = 2;

      while(columns[k] > firstRow) {
        k++;
      }

      columns[k] = lastRow;

      hours.push({'hour': displayStart,
                  'start-row': firstRow,
                  'end-row': lastRow,
                  'kol': k,
                  'class': 'day__event',
                  'title': eventlist[j].Subject,
                  'location': eventlist[j].Location});
    }
  } else {
    hours.push({'hour':i,
                'start-row': (i-6)*4,
                'class': 'dn'
               });
  }
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
