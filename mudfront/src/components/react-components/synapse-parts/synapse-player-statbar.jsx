import React from 'react';

export default class PlayerStatBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.mounted && (
          <div id='player-status'>
            <div id='hp'>
              <div>
                <button
                  className={
                    this.props.player.health.current <
                    this.props.player.health.max / 2
                      ? 'low-points'
                      : 'normal-points'
                  }
                >
                  {this.props.player.health.current}/
                  {this.props.player.health.max}
                </button>
              </div>
              <progress
                className={
                  this.props.player.health.current <
                  this.props.player.health.max / 2
                    ? 'progress is-danger is-small animated bounceInLeft'
                    : 'progress is-primary is-small animated bounceInLeft'
                }
                value={this.props.player.health.current}
                max={this.props.player.health.max}
              />
            </div>
            <div id='mana'>
              <progress
                className='progress is-info is-small animated bounceInRight'
                value={this.props.player.mana.current}
                max={this.props.player.mana.max}
              />
              <div>
                <button
                  className={
                    this.props.player.mana.current <
                    this.props.player.mana.max / 2
                      ? 'low-points'
                      : 'normal-points'
                  }
                >
                  {this.props.player.mana.current}/{this.props.player.mana.max}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
