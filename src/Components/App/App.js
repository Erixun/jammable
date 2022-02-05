import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [{ name: 'Track of tracks', artist: 'Artistix', album: 'Album1', id: '1' }],
      playListName: 'Best playlist',
      playListTracks: [{ name: 'Crud & Grok', artist: 'Arson Care', album: 'Low Above', id: '2' }]
    }
  }
  render() {
    return (<div>
      <h1>Ja<span className="highlight">mm</span>able</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist name={this.state.playListName} tracks={this.state.playListTracks} />
        </div>
      </div>
    </div>)
  }
}

export default App;
