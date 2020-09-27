
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../Utils/Dimensions/index'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        borderColor: 'rgb(45,91,142)',
        backgroundColor: '#fff',
        borderWidth: 1,
        width: '90%',
        borderRadius: scale(10),
        height: verticalScale(48),
        marginBottom: verticalScale(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: verticalScale(48),
        marginLeft: scale(16),
        flex: 1,
    },
    inputIcon: {
        width: scale(30),
        height: verticalScale(30),
        marginLeft: scale(15),
        justifyContent: 'center'
    },
    buttonContainer: {
        height: verticalScale(45),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20),
        width: scale(250),
        borderRadius: scale(30),
    },
    loginButton: {
        backgroundColor: 'rgb(45,91,142)',
    },
    loginText: {
        color: '#fff',
    }, logo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        margin: 30,
    }
});

export default styles;