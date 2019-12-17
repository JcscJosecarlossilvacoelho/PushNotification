var express = require('express');
var Push =  require('./src/Controller/PushNotification');
const app = express();
app.get("/Push",Push.index)
app.listen(process.env.PORT || 3001)