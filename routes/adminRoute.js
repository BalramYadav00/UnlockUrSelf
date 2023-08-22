const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Post = require("../models/post");
const authMiddleware = require("../middlewares/authMiddleware");

// blog routes
router.post("/blog", authMiddleware, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  });
  post
    .save()
    .then((post) => {
      if (post) {
        res.status(201).send({
          message: "Post added successfully",
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Something went wrong" });
    });
});

// READ OPERATION
router.get("/blog/posts", (req, res, next) => {
  Post.find()
    .then((post) => {
      if (post) {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: post,
        });
      }
    })
    .catch((e) => {
      res.status(500).send({ message: "Soemthing went wrong" });
    });
});

//UPDATE OPERATION
router.put("/blog/update", authMiddleware, (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
  });
  Post.findByIdAndUpdate(req.body.id, post)
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(500).json({ message: "Error Upating Post" });
      }
    })
    .catch((err) => res.status(500).send({ message: "Something went wrong" }));
});

//DELETE OPERATION
router.delete("/blog/:id", authMiddleware, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        return res.status(401).json({ message: "Not authorized!!" });
      }
    })
    .catch((err) => res.status(500).send({ message: "Somehting went wrong" }));
});

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-doctor-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {
        status,
      });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Doctor status updated successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
