
var fs = require('fs');
var parse = require('csv-parse');
let intent_name = "music_convos" ;
let ret = '';
var inputFile ='intents_answer.csv';
console.log("Processing intents file");
let lst_intents = []

var parser = parse({delimiter: ','}, function (err, data) {
    // when all rows are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    data.forEach(function(line) {
      var row = { "intent" : line[0]
                  , "return" : line[1]
              };
              lst_intents.push(row);
              //console.log(JSON.stringify(row));
              //console.log(row)
        });
        //console.log("lst_intents  => ",lst_intents)
        //console.log(lst_intents[1]["intent"]);
        for (i=0 ; i<lst_intents.length;i++){
          if(intent_name === lst_intents[i]["intent"]){
            ret = lst_intents[i]["return"];
            console.log("return Value = > ",ret,typeof(ret));

        }
    }

  });
// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);
console.log("return Value ....................",ret,typeof(ret));
