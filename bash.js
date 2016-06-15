// Output a prompt
var commands = require("./commands");

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var tokens = data.toString().trim().split(" "); // remove the newline
  var cmd = tokens[0];
  var args = tokens.slice(1).join(" ");
// this line uses the input from the user as a key on the commands object to decide which function to run
 commands[cmd](args, done);
});

function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}
