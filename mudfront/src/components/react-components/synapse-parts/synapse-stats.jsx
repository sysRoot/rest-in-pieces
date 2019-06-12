import React from 'react';

export default class PlayerStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.mounted && (
          <div id='player-stats' className=''>
            <h2>Stats:</h2>
            <p>
              AGI: {this.props.stats.agility.current}/
              {this.props.stats.agility.max}
            </p>
            <p>
              ARM: {this.props.stats.armor.current}/
              {this.props.stats.armor.max}
            </p>
            <p>
              INT: {this.props.stats.intellect.current}/
              {this.props.stats.intellect.max}
            </p>
            <p>
              CRI: {this.props.stats.critical.current}/{this.props.stats.critical.max}
            </p>
            <p>
              STA: {this.props.stats.stamina.current}/{this.props.stats.stamina.max}
            </p>
            <p>
              STR: {this.props.stats.strength.current}/{this.props.stats.strength.max}
            </p>
          </div>
        )}
      </>
    );
  }
}
