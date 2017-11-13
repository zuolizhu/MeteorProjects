import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/link';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linksCollection: []
    };
  }

  //react lifecycle method
  componentDidMount() {
    console.log('componentDidMount LinksList');
    //Fetch links collection from mongodb
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPubish');
      const linksCollection = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({linksCollection});
    });
  }

  componentWillUnmount() {
    console.log('compomentWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if(this.state.linksCollection.length === 0) {
      return (
        <div className="item">
          <p className="item_status-message">No links found</p>
        </div>
      );
    }

    //Display links from linksCollection array
    return this.state.linksCollection.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
    });
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
