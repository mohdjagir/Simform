import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  BackHandler,
  Share,
  PermissionsAndroid
} from 'react-native';
import { Button, Icon, List, ListItem } from 'native-base';
import styles from './dashboardStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardHeader } from '../../Components/Header';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { videoFetchRequest } from '../../Actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import showToast from '../../Utils/Toast/index'
import PropTypes from 'prop-types';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
      filePath: {},
      data: [
        { id: 1, title: "Lorem ipsum dolor", time: "2018-08-01 12:15 pm", image: "https://img.icons8.com/color/96/3498db/calendar.png", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean  ligula..." },
        { id: 2, title: "Sit amet, consectetuer", time: "2018-08-12 12:00 pm", image: "https://img.icons8.com/color/96/3498db/calendar.png", description: "Lorem  dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..." },
        { id: 3, title: "Dipiscing elit. Aenean ", time: "2017-08-05 12:21 pm", image: "https://img.icons8.com/color/96/3498db/calendar.png", description: "Lorem ipsum dolor sit , consectetuer  elit. Aenean commodo ligula..." },

      ],
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      active: false,
      modalVisible: false,
      paused: true,
      fullScreen: true,
    };
  }


  /***verifing data */
  static propTypes = {
    videoFetchRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    videoData: PropTypes.object,

  }
  /***video components */
  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <ListItem>
        <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
          <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>
            {rate}x
            </Text>
        </TouchableOpacity>
      </ListItem>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => {
        this.setState({ resizeMode: resizeMode })
      }}>
        <Text style={[styles.controlOption, {
          fontWeight: isSelected ? "bold" :
            "normal"
        }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  fullScreen = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscape();
      }
    });

  }

  backAction = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        Orientation.lockToPortrait();
      }
    });
  };

  componentDidMount() {
    this.props.videoFetchRequest()
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  /**** */

  /***share video on long press */
  onPressShareVideo = (videourl) => {
    Share.share({
      message: videourl,
    })
      //after successful share return result
      .then(result => console.log(result))
      //If any thing goes wrong it comes here
      .catch(errorMsg => console.log(errorMsg));
  }
  /*** */

  /****video fetch data */
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate====d",prevProps)
    if (prevProps && this.props.videoData != this.props.videoData) {
      console.log("this.props.videoData", this.props.videoData)
    }
  }

  /*** */

  /***select picture from camera or gallery */
  chooseFile = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'We need your permission'
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      var options = {
        title: 'Select Image',
        customButtons: [
          { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          let source = response;
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            filePath: source,
          });
        }
      });
    }
  };

  renderVideoData = (item) => {
    return (
      <>
        <Video source={{ uri: item.video_url }}
          style={styles.cardImage}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode={this.state.resizeMode}
          onLoad={this.onLoad}
          poster={item.thumbnail_url}
          onProgress={this.onProgress}
          posterResizeMode={'cover'}
          onEnd={() => { alert('Done!') }}
          controls
          repeat={true} />
        <View style={[{ left: 0 }, styles.rateControl]}>
          <Button
            transparent
            onPress={() => {
              this.fullScreen();
            }}
          >
            <Icon type="FontAwesome5" name="compress" style={{
              color: "#fff",
              fontSize: 15
            }} />
          </Button>
        </View>
      </>
    )
  }

  render() {
    const { filePath } = this.state
    const imagePath = 'data:image/jpeg;base64,' + filePath.data
    return (
      <SafeAreaView style={styles.container}>
        <DashboardHeader chooseFiles={() => this.chooseFile()} imagePaths={imagePath} />
        <FlatList style={styles.list}
          data={this.props.videoData ? this.props.videoData.response.videos : null}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <TouchableOpacity onLongPress={() => this.onPressShareVideo(item.video_url)} style={styles.card}>
                {this.renderVideoData(item)}

                <TouchableOpacity style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }} />
        <Spinner cancelable={true} visible={this.props.loading} color={"rgb(45,91,142)"} textContent={"Loading.."} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.fetchVideo.loading,
  videoData: state.fetchVideo.videoData
})

const mapDispatchToProps = {
  videoFetchRequest
}
const Dashboard = connect(mapStateToProps, mapDispatchToProps)(index)
export default Dashboard;
