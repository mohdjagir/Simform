import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native'

import { Icon, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StripHeader } from '../../Components/Header/index';
import { stripsFetchRequest } from '../../Actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: {values: [0]},
      chemicalData:[{"id":"1","name":"Total Hardness","unit":"ppm","values":[{"color":"rgb(45,91,142)","value":"0"},{"color":"rgb(89,100,146)","value":"110"},{"color":"rgb(97,88,138)","value":"250"},{"color":"rgb(118,75,119)","value":"500"},{"color":"rgb(152,81,130)","value":"1000"}]},{"id":"2","name":"Total Chlorine","unit":"ppm","values":[{"color":"rgb(255,240,108)","value":"0"},{"color":"rgb(245,248,127)","value":"1"},{"color":"rgb(223,235,111)","value":"3"},{"color":"rgb(166,203,158)","value":"5"},{"color":"rgb(134,192,154)","value":"10"}]},{"id":"3","name":"Free Chlorine","unit":"ppm","values":[{"color":"rgb(254,240,156)","value":"0"},{"color":"rgb(230,217,201)","value":"1"},{"color":"rgb(177,146,184)","value":"3"},{"color":"rgb(150,103,159)","value":"5"},{"color":"rgb(119,62,129)","value":"10"}]},{"id":"4","name":"pH","unit":"ppm","values":[{"color":"rgb(211,145,75)","value":"6.2"},{"color":"rgb(236,119,62)","value":"6.8"},{"color":"rgb(208,85,42)","value":"7.2"},{"color":"rgb(206,82,74)","value":"7.8"},{"color":"rgb(214,50,71)","value":"8.4"}]},{"id":"5","name":"Total Alkalinity","unit":"ppm","values":[{"color":"rgb(210,158,74)","value":"0"},{"color":"rgb(159,150,79)","value":"40"},{"color":"rgb(104,129,111)","value":"120"},{"color":"rgb(54,112,103)","value":"180"},{"color":"rgb(53,106,115)","value":"240"}]},{"id":"6","name":"Cyanuric Acid","unit":"ppm","values":[{"color":"rgb(197,137,68)","value":"0"},{"color":"rgb(191,104,46)","value":"50"},{"color":"rgb(175,69,77)","value":"100"},{"color":"rgb(144,39,92)","value":"150"},{"color":"rgb(132,46,119)","value":"300"}]}]
    }
  }

  /***verifing data */
  static propTypes = {
    stripsFetchRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchChemicalData: PropTypes.object,

  }

  /****strip fetch data */
  componentDidUpdate(prevProps) {
    if (prevProps && this.props.stripsFetchData != this.props.stripsFetchData) {
      console.log("this.props.stripsData", this.props.stripsFetchData)
    }
  }

  /***calling api  */

  componentDidMount(){
    this.props.stripsFetchRequest()
  }


  /**change input field value */
  // handle input change
  handleInputChange = (e, index) => {
    let values = [...this.state.inputField.values];
     values[index] = e.target.value;
     this.setState({ values:values });
  };
  /*** */

  /***render color plate value */
    colorPlateFun=(data)=>{
      let styleValue=30
      return data.map((value,index)=>{
        return(
          <>
          <View style={{ marginLeft: 10, position: 'relative', marginTop: 10, width: '19%', height: 40, marginLeft: 5, backgroundColor: value.color }}>
            </View>
        <Text style={{ top: 60, position: 'absolute', left: index==0?styleValue:styleValue+=70}}>{value.value}</Text>
          </>  
        );
      })
    }
  /*** */

  /***render chemical data */
  renderChemicaldata = (item) => {
    return item.map((data,index) => {
      return (
        <>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ alignItems: 'flex-start', marginTop: 10, width: '80%' }}>
              <Text style={{ fontSize: 18, fontWeight: '900' }}>{data.name}({data.unit})</Text>
            </View>
            <View style={{ width: '20%', paddingRight: 20 }}>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  width: 80,
                  borderRadius: 10
                }}
                name="value"
                placeholder='0'
                keyboardType="number-pad"
                value={this.state.inputField.values[index]}
                underlineColorAndroid='transparent'
                onChange={e => this.handleInputChange(e, index)}
              />
            </View>
          </View>
          <View key={index} style={{ flexDirection: 'row', width: '100%', marginBottom: 30 }}>
            {this.colorPlateFun(data.values)}
          </View>
        </>
      );
    });
  };
  /*** */
  render() {
    const { stripData } = this.props;
    const stripDataValue=this.props.stripData?this.props.stripData.response:null
    console.log("stripDataValue",stripDataValue)
    return (
      <>
        <StripHeader />
        <View style={styles.container} >
          <View style={{ flexDirection: 'column', borderWidth: 1, margin: 5, padding: 0 }}>
            <View style={{ marginTop: 40, width: 50, height: 40, backgroundColor: 'red' }}>
            </View>
          </View>
          <View style={{ flexDirection: 'column', width: '80%' }}>
            {this.renderChemicaldata(this.state.chemicalData)}
          </View>
        </View>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.fetchChemical.loading,
  fetchChemicalData: state.fetchChemical.fetchChemicalData
})

const mapDispatchToProps = {
  stripsFetchRequest
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 50,
  },
  colorPlate: {
    flexDirection: 'row',
  }

});
const StripData = connect(mapStateToProps, mapDispatchToProps)(index)
export default StripData;
