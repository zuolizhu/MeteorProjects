import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class LinksListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }

  componentDidMount() {
    console.log('componentDidMount Filter');
    this.filterTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    });
  }

  componentWillUnmount() {
    this.filterTracker.stop();
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
            Session.set('showVisible', !e.target.checked);
          }}/>
          show hidden links
        </label>
      </div>
    );
  }
}
