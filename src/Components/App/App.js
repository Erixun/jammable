import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [{ name: 'Track of tracks', artist: 'Artistix', album: 'Album1', id: '1', uri: 'spotify:track:6rqhFgbbKlDb9MLmUQDhG6' }],
      playListName: 'Best playlist',
      playListTracks: [{ name: 'Crud & Grok', artist: 'Arson Care', album: 'Low Above', id: '2', uri: 'spotify:track:6rqhFgaqKwnb9MLmUQDhG6' }]
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track) {
    const isInPlaylist = this.state.playListTracks.find(t => t.id === track.id)
    if (isInPlaylist) return;

    this.setState({ playListTracks: [...this.state.playListTracks, track] })
  }

  removeTrack(track) {
    const filteredPlaylist = this.state.playListTracks.filter(t => t.id !== track.id)

    this.setState({ playListTracks: filteredPlaylist })
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playListTracks.map(track => track.uri)
    console.log(trackURIs)
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mm</span>able</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} isRemoval={false} searchResults={this.state.searchResults} />
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} name={this.state.playListName} tracks={this.state.playListTracks} />
        </div>
      </div>
    </div>)
  }
}

export default App;
