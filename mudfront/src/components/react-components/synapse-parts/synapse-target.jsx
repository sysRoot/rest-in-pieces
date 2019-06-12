import React from 'react';

export default class PlayerTarget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.targets.length !== 0 && <div id='player-targets' className='animated fadeUpIn'>
          <h2>Current Targets</h2>
          {this.props.targets.map((cur, idx) => (
            <div key={`${cur.name}-${idx}`}>
              <h4>{cur.name}</h4>
              <p>
                {cur.health.current}/{cur.health.max}
              </p>
            </div>
          ))}
        </div>}
      </>
    );
  }
}
