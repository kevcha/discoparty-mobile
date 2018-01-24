/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import axios from 'axios';

const extractKey = ({ id }) => id

export default class discoparty extends Component {
  state = {
    playlist: {
      name: '',
      tracks: []
    }
  }

  renderItem = ({ item }) => {
    return (
      <Text style={styles.row}>
        {item.title}
      </Text>
    )
  }

  componentDidMount = () => {
    // try {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    //   const responseJson = await response.json()

    //   this.setState({ playlist: responseJson.data.playlist })
    // } catch (e) {
    //   // this.setState({ error: true })
    // }
    // console.log(response);
    axios.get(`https://discoparty.herokuapp.com/api/v1/playlists/2`)
      .then(response => {
        // console.log(response.data.playlist.tracks);
        let playlist = response.data.playlist;
        this.setState({ playlist: playlist });
        // this.updatePlaylist(playlist);
        // this.loadTrack();
      });
  }

  updatePlaylist = (playlist) => {
    console.log(playlist);
    // console.log(this.state.playedTracks);
    playlist.tracks = playlist.tracks.filter((track) => {
      return !this.state.playedTracks.includes(track.id);
    });
    // this.setState({ playlist });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Discoparty</Text>
        <FlatList
          style={styles.container}
          data={this.state.playlist.tracks}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    backgroundColor: '#C7EFCF',
  },
  wrapper: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#C7EFCF'
  }
})

AppRegistry.registerComponent('discoparty', () => discoparty);
