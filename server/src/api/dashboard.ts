const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
import Dashboard from '../models/Dashboard';
import Member from '../models/Member';
const { check, validationResult } = require('express-validator');

router.get('/member', auth, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      member: req.member.id
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
});

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array });
  }

  const { alias, about } = req.body;

  const dashboardFields: any = {};
  dashboardFields.member = req.member.id;
  if (alias) dashboardFields.alias = alias;
  if (about) dashboardFields.about = about;

  try {
    let dashboard = await Dashboard.findOne({ member: req.member.id });

    if (dashboard) {
      dashboard = await Dashboard.findOneAndUpdate(
        { member: req.member.id },
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
});

router.get('/', async (req, res) => {
  try {
    const dashboards = await Dashboard.find().populate('member', ['username']);
    res.json(dashboards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

router.get('/members/:member_id', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      member: req.params.member_id
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
});

router.delete('/', auth, async (req, res) => {
  try {
    // @TODO remove member's posts on removal
    await Dashboard.findOneAndRemove({ member: req.member.id });

    await Member.findOneAndRemove({ _id: req.member.id });

    res.json({ msg: 'member removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
