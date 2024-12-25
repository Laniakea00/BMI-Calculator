const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const HOST = 'localhost';
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

const bmiRoutes = require('./bmi');
app.use('/', bmiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
