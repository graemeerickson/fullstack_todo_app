const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express()
const indexRoute = require('./routes/index');

app.use(express.static('public'));

/* set the view engine */
app.set('view engine', 'ejs');

/* error logger, static routes */
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRoute);

/* Error Handling */
app.get('*', function (req, res) {
    res.status(404).send('This is not the page you are looking for')
});

/* Listen on PORT */
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

// Local info below
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//     console.log(`Listening on port ${PORT}`)
// });
