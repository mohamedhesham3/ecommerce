require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Product = require("../models/Prodcut");

const payment = async (req, res) => {
  const { prodcutID } = req.body;

  try {
    const product = await Product.findOne({ _id: prodcutID });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const amountInCents = product.Price * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.Title,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/succes",
      cancel_url: "http://localhost:5173/",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { payment };
