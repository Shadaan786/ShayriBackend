const cron = require('node-cron')
const kalamOfTheWeek = require('../scheduled tasks/kalamOfTheWeek');
const featuredAlbumUploader = require('../scheduled tasks/featuredAlbum');


// To schedule updation of kalam of the week
console.log('Scheduler is running');
// cron.schedule('59 23 * * 7', kalamOfTheWeek);

cron.schedule('59 23 * * 7', kalamOfTheWeek);
cron.schedule('59 23 * * *', featuredAlbumUploader);



