const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/14b1d28f26c195596fd3c26fe699fbf7/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request(
    {
      url,
      json: true
    },
    (
      error,
      {
        body //response.body
      }
    ) => {
      if (error) {
        callback("Unable to connect to network!", undefined);
      } else if (body.error) {
        callback("No match found. Please try again.", undefined);
      } else {
        callback(
          undefined,
          body.daily.data[0].summary +
            " It is currently " +
            body.currently.temperature +
            ". Today is " +
            body.daily.data[0].temperatureHigh +
            " with a low of " +
            body.daily.data[0].temperatureLow
        );
      }
    }
  );
};

module.exports = forecast;
