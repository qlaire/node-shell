var fs = require('fs');
var request = require('request');

function date(file, done) {
  done(new Date().toString());
}

function pwd(file, done) {
  done(process.cwd().toString());
}

function ls(file, done) {
  fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    done(file.toString() + "\n");
  });
  });
}

function echo(file, done) {
  if(file.toLowerCase() === "$path") {
    done(process.execPath);
  } else {
  done(file);
  }
}

function cat(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    done(contents);
  });
}

function head(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    // var firstFive = String.prototype.split.call(contents, "\n").slice(0, 5).join("\n");
    var firstFive = contents.toString().split("\n").slice(0, 5).join("\n");

    done(firstFive);
  });
}

function tail(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    var lastFive = contents.toString().split("\n").slice(-6).join("\n");

    done(lastFive);
  });
}

function sort(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    var lines = contents.toString().split("\n");
    lines = lines.sort(function(a, b) {
      var nameA = a.toUpperCase(); // ignore upper and lowercase
      var nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }).join("\n");
    done(lines);
  });
}

function wc(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    var lines = contents.toString().split("\n");
    var count = 0;
    lines.forEach(function() {
      count++;
    });

    done(count.toString());
  });
}

function uniq(file, done) {
  fs.readFile(file, function(err, contents) {
    if (err) {
      throw err;
    }
    var lines = contents.toString().split("\n");
    var result = [];
    for (var i = 1; i < lines.length; i++) {
      if (lines[i] !== lines[i -1]) {
        result.push(lines[i - 1]);
      }
    }

    done(result.join("\n"));
  });
}

function curl(file, done) {
  request(file, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    done(body.toString()); // Show the HTML for the webpage.
  }
});
}



exports.date = date;
exports.pwd = pwd;
exports.ls = ls;
exports.echo = echo;
exports.cat = cat;
exports.head = head;
exports.tail = tail;
exports.sort = sort;
exports.wc = wc;
exports.uniq = uniq;
exports.curl = curl;
