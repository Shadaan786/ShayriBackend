const cron = require('node-cron')
const kalamOfTheWeek = require('../scheduled tasks/kalamOfTheWeek');


// To schedule updation of kalam of the week
console.log('Scheduler is running');
// cron.schedule('59 23 * * 7', kalamOfTheWeek);
cron.schedule('59 23 * * 7', kalamOfTheWeek);



