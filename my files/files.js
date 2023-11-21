// const fs = require("fs");
// // readFiles==
// fs.readFile('./text/text1.txt',(err,data) => {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//     }
    
// })
// fs.writeFile('./text/text.txt','Hello world', () => {
//     console.log('file was writen');
// });

// // directory
// fs.mkdir('./newDIr',err => {
    // if (err){
        // console.log(err)
    // }
    // console.log('Folder was created')
// });

// fs.writeFile('./newDir/class.txt','welcome here', () => {
    // console.log('File was writen')
// });

directory
if (!fs.existsSync('./assets')){
    fs.mkdir('./assete',err => {
        if (err){
            console.log(err)
        }
        console.log("file Created");
    })
}else{
    fs.mkdir('./assets', err => {
        if (err){
            console.log(err)
        }
        console.log('file deleted')
    })
}

// delete
// if (fs.existsSync('./text/text2.ttxt')){
    // fs.unlink('./text/text2.txt', err => {
        // if (err){
            // console.log(err)
        // }
        // console.log('file deleted')
    // })
// }