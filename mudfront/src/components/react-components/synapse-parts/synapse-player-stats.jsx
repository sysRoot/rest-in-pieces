import React from 'react';

export default class PlayerStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.mounted && (
          <div id='player-status'>
            <div id='hp'>
              <progress
                className='progress is-primary is-small'
                value={this.props.player.attributes.health.current}
                max={this.props.player.attributes.health.max}
              />
              <div>
                <p
                  className={
                    this.props.player.attributes.health.current <
                    this.props.player.attributes.health.max / 2
                      ? 'low-points'
                      : 'normal-points'
                  }
                >
                  {this.props.player.attributes.health.current}/
                  {this.props.player.attributes.health.max}
                </p>
              </div>
            </div>
            <div id='mana'>
              <progress
                className='progress is-info is-small'
                value={this.props.player.attributes.mana.current}
                max={this.props.player.attributes.mana.max}
              />
              <div>
                <p
                  className={
                    this.props.player.attributes.mana.current <
                    this.props.player.attributes.mana.max / 2
                      ? 'low-points'
                      : 'normal-points'
                  }
                >
                  {this.props.player.attributes.mana.current}/
                  {this.props.player.attributes.mana.max}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
