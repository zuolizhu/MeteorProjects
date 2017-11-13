import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>can not find the page you are looking for</p>
        <Link to="/" className="button button--link">HOME PAGE</Link>
      </div>
    </div>
  );
};
