const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Member = require('../models/Member');

router.get('/', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.member.id).select('-password');
    res.json(member);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

router.post(
  '/',
  [
    check('email', 'a valid email is required').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) => {
    if (req.session.login_attempts > 10) {
      return res.status(400).json({ msg: 'stop trying to bruteforce' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let member = await Member.findOne({ email });
      if (!member) {
        res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
      }

      const match = await bcrypt.compare(password, member.password);

      if (!match) {
        req.session.login_attempts = (req.session.login_attempts || 0) + 1;
        console.log(req.session.login_attempts);
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }

      const payload = {
        member: { id: member.id }
      };

      jwt.sign(
        payload,
        config.get('jsonwebtokensecret'),
        {
          expiresIn: 36000
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
