import React from 'react';

export default class Connect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <button onClick={this.props.connected === false ? this.props.connect : this.props.disconnect} >{this.props.connected === false ? 'Connect' : 'Disconnect'}</button>
      </>
    );
  }
}
