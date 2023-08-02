const express = require('express');
const cors = require('cors');
const app = express();
const controller = require('./controller/file.controller')


global.__basedir = __dirname

let corsOption = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOption))
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/responses', (req, res) => {
  res.sendFile(__dirname + '/public/responses.html');
});

app.get("/response", controller.response);

app.post("/upload", controller.upload);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// const initRoutes = require("./routes");
// initRoutes(app)

/* const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const fileName = file.originalname + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
    cb(null, fileName);
  }
});
const upload = multer({ storage })
 */


/* app.post('/upload', upload.single('file'), function (req, res, next) {

  const file = req.file;
  //const fileName = file.filename;
  console.log(file)
  fs.writeFileSync(`./uploads/myFile`, file.buffer);
  res.json({
    message: 'File uploaded successfully!',
   // fileName: fileName
  });

    const files = fs.readdirSync('./uploads');
  const data = files.map(file => {
    const fullPath = `./uploads/${file}`;
    const fileData = fs.readFileSync(fullPath);
    const parsedData = JSON.parse(fileData);
    return parsedData;
  });
  console.log("data",data)
    /* if (!req.files || !req.files.file) {
      res.status(400).send('No file was uploaded');
      return;
    }
    
    const file = req.files.file;
    const data = fs.readFileSync(file.path);
    const objects = JSON.parse(data);
  
    const groupedObjects = objects.reduce((acc, obj) => {
      const sourceIp = obj.fields.req_sourceIp;
      if (!acc[sourceIp]) {
        acc[sourceIp] = {
            sourceIp:sourceIp,
          count: 0,
          objects: []
        };
      }
  
      acc[sourceIp].count++;
      acc[sourceIp].objects.push(obj);
  
      return acc;
    }, {});
  
    const sortedObjects = Object.values(groupedObjects).sort((a, b) => b.count - a.count);
    let objectList = []
    for (const object of sortedObjects) {
        console.log(`${object.sourceIp}: ${object.count}`);
        objectList.push(`${object.sourceIp}: ${object.count}`)
      }
    res.json({sortedObjects, objectList}); 
    res.json("uploaded")
  });
 */
  
/* 
const objects = require('./data.json');

const groupedObjects = objects.reduce((acc, obj) => {
  const sourceIp = obj.fields.req_sourceIp;
  if (!acc[sourceIp]) {
    acc[sourceIp] = {
        sourceIp:sourceIp,
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
} */