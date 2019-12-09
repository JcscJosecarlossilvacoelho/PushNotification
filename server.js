var express = require('express');
var Push =  require('./src/Controller/PushNotification');
const app = express();
app.get("/Push",Push.index)
app.listen(3001)