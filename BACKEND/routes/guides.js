const router = require("express").Router();
let Guide = require("../models/Guide");

router.route("/").get(async (req, res) => {
  let guides;
  try {
    guides = await Guide.find();
  } catch (error) {
    console.log(error);
  }
  if (!guides) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(guides);
});

router.route("/add").post(async (req, res, next) => {
  const { image, name, age, gender, email, phone, languages, availability } =
    req.body;
  let guide;
  try {
    guide = new Guide({
      image,
      name,
      age,
      gender,
      email,
      phone,
      languages,
      availability,
    });
    await guide.save();
  } catch (error) {
    console.log(error);
  }
  if (!guide) {
    return res.status(500).json({ message: "unable to add" });
  }
  return res.status(201).json(guide);
 
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { image, name, age, gender, email, phone, languages, availability } =
    req.body;
  let guide;
  try {
    guide = await Guide.findByIdAndUpdate(userId, {
      image,
      name,
      age,
      gender,
      email,
      phone,
      languages,
      availability,
    });
    guide = await guide.save();
  } catch (error) {
    console.log(error);
  }
  if (!guide) {
    return res.status(404).json({ message: "cannot update" });
  }
  return res.status(200).json(guide);

});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Guide.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({
        status: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  let guide;
  try {
    guide = await Guide.findById(userId);
  } catch (error) {
    console.log(error);
  }
  if (!guide) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(guide);
});

module.exports = router;
