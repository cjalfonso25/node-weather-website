const request = require("request");

const geocode = (address, callback) => {
  const url =
    " https://cors-anywhere.herokuapp.com/https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2FybG9qdWRlIiwiYSI6ImNpejF3bWVqczAwMmozM3FtNTk1b2lscDYifQ.FxPLDlassca4nzdN-CuDJg&limit=1";

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
        callback("Unable to connect to location services!");
      } else if (body.features.length < 1) {
        callback("No match found!");
      } else {
        callback(undefined, {
          latitude: body.features[0].geometry.coordinates[1],
          longitude: body.features[0].geometry.coordinates[0],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
