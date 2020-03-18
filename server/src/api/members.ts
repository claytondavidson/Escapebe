import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { get } from 'config';
import Member from '../models/Member';

const router = Router();

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
  async (req: Request, res: Response) => {
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

      const salt = await genSalt(10);
      member.password = await hash(password, salt);
      await member.save();

      const payload = {
        member: { id: member.id }
      };

      sign(
        payload,
        get('jsonwebtokensecret'),
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

export = router;
