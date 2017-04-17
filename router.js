const shortid = require('shortid')
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html')
  });

  app.get('/demoajax', function (req, res) {
    res.render('demoajax.html')
  });

  app.get('/polling', function (req, res) {
    res.render('polling.html')
  });

  app.get('/getweather', function (req, res) {
    res.json({temperature: 10 + Math.random() * 35, moisture: 40 + Math.random() * 60})
  });

  app.get('/bigfile', function (req, res) {
    res.set({
      'ETag': shortid.generate()
    })
    res.render('bigfile.html')
  });

  app.get('/bigfileajax', function (req, res) {
    res.set({
      'ETag': shortid.generate()
    })
    res.render('bigfileajax.html')
  });
}
