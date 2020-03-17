const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
import Member from '../models/Member';

router.post(
  '/',
  [
    check('username', 'a username is required')
      .not()
      .isEmpty(),
    check('email', 'a valid email is required').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let member = await Member.findOne({ email });
      if (member) {
        res.status(400).json({ errors: [{ msg: 'member already exists' }] });
      }

      member = new Member({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      member.password = await bcrypt.hash(password, salt);
      await member.save();

      const payload = {
        member: { id: member.id }
      };

      jwt.sign(
        payload,
        config.get('jsonwebtokensecret'),
        {
          expiresIn: 3600
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
