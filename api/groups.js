const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Group = require('../models/Group');
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
  }
);

module.exports = router;
