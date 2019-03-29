import React from 'react';
import {TouchableOpacity, Text, SafeAreaView, TextInput, AsyncStorage} from 'react-native';
import User from '../User';
import styles from '../styling/styles';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component{
  static navigationOptions = {
    title: 'Profile'
  }
  state ={
    name: User.name
  }
  handleChange = key => val => {
    this.setState({[key]: val});
  }
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (User.name !== this.state.name) {
      firebase.database().ref('users').child(User.phone).set({name: this.state.name});
      User.name = this.state.name;
      Alert.alert('Success', 'Name changed sucessfuly.');
    }
  }
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  render(){
    return(
      <SafeAreaView  style={styles.container}>
        <Text style={{fontSize:20}}>{User.phone}</Text>
        <TextInput
          value={this.state.name}
          onChangeText={this.handleChange('name')}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnText}>Change Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
