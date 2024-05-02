const { User, Thought } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with this ID!" })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No users found with this ID!" })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thoughts found with this ID!" })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtID })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with this ID!" })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtID },
            { $pull: { thoughts: req.params.thoughtID } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "Thought deleted, but no users found!" })
        : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with this ID!" })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $pull: { reactions: { reactID: req.params.reactID } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with this ID!"})
          : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
  },
};
