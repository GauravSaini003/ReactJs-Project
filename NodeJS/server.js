console.log('hello node js');
const { log } = require('console');
// const { log } = require('console');

// to get the info from the module  about the system aka os 
const os = require('os');
const path = require('path')
// console.log(os.version());
// console.log(os.type());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));


// console.log(path.parse(__filename));





// this is the way we can get the other node module into our module
const math = require('./math');
console.log(math.add(1,2)+' '+ math.sub(7,5)+' '+ math.mul(4,5)+' '+math.div(2,4));
// if you want directly to use the function use distructuring

// const {add , sub,div,mul} = require('./math');