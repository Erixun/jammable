import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchResults: [{ name: 'Track of tracks', artist: 'Artistix', album: 'Album1', id: '1' }] }
  }
  render() {
    return (<div>
      <h1>Ja<span className="highlight">mm</span>able</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist />
        </div>
      </div>
    </div>)
  }
}

export default App;
