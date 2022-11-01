const express = require("express");
const Transaction = require("../models/Transaction"); // import User model
// This helps use to create and find a user
const router = express.Router();
const moment = require("moment");

router.post("/add-transaction", async function (req, res) {
  try {
    console.log("adding transaction in server");
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    console.log("transaction added successfully");
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { type } = req.body;
  try {
    const transactions = await Transaction.find({
      date: {
        $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
      },
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });

    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
