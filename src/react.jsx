import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors,
} from '@fortawesome/free-solid-svg-icons';

library.add(faHandRock, faHandPaper, faHandScissors);

class Scoreboard extends Component {
  render() {
    return (
      <div className='scoreboard'>
        <div className='scoreboard__score'>
          <div className='scoreboard__user-score' id='user-score'>
            <div>{this.props.scoreData.userScore}</div>
            <div className='scoreboard__label'>User</div>
          </div>
          <div className='scoreboard__delimiter'> : </div>
          <div className='scoreboard__bot-score' id='bot-score'>
            <div>{this.props.scoreData.botScore}</div>
            <div className='scoreboard__label'>Bot</div>
          </div>
        </div>
        <div className='scoreboard__alert'>{this.props.scoreData.message}</div>
      </div>
    );
  }
}

class RPSButtons extends Component {
  render() {
    return (
      <div className='RPS_Buttons'>
        <div
          className='RPS_Button'
          userinput='Rock'
          onClick={this.props.handleUserClick}>
          <FontAwesomeIcon icon='hand-rock' className='RPS_Button__Icon' />
        </div>
        <div
          className='RPS_Button'
          userinput='Paper'
          onClick={this.props.handleUserClick}>
          <FontAwesomeIcon icon='hand-paper' className='RPS_Button__Icon' />
        </div>
        <div
          className='RPS_Button'
          userinput='Scissors'
          onClick={this.props.handleUserClick}>
          <FontAwesomeIcon icon='hand-scissors' className='RPS_Button__Icon' />
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.getBotRPS = this.getBotRPS.bind(this);
    this.state = {
      userScore: 0,
      botScore: 0,
      message: 'Time to play the game!',
    };
  }

  getBotRPS() {
    const botRPS = ['Rock', 'Paper', 'Sciccors'];
    return botRPS[Math.floor(Math.random() * 3)];
  }

  highlightWinner(winner) {
    const winnerId = winner === 'user' ? 'user-score' : 'bot-score';
    const winnerStyleList = document.getElementById(winnerId).classList;
    const wStyle = 'scoreboard__winner-glow';
    winnerStyleList.add(wStyle);
    setTimeout(() => winnerStyleList.remove(wStyle), 200);
  }

  highlightPick(pick, result) {
    const styling =
      'RPS_Button__' +
      (result === 'won'
        ? 'winner-highlight'
        : result === 'lost'
        ? 'loser-highlight'
        : 'draw-highlight');
    pick.classList.add(styling);
    setTimeout(() => pick.classList.remove(styling), 150);
  }

  handleUserClick(event) {
    const usrChoice = event.target.getAttribute('userinput');
    const botChoice = this.getBotRPS();
    switch (usrChoice[0] + botChoice[0]) {
      case 'RS':
      case 'PR':
      case 'SP':
        this.setState({
          userScore: this.state.userScore + 1,
          message: `${usrChoice} beats ${botChoice}. User wins!`,
        });
        this.highlightWinner('user');
        this.highlightPick(event.target, 'won');
        break;
      case 'SR':
      case 'RP':
      case 'PS':
        this.setState({
          botScore: this.state.botScore + 1,
          message: `${usrChoice} loses to ${botChoice}. Bot wins!`,
        });
        this.highlightWinner('bot');
        this.highlightPick(event.target, 'lost');
        break;
      case 'RR':
      case 'PP':
      case 'SS':
        this.setState({
          message: `${usrChoice} can't beat ${botChoice}. It's a draw`,
        });
        this.highlightPick(event.target, 'draw');
        break;
      default:
        alert('Something went very very wrong');
        break;
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>React-powered Rock-Paper-Scissors game</h1>
        </header>
        <Scoreboard scoreData={this.state} />
        <RPSButtons handleUserClick={this.handleUserClick} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
