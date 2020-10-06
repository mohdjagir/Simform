import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native'

import { Icon, View } from 'native-base';
import { StripHeader } from '../../Components/Header/index';
import { stripsFetchRequest } from '../../Actions/index';
import { connect } from 'react-redux';
import PropTypes, { element } from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import {TouchableOpacity } from 'react-native-gesture-handler';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: [],
      chemicalData: []
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
    if (prevProps.fetchChemicalData !==this.props.fetchChemicalData && this.props.fetchChemicalData) {
      console.log("this.props.stripsData", this.props.fetchChemicalData)
      let dynamicInputFieldData=[]
      console.log("this.props.fetchChemicalData.response.chemical.length",this.props.fetchChemicalData.response.chemical.length)
      if(this.props.fetchChemicalData.response){
        for (i=0; i<this.props.fetchChemicalData.response.chemical.length; i++){
          dynamicInputFieldData.push({id:this.props.fetchChemicalData.response.chemical[i].id,value:this.props.fetchChemicalData.response.chemical[i].values[0].value,color:this.props.fetchChemicalData.response.chemical[i].values[0].color})
      }
        console.log("dynamicInputFieldData",dynamicInputFieldData)
        this.setState({inputField:dynamicInputFieldData,chemicalData:this.props.fetchChemicalData.response.chemical})
      }

    }
  }

  /***calling api  */

  componentDidMount() {
    this.props.stripsFetchRequest()
  }


  /**change input field value */
  // handle input change
  handleInputChange = (valueData, id) => {
    console.log("id====",id)
    let data = [...this.state.inputField];
    let findDataIndex=data.findIndex((data)=>data.id==id)
    console.log("findDataIndex",findDataIndex)
    if(findDataIndex!=-1){
        data[findDataIndex].value=valueData
    }
    this.setState({ inputField: data })
  };
  /*** */

  onColorPress = (id, value,color) => {
    console.log("index", index)
    console.log("value", value)
    let data = [...this.state.inputField];
    let findData = data.findIndex((obj) => obj.id == id)
    console.log("findData", findData)
    if (findData != -1) {
      data[findData].value = value
      data[findData].color = color
    } 
    this.setState({ inputField: data })
  }

  /***render color plate value */
  colorPlateFun = (id, data) => {
    let styleValue = 30
    return data.map((value, index) => {
      return (
        <>
          <TouchableOpacity style={{ marginLeft: 10, width: 63, position: 'relative', marginTop: 10, height: 40, marginLeft: 5, backgroundColor: value.color }} onPress={() => this.onColorPress(id, value.value,value.color)}>
          </TouchableOpacity>
          <Text style={{ top: 60, position: 'absolute', left: index == 0 ? styleValue : styleValue += 70 }}>{value.value}</Text>
        </>
      );
    })
  }
  /*** */

  /***render chemical data */
  renderChemicaldata = (item) => {
    console.log("data.length", item.length)
    return item.map((data, index) => {
      console.log("index====", data)
      console.log("index=index==index=", index)
      return (
        <View key={index} style={{ flex:1, width: '100%' }}>
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
                keyboardType="number-pad"
                value={this.state.inputField.length > 0 && this.state.inputField[index].id == data.id ? this.state.inputField[index].value : '0'}
                underlineColorAndroid='transparent'
                onChangeText={value => this.handleInputChange(value, data.id)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 30 }}>
            {this.colorPlateFun(data.id, data.values)}
          </View>
        </View>
      );
    });
  };
  /*** */

  /***left side color */
    leftSideColor=(data)=>{
        return data.map((data,index)=>{
            return(
              <View style={{ marginTop: index==0?42:81,width: 50, height: 40, backgroundColor: data.color }}>
              </View>
             )           
        })
    }

  /*** end left side color */

  /***click to show selected value */
  clickOnNextFunc=()=>{
    alert(JSON.stringify(this.state.inputField))
  }

  /*** */

  render() {
    const selectedDataColor=this.state.inputField
    let stripData;
    if (this.props.fetchChemicalData) {
      console.log("this.props.data", this.props.fetchChemicalData)
      stripData = this.props.fetchChemicalData.response.chemical
    }
    return (
      <>
        <StripHeader clickOnNext={()=>this.clickOnNextFunc()}/>
        <ScrollView>
        <View style={styles.container} >
          <View style={{ flexDirection: 'column', borderWidth: 1, margin: 5, padding: 0 }}>
            {this.leftSideColor(selectedDataColor)}
          </View>
          <View style={{ flexDirection: 'column', width: '80%' }}>
            {stripData ? this.renderChemicaldata(stripData) : null}
          </View>
          <Spinner cancelable={true} visible={this.props.loading} color={"rgb(45,91,142)"} textContent={"Loading.."} />
        </View>
        </ScrollView>
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
