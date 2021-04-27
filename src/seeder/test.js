var fs=require('fs');
var data=fs.readFileSync('./seed.json', 'utf8');
var seed=JSON.parse(data);
console.log(seed);