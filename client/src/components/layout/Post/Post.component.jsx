import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../Spinner/Spinner.component';
import { getPost } from '../../../redux/actions/group';
import LazyLoad from 'react-lazyload';

const Post = ({ getPost, post, match }) => {
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getPost(match.params.group_id, match.params.post_id);
      setPostLoading(false);
    })();
  }, [getPost, match.params.group_id, match.params.post_id]);

  return postLoading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='post-component'>
        <div>{post.username}</div>
        <div>{post.title}</div>
        <div>{post.text}</div>
        {post.comments &&
          post.comments.map(comment => (
            <LazyLoad key={comment._id}>
              <div className='comment' key={comment._id}>
                <div>
                  <Link to={`/dashboard/${comment.member}`}>
                    <h4>{comment.username}</h4>
                  </Link>
                </div>
                <p>{comment.text}</p>
                <p>
                  Posted on <Moment format='MM/DD/YYYY'>{comment.date}</Moment>
                </p>
              </div>
            </LazyLoad>
          ))}
        <Link className='button' to={`/group/${match.params.group_id}`}>
          Close
        </Link>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  post: state.group.post
});

export default connect(mapStateToProps, { getPost })(Post);
