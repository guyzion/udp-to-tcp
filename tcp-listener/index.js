const http = require("http");

const server = http.createServer().listen(21000);
server.on("request", (request, response) => {
  let body = [];
  request
    .on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk.toString());
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(`new message: ${body}`);
    });
  response.write("good");
});
