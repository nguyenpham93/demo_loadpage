const express = require('express');
const app = express();
const compression = require('compression')
app.use(compression({level: 9}))


const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));

//Cấu hình nunjucks
nunjucks.configure('views', {
  autoescape: true,
  noCache: false,
  express: app,
  watch: true,
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.get('/testtag',(req,res)=>{
    console.log("sever render");
    res.render("testtag.html");
});
// W/"1eb-bJVuCKIdsdXObXW1FzDOnrbuSRo"
// W/"1eb-bJVuCKIdsdXObXW1FzDOnrbuSRo"
// W/"1eb-bJVuCKIdsdXObXW1FzDOnrbuSRo"
require('./router')(app);

const server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error: ' + err.message)
});