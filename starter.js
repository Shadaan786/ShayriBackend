const server = require('./backend');
require('./backend2');



const PORT = process.env.PORT || 9000;



server.listen(PORT, ()=> console.log(`Server is running at ${PORT}`));