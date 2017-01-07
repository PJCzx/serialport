var SerialPort = require("serialport");
//require('tty').setRawMode(true);    

var selector = process.argv[2] || "wchusbserial";
var portBaudRate = process.argv[3] || 9600;

var selectedPort;
var matchingPort;

var pinger;

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    //console.log(port.pnpId);
    //console.log(port.manufacturer);

    if(port.comName.includes(selector)) matchingPort = port;;
  });
  if(matchingPort){
    console.log("Starting listening this");
    for (key in matchingPort) {
      console.log("\t", key + ": ", matchingPort[key]);
    };
    startPort(matchingPort);
  }
});


var startPort = function(port){
  var port = new SerialPort(port.comName, {
    baudRate: portBaudRate,
    parser: SerialPort.parsers.readline('\n')
  });

  port.on('data', function (data) {
    /*if(pinger == undefined) {
      pinger = setInterval(function(){
        send(port, "0");
      }, 5000);
    }*/
  console.log(data);
});
}

var send = function (port, message) {
  port.write(message+'\n');
};

var stdin = process.openStdin(); 


stdin.on('keypress', function (chunk, key) {
  process.stdout.write('Get Chunk: ' + chunk + '\n');
  if (key && key.ctrl && key.name == 'c') process.exit();
});