import React from 'react';

export default class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id='mudOutput'>
          {/* <form onSubmit={props.sendCommand}> */}
          <p>&lt;Waiting&gt;</p>
        </div>
      </>
    );
  }
}
