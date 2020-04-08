import { Request, Response } from 'express';
import { authToken as auth } from '../middleware/auth';
import { check, validationResult } from 'express-validator';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { get, use, controller, post } from './decorators';
import Member from '../models/Member';

@controller('/api/auth')
export class AuthenticationController {
  @get('/')
  @use(auth)
  protected async getMember(req: Request, res: Response) {
    try {
      const member = await Member.findById(req.member.id).select('-password');
      res.json(member);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @post('/')
  @use(check('email', 'a valid email is required').isEmail())
  @use(check('password', 'password is required').exists())
  protected async loginMember(req: Request, res: Response) {
    if (req.session!.login_attempts > 10) {
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

      const match = await compare(password, member!.password);

      if (!match) {
        req.session!.login_attempts = (req.session!.login_attempts || 0) + 1;
        console.log(req.session!.login_attempts);
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }

      const payload = {
        member: { id: member!.id },
      };

      sign(
        payload,
        config.get('jsonwebtokensecret'),
        {
          expiresIn: 36000,
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
}
