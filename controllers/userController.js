const { User, Thought } = require("../models");

module.exports = {
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userID })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userID })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: "User and Thought Have Been Deleted!" }))
        .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.params.friendID } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends: req.params.friendID } },
      { new: true }
    )
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No user found with this ID!" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
