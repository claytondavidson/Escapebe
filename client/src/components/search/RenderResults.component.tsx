import React, { Fragment } from 'react';

const RenderResults = ({ group: { title } }) => (
  <Fragment>
    <h4>{title}</h4>
  </Fragment>
);

export default RenderResults;
