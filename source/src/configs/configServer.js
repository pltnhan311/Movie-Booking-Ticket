const express = require("express");
const session = require("express-session");
const flash = require('express-flash')
const expressValidator = require('express-validator');
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const multer = require("multer");
const hbs = require('hbs');

const configServer = (app, localDir) => {
  // Config cho file env
  require("dotenv").config();

  // Sử dụng body-parser middleware
  app.use(flash());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Sử dụng express.json() để xử lý dữ liệu JSON trong request body
  // Sử dụng express.urlencoded() để xử lý dữ liệu url-encoded data trong request body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Config cho session
  app.use(
    session({
      secret: "secret-key",
      resave: false, // not saved without change
      saveUninitialized: true, // save when initialized
      cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
    })
  );



  app.engine(
    "handlebars",
    exphbs.create({
      defaultLayout: "main",
      extname: ".handlebars",
      layoutDirs: path.join(localDir, `views/layout`),
			helpers: {
				toJSON: object => encodeURIComponent(JSON.stringify(object)),
				enCode: object => encodeURIComponent(object),
        ifeq: function(index, val, options) {
          if(index == val) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        },
        ifneq: function(index, val, options) {
          if(index != val) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        },
        isModZero: function(index, mod, options) {
          if(index % mod === 0) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        },
        isModThree: function(index, mod, options) {
          if(index % mod === 3) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        },
        isModFive: function(index, mod, options) {
          if(index % mod === 5) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        },
        break: function(array){
          return array.slice(0,5)
        }
			},
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
      },

    }).engine
  );


  // set view engine
  app.set("view engine", "handlebars");



  // set path view
  app.set("views", path.join(localDir, "/views"));

  // allow access to public folder
  app.use(express.static(path.join(localDir, "/public")));


};

// export default configViewEngine();
module.exports = configServer;
