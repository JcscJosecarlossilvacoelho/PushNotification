var express = require('express');
var Push =  require('./src/Controller/PushNotification');
const cors  = require('cors');
const app = express();
app.use(cors())
app.get("/Push",Push.index)
app.listen(process.env.PORT || 3001)