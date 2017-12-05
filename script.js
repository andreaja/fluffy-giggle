const EWS = require('node-ews');

const config = require('./config');

const exchange = new EWS(config);

const ewsFunction = 'FindItem';

const ewsArgs = {
  'attributes': {
    'Traversal': 'Shallow'
  },
  'ItemShape': {
    'BaseShape': 'Default',
    'AdditionalProperties': {
      'FieldURI': {
        'attributes': {
          'FieldURI': 'calendar:MyResponseType'
        }
      }
    }
  },
  'CalendarView': {
    'attributes': {
      'MaxEntriesReturned': 20,
      'StartDate': '2017-12-05T00:00:00+01:00',
      'EndDate': '2018-12-05T00:00:00+01:00'
    }
  },
  'ParentFolderIds': {
    'DistinguishedFolderId': {
      'attributes': {
        'Id': 'calendar'
      }
    }
  }
};

exchange.run(ewsFunction, ewsArgs)
  .then(result => {
    console.log(JSON.stringify(result));
})
.catch(err => {
    console.log(err.stack);
});
