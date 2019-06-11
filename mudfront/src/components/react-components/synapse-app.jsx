import React from 'react';
import AnsiUp from 'ansi_up';
import './synapse.scss';
import Connect from './synapse-parts/synapse-connect';
import Output from './synapse-parts/synapse-output';
import Input from './synapse-parts/synapse-input';
import PlayerStats from './synapse-parts/synapse-player-stats';
// import PlayerTray from './synapse-parts/synapse-player-tray';

export default class SynapseApp extends React.Component {
  constructor(props) {
    super(props);
    this.ansiUp = new AnsiUp();
    this.ansiUp.use_classes = true;
    this.websocket;
    this.state = {
      connected: false,
      message: '',
      history: [],
      playerData: {
        attributes: {},
        targets: {},
        effects: {}
      },
      playerDataMounted: false
    };
  }
  componentDidMount() {}
  connect = e => {
    this.websocket = new WebSocket('ws://localhost:40114');
    this.websocket.onopen = this._wsOnOpen;
    this.websocket.onclose = this._wsOnClose;
    this.websocket.onmessage = this._wsOnMessage;
    this.websocket.onerror = this._wsOnError;
    this.setState({ connected: true });
  };
  disconnect = () => {
    this.websocket.close();
    this.setState({ connected: false });
  };
  writeOutput = (message, elClass = '', raw = false) => {
    let span = document.createElement('span');
    message = raw ? message : this.ansiUp.ansi_to_html(message);
    // find links
    message = message.replace(
      /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      x => {
        return `<a href="http://${x}" target="_blank" tabindex="-1">${x}</a>`;
      }
    );
    span.innerHTML = message;
    span.classList.add('output-message');
    if (elClass) {
      span.classList.add(elClass);
    }
    document.getElementById('mudOutput').appendChild(span);
    document.getElementById('mudOutput').scrollTop = document.getElementById(
      'mudOutput'
    ).scrollHeight;
  };
  _wsOnMessage = e => {
    let data = JSON.parse(e.data);
    if (data.type === 'message') {
      this.writeOutput(data.message);
    } else if (data.type === 'data') {
      // if (!this.playerData) {
      //   this.playerData = {};
      // }
      if (data.group === 'attributes') {
        this.setState({
          playerData: { attributes: data.data },
          playerDataMounted: true
        });
      } else if (data.group === 'targets') {
        this.setState({ playerData: { targets: data.data } });
      } else if (data.group === 'effects') {
        this.setState({ playerData: { effects: data.data } });
      }
    }
  };
  _wsOnOpen = e => {
    this.writeOutput('Connected', 'info', true);
    console.log('Win');
  };
  _wsOnClose = e => {
    this.writeOutput('Connection Closed', 'info', true);
    this.setState({ playerData: {}, playerDataMounted: false });
    console.log('Wa-wa-wahhhhhhh');
  };
  _wsOnError = e => {
    console.log(e);
    this.writeOutput('Websocket Error', 'error', true);
  };
  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  messageInput = e => {
    // let message = this.state.inputVal;
    e.preventDefault();
    let message = this.state.message.trim();
    this.websocket.send(message);
    this.setState(prevState => {
      return {
        history: [...prevState.history, message]
      };
    });
    return this.setState({ message: '' });
  };
  _effectsVisible = () => {
    return this.playerData && this._effectsOpen;
  };
  _effectsCommand = () => {
    if (!this.websocket || this.websocket.readyState !== 1) {
      return;
    }
    this.websocket.send('effects');
  };
  _questsVisible = () => {
    return this.playerData && this._questsOpen;
  };
  _questsCommand = () => {
    if (!this.websocket || this.websocket.readyState !== 1) {
      return;
    }
    this.websocket.send('quest log');
  };
  _openOptions = () => {
    this._optionsOpen = true;
  };
  _closeOptions = () => {
    this._optionsOpen = false;
  };
  _optionsSaved = () => {
    this._optionsOpen = false;
    let fontSize = parseInt(this.options.fontSize, 10);
    document.getElementById('mudOutput').style.fontSize =
      (isNaN(fontSize) ? 14 : fontSize) + 'px';
    if (this.store) {
      this.store.set('options', this.options);
    }
  };
  _toggleEffects = () => {
    this._effectsOpen = !this._effectsOpen;
  };
  _toggleQuests = () => {
    this._questsOpen = !this._questsOpen;
  };

  render() {
    return (
      <div className='synapse-client'>
        <Connect
          connect={this.connect}
          disconnect={this.disconnect}
          connected={this.state.connected}
        />
        <Output />
        <Input
          changeHandler={this.changeHandler}
          value={this.state.message}
          message={this.messageInput}
        />
        <PlayerStats
          player={this.state.playerData}
          mounted={this.state.playerDataMounted}
        />
      </div>
    );
  }
}
