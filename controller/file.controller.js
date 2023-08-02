const uploadFile = require('../middleware/upload');
const storage = require('../middleware/upload');
const fs = require("fs");

const upload = async (req,res)=>{
try{
    await uploadFile(req, res);

    if(req.file === undefined){
        return res.status(400).send({message: "Please upload file"});
    }

   /*  const files = await fs.readdirSync('./uploads');
    const data =  files.map(file => {
        const fullPath = `./uploads/${file}`;
        const fileData = fs.readFileSync(fullPath);
        const parsedData = JSON.parse(fileData);
        return parsedData;
    });
   
    const objects = data[0];

    const groupedObjects = objects.reduce((acc, obj) => {
     
        const sourceIp = obj.fields.sourceIp;
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
    
      // console.log(groupedObjects)
      const sortedObjects = Object.values(groupedObjects).sort((a, b) => b.count - a.count);
      let objectList = []
      for (const object of sortedObjects) {
          console.log(`${object.sourceIp}: ${object.count}`);
          objectList.push(`${object.sourceIp}: ${object.count}`)
        }
         */
       
       res.redirect('/responses');
      // res.sendFile('../public/response.html');
    //res.status(200).send({message: "Uploaded the file successfully: " + req.file.originalname});
    } catch(err){
        console.log(err)
       /*  if(err.code = "LIMIT_FILE_SIZE"){
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!"
            })
        } */
        res.status(500).send({message:` Could not upload file: ${req.file.originalname}. ${err}`})
    }


};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/upload"

    fs.readdir(directoryPath, (err, file)=>{
        if(err){
            res.status(500).send({
                message: "Unable to scan files"
            })
        }

        let fileInfos = [];

        files.forEach(file =>{
            fileInfos.push({
                name: file,
                url: baseUrl + file
            });
        });

        res.status(200).send(fileInfos)

    })
}

const download = (req, res)=>{
    const fileName = req.params.name;
    
    res.download(directoryPath + fileName, fileName, (err)=>{
        if(err){
            res.status(500).send({
                message: "Could not download the file. " + err
            })
        }
    })
}

const response = async (req, res) => {
    // console.log("response")
    const files = fs.readdirSync('./uploads');
    const data =  files.map(file => {
        const fullPath = `./uploads/${file}`;
        const fileData = fs.readFileSync(fullPath);
        const parsedData = JSON.parse(fileData);
        return parsedData;
    });
   
    const objects = data[0];

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
       // console.log("obj.fields", obj.fields)
        acc[sourceIp].objects.push(obj.fields);
    
        return acc;
      }, {});
    
      const sortedObjects = Object.values(groupedObjects).sort((a, b) => b.count - a.count);
     // console.log(sortedObjects)
      let objectList = []
      for (const object of sortedObjects) {
          //console.log(`${object.sourceIp}: ${object.count} :  ${object}`);
          //console.log(object);
          objectList.push({
            sourceIp:object.sourceIp, 
            count:object.count, 
            objects:object.objects})
        }
        
        
    // res.status(200).send({message: "Uploaded the file successfully: " + req.file.originalname, data: objectList});
 
    console.log(objectList)
    res.json({
        message: 'File uploaded successfully!',
        objectList: objectList
      });
}

module.exports = {
    upload,
    getListFiles,
    download,
    response
}