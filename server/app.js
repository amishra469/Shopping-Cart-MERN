const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});