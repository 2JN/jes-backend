const express = require("express");

const Institution = require("../models/institution");

const router = express.Router();

router.get("/institutions", async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.send(institutions);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/institutions", async (req, res) => {
  const institution = new Institution({
    ...req.body,
  });

  try {
    const savedInstitution = await institution.save();
    res.status(201).send(savedInstitution);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/institutions/:_id", async (req, res) => {
  const {
    params: { _id },
    body,
  } = req;

  try {
    const institution = await Institution.findById(_id);

    if (!institution) return res.status(404).send();

    Object.keys(body).forEach((key) => (institution[key] = body[key]));
    await institution.save();

    res.send(institution);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/institutions/:_id", async (req, res) => {
  try {
    const institution = await Institution.findOneAndDelete({
      _id: req.params._id,
    });

    if (!institution) return res.status(404).send();

    return res.send({});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
