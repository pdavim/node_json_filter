// use using node myscript.js
// add file with name data.json in same folder

const objects = require('./data.json');

const groupedObjects = objects.reduce((acc, obj) => {
    const sourceIp = obj.fields.req_sourceIp;
    if (!acc[sourceIp]) {
        acc[sourceIp] = {
            sourceIp: sourceIp,
            count: 0,
            objects: []
        };
    }

    acc[sourceIp].count++;
    acc[sourceIp].objects.push(obj);

    return acc;
}, {});

const sortedObjects = Object.values(groupedObjects).sort((a, b) => b.count - a.count);
console.log(sortedObjects)
for (const object of sortedObjects) {
    console.log(`${object.sourceIp}: ${object.count}`);
}