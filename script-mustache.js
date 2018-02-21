const Mustache = require('mustache');

const fs = require('fs');

function loadTemplate(templateName){
  return fs.readFileSync(templateName).toString();
}

var view = {

  "pov-day": "Wednesday October 18th",

  "events": [
    {"hour": 6, "start-row": 0 },
    {"hour": 7, "start-row": 4 },
    {"hour": 8, "start-row": 8, "end-row": "span 2", "kol": 2, "title": "demo", "location": "M1802", "participants": "3 accepted"},
    {"hour": 9, "start-row": 12, "end-row": "span 4", "kol": 2, "title": "developer only", "location": "M1702", "participants": "30 accepted, 2 declined, 5 pending"},
    {"hour": "9:30", "start-row": 14, "end-row": "span 4", "kol": 3, "title": "doodles only", "location": "M1802", "participants": "10 accepted, 2 declined, 5 pending"},
    {"hour": 10, "start-row": 16}
  ],

  "weekday": [
    {
      "day": "Thursday 19/10",
      "dow-event": [
        {"display-title": "8:30 – Standup"},
        {"display-title": "Ramen"},
        {"display-title": "Biggest meeting of the day"}
      ]
    },
    {
      "day": "Friday 20/10",
      "dow-event": [
        {"display-title": "Demo"},
        {"display-title": "Biggest meeting of the day"},
        {"display-title": "Afterwork"}
      ]
    },
  ],

  "months": [
    {
      "day": [
        {"date": 26},
        {"date": 27, "display-title": "Bergen"},
        {"date": 28, "eow?": true, "display-title": "Bergen"},
        {"date": 30, "display-title": "Bergen"},
        {"date": 30}
      ],
    },
    {
      "day": [
        {"date": 01},
        {"date": 02},
        {"date": 03},
        {"date": 04, "eow?": true, },
        {"date": 05},
        {"date": 06},
        {"date": 07},
        {"date": 08},
        {"date": 09, "display-title": "FFconf"},
        {"date": 10, "display-title": "FFconf"},
        {"date": 11, "eow?": true, },
        {"date": 12},
        {"date": 13, "display-title": "PVRIS @ Rockefeller"},
        {"date": 14},
        {"date": 15},
        {"date": 16}
      ]

    }
  ],

  "year": [
    {"display-date": "Nov 06", "display-title": "Liars @ Blå"},
    {"display-date": "Nov 22", "display-title": "H+K i Etiopia", "display-date-end": "Dec 06", "ymd?": true, },
    {"display-date": "Dec 21", "display-title": "last.fm expires"},
    {"display-date": "January"},

]

};

var output = Mustache.render(loadTemplate("template.html"), view);
console.log (output);
