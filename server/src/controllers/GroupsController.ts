import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { authToken as auth } from '../middleware/auth';
import Group from '../models/Group';
import Member from '../models/Member';
import { get, use, controller, post, put } from './decorators';

@controller('/api/groups')
export class GroupsController {
  @post('/')
  @use(auth)
  @use(check('title', 'you must include a title').not().isEmpty())
  @use(
    check('description', 'you must write a group description').not().isEmpty()
  )
  protected async createGroup(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById((<any>req).member.id).select(
        '-password'
      );

      const newGroup = new Group({
        title: req.body.title,
        description: req.body.description,
        member: (<any>req).member.id,
        username: member!.username,
      });

      const group = await newGroup.save();
      res.json(group);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @get('/')
  @use(auth)
  protected async getAllGroups(req: Request, res: Response) {
    try {
      const groups = await Group.find().sort({ date: -1 });
      res.json(groups);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @get('/:id')
  @use(auth)
  protected async getGroupById(req: Request, res: Response) {
    try {
      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(404).json({ msg: 'group does not exist' });
      }

      res.json(group);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'group not found' });
      }
      res.status(500).send('server error');
    }
  }

  @get('/:group_id/:post_id')
  @use(auth)
  protected async getPostById(req: Request, res: Response) {
    try {
      const group = await Group.findById(req.params.group_id);

      const post = group!.posts.find((post) => post.id === req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'post does not exist' });
      }

      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'post not found' });
      }
      res.status(500).send('server error');
    }
  }

  @post('/post/:id')
  @use(auth)
  @use(check('title', 'you must include a title').not().isEmpty())
  @use(check('text', 'you must include text').not().isEmpty())
  protected async createPost(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById((<any>req).member.id).select(
        '-password'
      );
      const group = await Group.findById(req.params.id);

      const newPost = {
        title: req.body.title,
        text: req.body.text,
        member: (<any>req).member.id,
        username: member!.username,
      };

      group!.posts.unshift(newPost);

      await group!.save();

      res.json(group!.posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @post('/comment/:group_id/:post_id')
  @use(auth)
  @use(check('text', 'you must include text').not().isEmpty())
  protected async createComment(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await Member.findById((<any>req).member.id).select(
        '-password'
      );
      const group = await Group.findById(req.params.group_id);

      const post = group!.posts.find((post) => post.id === req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'Post does not exist' });
      }

      const newComment = {
        text: req.body.text,
        member: (<any>req).member.id,
        username: member!.username,
      };

      post.comments.unshift(newComment);

      await group!.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @put('/upvote/:id/:post_id')
  @use(auth)
  protected async upvotePost(req: Request, res: Response) {
    try {
      const group = await Group.findById(req.params.id);
      const post = group!.posts.find((post) => post.id === req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'Post does not exist' });
      }

      const checkUpvote = post.upvotes.find(
        (upvote: { member: { toString: () => any } }) =>
          upvote.member.toString() === (<any>req).member.id
      );

      if (checkUpvote) {
        return res.status(400).json({ msg: 'post already upvoted' });
      }

      post.upvotes.unshift({ member: (<any>req).member.id });

      await group!.save();

      res.json(post.upvotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @put('/unupvote/:id/:post_id')
  @use(auth)
  protected async unupvotePost(req: Request, res: Response) {
    try {
      const group = await Group.findById(req.params.id);
      const post = group!.posts.find((post) => post.id === req.params.post_id);

      if (!post) {
        return res.status(404).json({ msg: 'Post does not exist' });
      }

      const unUpvote = post.upvotes.find(
        (upvote: { member: { toString: () => any } }) =>
          upvote.member.toString() === (<any>req).member.id
      );
      if (!unUpvote) {
        return res.status(400).json({ msg: 'Post has not yet been upvoted' });
      }
      unUpvote.remove();

      await group!.save();

      res.json(post.upvotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
}
