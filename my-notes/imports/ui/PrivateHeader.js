import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navIcon = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={navIcon} onClick={() => props.handleNavIcon()}/>
        <h1 className=".header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleNavIcon: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavIcon: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);
