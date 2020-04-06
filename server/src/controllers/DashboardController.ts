import { Router, Request, Response } from 'express';
import { authToken as auth } from '../middleware/auth';
import { validationResult } from 'express-validator';
import Dashboard from '../models/Dashboard';
import Member from '../models/Member';
import { get, use, controller, post, del } from './decorators';

@controller('/api/dashboard')
class DashboardController {
  @get('/member')
  @use(auth)
  protected async getAuthenticatedDashboard(req: Request, res: Response) {
    try {
      const dashboard = await Dashboard.findOne({
        member: (<any>req).member.id,
      }).populate('member', ['alias']);

      if (!dashboard) {
        return res
          .status(400)
          .json({ msg: 'there is no profile for this member' });
      }

      res.json(dashboard);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @post('/')
  @use(auth)
  protected async updateMemberDashboard(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const { alias, about } = req.body;

    const dashboardFields: any = {};
    dashboardFields.member = (<any>req).member.id;
    if (alias) dashboardFields.alias = alias;
    if (about) dashboardFields.about = about;

    try {
      let dashboard = await Dashboard.findOne({ member: (<any>req).member.id });

      if (dashboard) {
        dashboard = await Dashboard.findOneAndUpdate(
          { member: (<any>req).member.id },
          { $set: dashboardFields },
          { new: true }
        );

        return res.json(dashboard);
      }

      dashboard = new Dashboard(dashboardFields);

      await dashboard.save();
      res.json(dashboard);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @get('/')
  @use(auth)
  protected async getAllDashboards(req: Request, res: Response) {
    try {
      const dashboards = await Dashboard.find().populate('member', [
        'username',
      ]);
      res.json(dashboards);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }

  @get('/members/:member_id')
  @use(auth)
  protected async getDashboardById(req: Request, res: Response) {
    try {
      const dashboard = await Dashboard.findOne({
        member: req.params.member_id,
      }).populate('member', ['username']);

      if (!dashboard) {
        return res.status(400).json({ msg: 'profile not found' });
      }
      res.json(dashboard);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'profile not found' });
      }
      res.status(500).send('server error');
    }
  }

  @del('/')
  @use(auth)
  protected async deleteMember(req: Request, res: Response) {
    try {
      // @TODO remove member's posts on removal
      await Dashboard.findOneAndRemove({ member: (<any>req).member.id });

      await Member.findOneAndRemove({ _id: (<any>req).member.id });

      res.json({ msg: 'member removed' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
}
