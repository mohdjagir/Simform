import React, { Component } from 'react';
import styles from './loginStyle';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../Actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import showToast from '../../Utils/Toast/index'
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import { INPUT_FIELD_NOT_BLANK, SOMETHING_WENT_WRONG, SUCCESSFULLY_LOGIN } from '../../Utils/String';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    /***verifing data */
    static propTypes = {
        userLoginRequest: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        userData: PropTypes.object,

    }

    /***click to login event */
    loginListner = () => {
        const { email, password } = this.state
        if (email != '' && password != '') {
            this.props.userLoginRequest({ email: email, password: password })
        }
        else{showToast(INPUT_FIELD_NOT_BLANK)}
    }

    /***fetching value in props */
    componentDidUpdate(prevProps) {
        if (this.props.userData && prevProps != this.props.userData) {
            console.log("this.props.userData", this.props.userData)
            if (this.props.userData.response && this.props.userData.response.token) {
                showToast(SUCCESSFULLY_LOGIN)
                this.props.navigation.navigate('Dashboard')
            }else{showToast(SOMETHING_WENT_WRONG)}
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
                    <Image style={styles.inputIcon} source={require('../../Assets/password.png')} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.loginListner()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
                <Spinner cancelable={true} visible={this.props.loading} color={"rgb(45,91,142)"} textContent={"Loading.."} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.userLogin.loading,
    userData: state.userLogin.userData
})

const mapDispatchToProps = {
    userLoginRequest
}
const Login = connect(mapStateToProps, mapDispatchToProps)(index)
export default Login;