import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Icon, Button } from 'native-base';
import styles from '../Header/headerStyle';

export const DashboardHeader = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.childContainer1}>
                <Text style={styles.title}>Today</Text>
                <Text style={styles.heading}>My feed</Text>
            </View>
            <View style={styles.childContainer2}>
                <TouchableOpacity style={{ alignItems: 'flex-start', paddingRight: 7 }} onPress={() => props.chooseFiles()}>
                    {/*Donute Button Image */}
                    <Avatar
                        rounded
                        source={{
                            uri:
                                props.imagePaths!=undefined ? props.imagePaths : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                        size="medium"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const StripHeader = (props) => {
    return (
        <View style={styles.stripHeader}>
            <TouchableOpacity onPress={() => alert("go back")} style={styles.childContainer1}>
                <Icon type="FontAwesome" name="arrow-left" style={{ fontSize: 30, paddingTop: 10, color:'#fff' }} />
            </TouchableOpacity>
            <View style={styles.childContainer2}>
                <Button rounded style={{ alignSelf: 'flex-end', backgroundColor:'#fff', width:70 }}>
                    <Text style={{padding:20,fontSize:13,color:'rgb(45,91,142)'}}>Next</Text>
                </Button>
            </View>
        </View>
    )
}