import React from 'react';
import {Text,Alert, TouchableOpacity, AsyncStorage, TextInput, View} from 'react-native';
import User from '../User';
import styles from '../styling/styles';
import firebase from 'firebase';

export default class App extends React.Component {
  static navigationOptions ={
    header: null
  }
  state={
    phone:'',
    name:''
  }
  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  // componentWillMount(){
  //   AsyncStorage.getItem('userPhone').then(val=>{
  //     if (val) {
  //       this.setState({phone: val});
  //     }
  //   })
  // }

  submitForm =() => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong Phone Number');
    }else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Wrong Name');
    }else {
      AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({name: this.state.name});
      this.props.navigation.navigate('App');
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
          />

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
            />

            <TouchableOpacity onPress={this.submitForm}>
            <Text style={styles.btnText}>Enter</Text>
            </TouchableOpacity>
      </View>
    );
  }
}
