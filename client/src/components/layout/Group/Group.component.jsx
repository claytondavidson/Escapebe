import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner.component';
import { getGroup } from '../../../redux/actions/group';
import GroupItem from '../GroupItem/GroupItem.component';
import PostForm from '../PostForm/PostForm.component';
import PostItem from '../PostItem/PostItem.component';

const Group = ({ getGroup, group: { group, loading }, match }) => {
  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);
  return loading || group === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GroupItem group={group} showButton={false} />
      <div className='posts'>
        {group.posts.map(post => (
          <PostItem key={post._id} post={post} groupId={group._id} />
        ))}
      </div>
      <PostForm groupId={group._id} />
      <Link to='/groups' className='button'>
        Return to groups
      </Link>
    </Fragment>
  );
};

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroup })(Group);
