// Ref Nodejs8: The right way
// command ~/Nodejs/Nodejs/server/fileWatcher$ node index.js file.txt
const fs = require('fs');
const path = require('path'); // calling path module

// assigning reference of spawn function under child_process module to spawn system calls(ls in our case)
const spawn = require('child_process').spawn;
const filename = process.argv[2]; // argv-> Argument vector
// why argv[2] as in command $ node(0) index.js(1) file.txt(2)

if (!filename) throw Error('ERROR: Filename must be specified.'); // throw -> escape the event loop and halt the node process
fs.watch(path.join(__dirname, filename), (e, name) => {
    const lsObject = spawn('ls', [filename]);
    // here lsObject is the child process created and returnd as object with properties like stdin, stdout
    // top properties- stdin, stdout, stderr - basically are Streams
    lsObject.stdout.pipe(process.stdout);

    // console.log('lsObject', lsObject.stdout); // gives a socket object and not the actual stream using EventEmitter class in Node.js

    // Skip stream piping to process.stdout and capture the data
    let capturedStream = '';
    // Adding EventListener on(eventType, callback), which is listening events from lsObject.stdout
    // eventTypes - [data, close, end, error, readable]
    lsObject.stdout.on('data', chunk => capturedStream += chunk); // return value of on() = emitter object // chunk = buffer being passed to the callback
    lsObject.on('close', () => { // when child process exits(that is lsObject(the child process) emits a 'close' event)
        const formattedCapturedStream = capturedStream.split(/\s+/);
        console.log('captured data', capturedStream);
        console.log('captured data formatted', formattedCapturedStream);
    });
});

// WRITING A FILE(overwrites topics.js) if file doesn't exists -> creates topics.js
// sync means blocks the Node process until I/O
// The only time you should consider synchronous file access is during the initialization phase of your program.
fs.writeFileSync(path.join(__dirname, 'topics.txt'), `The file name entered in node command on date ${new Date} is ${filename}`, (err, data) => {
    if (err) throw (err);
});

// READING A FILE
fs.readFileSync(path.join(__dirname, 'topics.txt'), (err, data) => {
    if (err) throw (err);
    console.log('readFile data buffer::', data); // Buffer
    console.log('readFile data:: ', data.toString());
});

// CREATE READ STREAM
const stream = fs.createReadStream(path.join(__dirname, 'topics.txt'));
stream
.on('open', () => { console.log('Event started') })
.on('data', (data) => { console.log('Event data::', data.toString()) })
.on('error', err => { process.stdout.write('ERRor', err); })
.on('close', () => { console.log('Event Closed') })