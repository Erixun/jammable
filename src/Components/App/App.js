import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      playListName: '',
      playListTracks: [],
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    Spotify.getAccessToken()
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

  async search(term) {
    const result = await Spotify.search(term)
    this.setState({ searchResults: result })
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mm</span>able</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} isRemoval={false} searchResults={this.state.searchResults} />
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} name={this.state.playListName} tracks={this.state.playListTracks} />
        </div>
      </div>
    </div>)
  }
}

export default App;
