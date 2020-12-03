const PORT = 20000;
const MULTICAST_ADDR = "233.255.255.255";

const dgram = require("dgram");
const process = require("process");
const http = require("http");

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

socket.bind(PORT);

socket.on("listening", function () {
  socket.addMembership(MULTICAST_ADDR);
  const address = socket.address();
  console.log(
    `UDP socket listening on ${address.address}:${address.port} pid: ${process.pid}`
  );
});

socket.on("message", function (message, rinfo) {
  console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);

  const options = {
    hostname: "localhost",
    port: 21000,
    method: "POST",
  };

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(message);
  req.end();
});
