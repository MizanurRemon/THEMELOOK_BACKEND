const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port = process.env.PORT || 1337;

const con = require("./Database/database.js");

app.get("/login", function (req, res) {
  let sqlQuery =
    "SELECT `adminID` FROM `admin` where phone = ? and password = ?";

  con.query(
    sqlQuery,
    [req.query.phone, req.query.password],
    function (err, rows) {
      if (err) {
        res.json("something error");
      } else {
        var data = JSON.parse(JSON.stringify(rows[0]) || null);
        if (data == null) {
          data = "-1";
          const value = {
            adminID: data,
          };
          res.json(value);
        } else {
          res.json(data);
        }
      }
    }
  );
});

app.post("/price", function (req, res) {
  var p_price;
  var color = req.body.color;
  var size = req.body.size;

  if (color == "White") {
    if (size == "Large") {
      p_price = "600";
    } else if (size == "Small") {
      p_price = "500";
    }
  } else if (color == "Black") {
    if (size == "Large") {
      p_price = "550";
    } else if (size == "Small") {
      p_price = "400";
    }
  }

  var value = {
    price: p_price,
  };

  res.json(value);
});

app.post("/add_products", function (req, res) {
  var name = req.body.name;
  var color = req.body.color;
  var size = req.body.size;
  var price = req.body.price;
  var description = req.body.description;
  var image = req.body.image;

  let sqlQuery =
    "INSERT INTO `products`(`name`, `color`, `size`, `price`, `description`, `image`) VALUES (?, ?, ?, ?, ?, ?)";

  con.query(
    sqlQuery,
    [name, color, size, price, description, image],
    function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        var data = "inserted";
        const value = {
          message: data,
        };

        res.json(value);
      }
    }
  );
});

app.get("/products", function (req, res) {
  let sqlQuery = "SELECT * FROM `products`";

  con.query(sqlQuery, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      var data = JSON.parse(JSON.stringify(rows) || null);
      //console.log(data)
      res.json(data);
    }
  });
});

app.post("/color", function (req, res) {
  let sqlQuery = "SELECT `colorname` FROM `color_table`";

  con.query(sqlQuery, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

app.post("/size", function (req, res) {
  let sqlQuery = "SELECT `size_name` FROM `size_table`";

  con.query(sqlQuery, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

app.get("/", function (req, res) {
  res.json("Themelooks Task");
});

app.listen(port);
