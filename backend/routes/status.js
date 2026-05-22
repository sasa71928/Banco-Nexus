const express = require("express");
const router = express.Router();
const { addStatusClient } = require("../sse");

router.get("/", (req, res) => {
  addStatusClient(res);
});

module.exports = router;
