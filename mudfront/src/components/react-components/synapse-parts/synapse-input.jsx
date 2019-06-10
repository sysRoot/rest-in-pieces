import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <form onSubmit={this.props.message}>
          <input id="mudInput" name="message" value={this.props.value} onChange={this.props.changeHandler} type='text' />
        </form>
      </>
    );
  }
}
