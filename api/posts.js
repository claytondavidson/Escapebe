const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const Member = require('../models/Member');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'you must include a title')
        .not()
        .isEmpty(),
      check('text', 'you must write something')
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

      const memberPost = new Post({
        title: req.body.title,
        text: req.body.text,
        username: member.username,
        member: req.member.id
      });

      const post = await memberPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
