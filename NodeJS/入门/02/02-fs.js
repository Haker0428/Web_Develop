const fs = require('fs');
fs.writeFile('./1.txt', 'hello world', err => {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
})

fs.readFile('./1.txt', (err, data)=> {
    if (err) {
        console.log(err);
    } else {
        // data是 buffer 16进制数据流对象
        console.log(data.toString());
    }
})