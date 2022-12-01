const express = require('express');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const categoriesRoute = require('./routes/categoriesRoute');
// ...

const app = express();

app.use(express.json());

// ...
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
