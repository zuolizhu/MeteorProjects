import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilter from './LinksListFilter';

//Stateless functional component
export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <LinksListFilter/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};
