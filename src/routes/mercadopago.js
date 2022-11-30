require("dotenv").config();
const { TEST_ACCESS_TOKEN } = process.env;
const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const sendMail = require("../controllers/mail/sendMail.js");

mercadopago.configure({
  access_token: TEST_ACCESS_TOKEN,
});

router.post("/", async (req, res) => {
  const { email, name, cart } = req.body;

  const totalPurchase = [];
  for (let i = 0; i < cart.length; i++) {
    totalPurchase.push({
      title: cart[i].name,
      unit_price: cart[i].price,
      quantity: cart[i].quantity,
    });
  }
  //console.log("totalPurchase:",totalPurchase)

  let preference = {
    payer: {
      name,
      email,
    },
    items: totalPurchase, // por cada producto un item
    back_urls: {
      "success": "https://tigercoffee.vercel.app/",
      "failure": "https://tigercoffee.vercel.app/",
      //"pending": console.log("pending")
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      //onSuccessHandler(response.body.init_point);
      res.send(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
