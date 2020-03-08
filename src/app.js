const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; //for heroku and local port

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //use diff path aside from /views (default)
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //set views to viewsPath
hbs.registerPartials(partialsPath); // set partials directory

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routing
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Carlo Jude"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Carlo Jude"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Carlo Jude",
    helpText: "This is some helpful text"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term."
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Carlo Jude",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  // match to anything using * -> 404 page
  res.render("404", {
    title: "404",
    name: "Carlo Jude",
    errorMessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
