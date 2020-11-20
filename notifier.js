var https = require('follow-redirects').https;
const notifier = require('node-notifier');

const kod = 12345;

var options = {
  'method': 'POST',
  'hostname': 'provsvar1177.regionkronoberg.se',
  'path': '/corona/GetResultByCode',
  'headers': {
  },
  'maxRedirects': 20
};

function check() {
    var req = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          notifier.notify(
              {
                  title: 'Provsvar covid-19',
                  message: body.toString(),
                  sound: false
              }
          );
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      });
      
      var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"userCode\"\r\n\r\n"+kod+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";
      
      req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
      
      req.write(postData);
      
      req.end();
}

// 10 minute interval
setInterval(check, 600000);