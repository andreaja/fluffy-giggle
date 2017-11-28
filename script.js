const EWS = require('node-ews');

const config = require('./config');

const exchange = new EWS(config);

const ewsFunction = 'GetUserOofSettings';

const ewsArgs = {
  'Mailbox': {
    'Address': ""
  }
};

exchange.run(ewsFunction, ewsArgs)
  .then(result => {
    console.log(JSON.stringify(result));
})
.catch(err => {
    console.log(err.stack);
});
