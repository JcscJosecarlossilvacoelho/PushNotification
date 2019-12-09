const { Expo } = require("expo-server-sdk");
let expo = new Expo();
module.exports = {
  async index(req, res) {
    let expo = new Expo();
     var MessageText = req.query.MessageText;
     var TokenArray = req.query.array.split(',');
     let messages = [];
     let Response = [];
    for (let pushToken of TokenArray) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
      messages.push({
        to: pushToken,
        sound: "default",
        body: MessageText,
        data: { withSome: "data" }
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
   await (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          var obj = {token:chunk[0].to,Response:ticketChunk}
          tickets.push(...ticketChunk);
           Response.push(obj);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
        } catch (error) {
          console.error(error);
        }
      }
    })();
    res.send(Response)
  }
};
