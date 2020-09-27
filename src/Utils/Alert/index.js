import {Alert} from 'react-native';
export function showMessage(isError=false,message){
    Alert.alert(
      isError ? 'error' : 'success',
      message,
      [
        {text: 'ok', style: 'cancel'},
      ],
      {cancelable: false},
    );
  }
  