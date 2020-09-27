import React, { Component } from 'react';
import styles from './loginStyle';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../Assets/react.png')}
                    style={styles.logo}
                />
                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={require('../../Assets/secured-letter.png')} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={require('../../Assets/password.png' )} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default index;