const path = require("path");
const fs=require("fs");
const eventEmitter=require("events");
const os = require("os");
const zlib = require("zlib");
const { pipeline } = require("stream");
//Question 1 ========================================
function q1() {
  const paths = {
    File: __filename,
    Directory: __dirname,
  };
  console.log(paths);
  return paths;
}
//Question 2 ========================================
function q2(filePath) {
  return path.basename(filePath);
}
//Question 3 ========================================
function q3(pathObj) {
  return path.format(pathObj);
}
//Question 4 ========================================
function q4(filePath){
    return path.extname(filePath);
}
//Question 5 ========================================
function q5(Path){
const parse =path.parse(Path);
return {
  Name: parse.name,
  Ext: parse.ext,
};
}
//Question 6 ========================================
function q6(filePath){
    return path.isAbsolute(filePath);
}
//Question 7 ========================================
function q7(...seg){
    return path.join(...seg);
}
//Question 8 ========================================
function q8(relativePath){
    return path.resolve(relativePath);
}
//Question 9 ========================================
function q9(p1,p2){
    return path.join(p1,p2);
}
//Question 10 ========================================
function q10(filePath){
    fs.unlink(filePath,(err)=>{
    if (err) {
      console.error('Error:', err.message);
      console.log(
        "==========================================================================================",
      );
      return;
    }
      const fileName = path.basename(filePath);
      console.log(`The ${fileName} is deleted.`);
    })
  
}
//Question 11 ========================================
function q11(folderPath){
try{
fs.mkdirSync(folderPath,{recursive:true});
console.log("success");
}
catch(err){
console.error("Error: ", err.message);
console.log(
  "==========================================================================================",
);
}

}
//Question 12 ========================================
function q12(){
    const myEmitter=new eventEmitter();
    myEmitter.on('start',()=>{
        console.log("Welcome event triggered!");
    })
    myEmitter.emit('start');
}
//Question 13 ========================================
function q13(userName) {
  const myEmitter = new eventEmitter();
  myEmitter.on("login", (user) => {
    console.log(`User logged in: ${user}`);
  });
  myEmitter.emit("login", userName);
}
//Question 14 ========================================
function q14(filepath) {
  try{
const content = fs.readFileSync(filepath);
console.log(`the file content => "${content}"`);
  }
  catch(err){
console.error("Error reading file:", err.message);
console.log(
  "==========================================================================================",
);
  }
}
//Question 15 ========================================
function q15(filepath,content) {
 fs.writeFile(filepath,content,'utf-8',(err)=>{
    if (err) {
      console.error("Error writing to file:", err.message);
      return;
    }
    console.log("File saved successfully.");
    console.log(
      "==========================================================================================",
    );
});
}
//Question 16 ========================================
function q16(filePath){
   return fs.existsSync(filePath);
}
//Question 17 ========================================
function q17() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}
//Question 18 ========================================
function q18(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  readStream.on("data", (chunk) => {
    console.log("--- Received Chunk ---");
    console.log(chunk);
  });
  readStream.on("error", (err) => {
    console.error("Error: ", err.message);
  });
}
//Question 19 ========================================
function q19(sourcePath, destPath) {
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);
  readStream.pipe(writeStream);
  writeStream.on("finish", () => {
    console.log("File copied using streams");
    console.log(
      "==========================================================================================",
    );
  });

  readStream.on("error", (err) => {
    console.error("Error: ", err.message);
    console.log(
      "==========================================================================================",
    );
  });
}
//Question 20 ========================================
function q20(sourcePath, destPath) {
  const readStream = fs.createReadStream(sourcePath);
  const gzip = zlib.createGzip();
  const writeStream = fs.createWriteStream(destPath);
  pipeline(readStream, gzip, writeStream, (err) => {
    if (err) {
      console.error("Pipeline failed:", err.message);
      return;
    }
    console.log("File successfully compressed!");
  });
}
//===================================================
const pathObject = q1(); 
console.log(
"=========================================================================================="
);
const filepath = pathObject.File;
console.log(q2(filepath));
console.log(
  "==========================================================================================",
);
const parse =path.parse(filepath);
const rebuiltPath = q3(parse);
console.log(rebuiltPath);
console.log(
  "==========================================================================================",
);
console.log(q4(filepath));
console.log(
  "==========================================================================================",
);
console.log(q5(filepath))
console.log(
  "==========================================================================================",
);
console.log(q6(pathObject.Directory));
console.log(
  "==========================================================================================",
);
console.log(q7(parse.dir,parse.base));
console.log(
  "==========================================================================================",
);
console.log(q8(parse.base));
console.log(
  "==========================================================================================",
);
console.log(q9(pathObject.Directory,pathObject.File));
console.log(
  "==========================================================================================",
);
q10('D:/FullStack-c46/back/ass/Node.js Core Modules&Simple CRUD/test.js');
console.log(
  "==========================================================================================",
);
// q11("./myNewFolder");
console.log(
  "==========================================================================================",
);
q12();
console.log(
  "==========================================================================================",
);
q13('Rodina');
console.log(
  "==========================================================================================",
);
q14('./note.txt');
console.log(
  "==========================================================================================",
);
q15('./async.txt','Async save!!!');
console.log(
  "==========================================================================================",
);
console.log(q16('./note.txt'));
console.log(
  "==========================================================================================",
);
console.log(q17());
console.log(
  "==========================================================================================",
);
q18('./big.txt');
console.log(
  "==========================================================================================",
);
q19("./note.txt", "./dest.txt");
console.log(
  "==========================================================================================",
);
q20("./dest.txt", "./dest.txt.gz");
