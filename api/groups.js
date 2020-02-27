const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const Member = require('../models/Member');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'you must include a title')
        .not()
        .isEmpty(),
      check('description', 'you must write a group description')
        .not()
        .isEmpty(),
      check('picture', 'you must include a group picture')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById(req.member.id).select('-password');

      const newGroup = new Group({
        title: req.body.title,
        description: req.body.description,
        member: req.member.id,
        username: member.username
      });

      const group = await newGroup.save();
      res.json(group);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find().sort({ date: -1 });
    res.json(groups);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

router.post(
  '/post/:id',
  [
    auth,
    [
      check('title', 'you must include a title')
        .not()
        .isEmpty(),
      check('text', 'you must include text')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById(req.member.id).select('-password');
      const group = await Group.findById(req.params.id);

      const newPost = {
        title: req.body.title,
        text: req.body.text,
        member: req.member.id,
        username: member.username
      };

      group.posts.unshift(newPost);

      await group.save();

      res.json(group.posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

router.post(
  '/comment/:group_id/:post_id',
  [
    auth,
    [
      check('text', 'you must include text')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById(req.member.id).select('-password');
      const group = await Group.findById(req.params.group_id);

      const post = group.posts.find(post => post.id === req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'Post does not exist' });
      }

      const newComment = {
        text: req.body.text,
        member: req.member.id,
        username: member.username
      };

      post.comments.unshift(newComment);

      await group.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

router.put('/upvote/:id/:post_id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find(post => post.id === req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }

    const checkUpvote = post.upvotes.find(
      upvote => upvote.member.toString() === req.member.id
    );

    if (checkUpvote) {
      return res.status(400).json({ msg: 'post already upvoted' });
    }

    post.upvotes.unshift({ member: req.member.id });

    await group.save();

    res.json(post.upvotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

router.put('/unupvote/:id/:post_id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find(post => post.id === req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }

    const unUpvote = post.upvotes.find(
      upvote => upvote.member.toString() === req.member.id
    );
    if (!unUpvote) {
      return res.status(400).json({ msg: 'Post has not yet been upvoted' });
    }
    unUpvote.remove();

    await group.save();

    res.json(post.upvotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
