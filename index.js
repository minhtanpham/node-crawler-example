var $ = require('jquery');
var Nightmare = require('nightmare');
var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('my.csv');

nightmare = Nightmare();

nightmare
  .goto('https://entrepreneur-tools.zeef.com/keyhanimo')
  .evaluate(() => {
    var result = [];
    result.push($('#blocks .block.link .title .text .sorter').text());
    return result;
  })
  .end()
  .then(() => {
    var csvStream = csv
      .createWriteStream({ headers: true })
      .transform(function (row) {
        return {
          'Header 1': row.a,
          'Header 2': row.b
        };
      }),
      writableStream = fs.createWriteStream("my.csv");

    writableStream.on("finish", function () {
      console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    csvStream.write({ a: "a0", b: "b0" });
    csvStream.write({ a: "a1", b: "b1" });
    csvStream.write({ a: "a2", b: "b2" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.write({ a: "a3", b: "b4" });
    csvStream.end();
  })
  .catch(error => {
    console.error('Search failed:', error)
  })
