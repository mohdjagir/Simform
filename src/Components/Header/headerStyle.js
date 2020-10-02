import { StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../Utils/Dimensions'
 const styles = {
    container: { flexDirection:'row'},
    stripHeader:{flexDirection:'row', height:60,backgroundColor:'rgb(45,91,142)',marginTop:0},
    childContainer1:{ alignItems: 'flex-start',width:'50%',paddingLeft:scale(15),marginTop:verticalScale(-10),marginTop:verticalScale(8)},
    childContainer2:{ alignItems: 'flex-end',width:'50%', paddingRight:scale(15),marginTop:verticalScale(-10),marginTop:verticalScale(8)},
    title:{fontSize:14,textAlign:'left'},
    heading:{fontSize:24,fontWeight:'600',textAlign:'left'}
}
export default styles;
export const iconStyle = {
    marginLeft: scale(10),
}