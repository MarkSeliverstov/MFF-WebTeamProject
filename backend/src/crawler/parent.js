// Require fork method from child_process 
// to spawn child process
const fork = require('child_process')
  
// Child process file
const child_file = 'Child.js';
  
// Spawn child process
const child = fork.fork(child_file);
  
// Start listening to the child process
child.on('message', message => {
  
    // Message from the child process
    console.log('Message from child:', message);
});