var dns = require('native-dns');
var server = dns.createServer();
var serverTcp = dns.createTCPServer();

var handler = function (request, response) {
  var q = request.question;
  if(q.length > 0 && q[0].name == '_sip._udp.example.org' && q[0].type === 33) {
    response.answer.push(dns.SRV({
      name: request.question[0].name,
      target: 'hostA.example.org',
      priority: 1,
      weight: 1,
      port: 5062,
      ttl: 600,
    }));
    response.answer.push(dns.SRV({
      name: request.question[0].name,
      target: 'hostB.example.org',
      priority: 1,
      port: 5061,
      weight: 1,
      ttl: 600,
    }));
    response.authority.push(dns.NS({
      name: 'dummy',
      ttl: 600,
      data: 'ignoreme'
    }));
    response.additional.push(dns.A({
      name: 'hostA.example.org',
      address: '1.1.1.1',
      ttl: 600,
    }));
    response.additional.push(dns.A({
      name: 'hostA.example.org',
      address: '2.2.2.2',
      ttl: 600,
    }));
  }
  response.send();
}

server.on('request', handler);
serverTcp.on('request', handler);

server.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

serverTcp.on('error', function (err, buff, req, res) {
  console.log(err.stack);
});

server.serve(53);
serverTcp.serve(53);
