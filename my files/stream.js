const fs = require('fs');


const readStream = fs.createReadStream('./text/text1.txt',
{encoding: 'utf8'});
const WriteStream = fs.createWriteStream('./newDIr/txt2.txt');
readStream.on('data', chunk => {
    console.log('--chunk--')
    console.log(chunk);
    WriteStream.write('\nNEW CHUNK: \n');
    WriteStream.write(chunk);
})
// readStream.pipe(writeStream)