import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import User from '../User';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDyIJmY8q2vHj_wsA-w7S-fjbEriZQX37E",
      authDomain: "chatappdemo-28c1e.firebaseapp.com",
      databaseURL: "https://chatappdemo-28c1e.firebaseio.com",
      projectId: "chatappdemo-28c1e",
      storageBucket: "chatappdemo-28c1e.appspot.com",
      messagingSenderId: "651871009252"
    };
    firebase.initializeApp(config);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
