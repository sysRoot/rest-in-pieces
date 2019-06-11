import React from 'react';

export default class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <>
        <div id='mudOutput' />
      </>
    );
  }
}
