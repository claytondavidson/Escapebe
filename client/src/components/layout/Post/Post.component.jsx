import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../../redux/actions/group';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner.component';
import LazyLoad from 'react-lazyload';
import CommentForm from '../../layout/CommentForm/CommentForm.component';
import CommentItem from '../../layout/CommentItem/CommentItem.component';
import PostItem from '../PostItem/PostItem.component';

const Post = ({ match }) => {
  const [postLoading, setPostLoading] = useState(true);
  const post = useSelector((state) => state.group.post);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(getPost(match.params.group_id, match.params.post_id));
      setPostLoading(false);
    })();
  }, [match.params.group_id, match.params.post_id, dispatch]);

  return postLoading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItem
        key={match.params.group_id}
        groupId={match.params.group_id}
        post={post}
        showComments={false}
      />
      {post.comments &&
        post.comments.map((comment) => (
          <LazyLoad key={comment._id}>
            <CommentItem
              key={comment._id}
              comment={comment}
              groupId={match.params.group_id}
              postId={post._id}
            />
          </LazyLoad>
        ))}
      <CommentForm groupId={match.params.group_id} postId={post._id} />
      <Link className='button' to={`/group/${match.params.group_id}`}>
        Close
      </Link>
    </Fragment>
  );
};

export default Post;
