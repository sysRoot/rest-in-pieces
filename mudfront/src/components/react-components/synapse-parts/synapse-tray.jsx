import React from 'react';
import PlayerTarget from './synapse-target';
import PlayerStats from './synapse-stats';

export default class PlayerTray extends React.Component {
  constructor(props) {
    super(props);
    // this.modal = React.createRef();
    // this.state = {
    //   isPaneOpen: false
    // };
  }

  render() {
    return (
      <>
        <div className={this.props.mounted ? 'modal display-block' : 'modal display-none'}>
          <section className='modal-main'>
            <PlayerStats mounted={this.props.mounted} stats={this.props.player} />
            <PlayerTarget targets={this.props.targets} />
          </section>
        </div>
      </>
    );
  }
}
