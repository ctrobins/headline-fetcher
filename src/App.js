/* global chrome */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      domain: '',
      headlines: []
    }
  }

  componentDidMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      this.setState({
        domain: domain,
      });
      this.getHeadlines(domain);
    });
  }

  getHeadlines(query) {
    axios.get('https://newsapi.org/v2/everything',{
      params: {
        q: query,
        language: 'en',
        apiKey: {{ YOUR KEY HERE }}
      }
    }).then(results => {
        this.setState({
          headlines: results.data.articles.slice(0,5)
        });
    }).catch(error => {
        console.log('Error in obtaining headlines', error);
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">{this.state.domain}</h1>
        Top Headlines:
        {this.state.headlines.map(headline => (
          <h4 className="link" onClick={() => {
            window.open(headline.url)}}>{headline.title}</h4>))}
      </div>
    );
  }
}
export default App;
