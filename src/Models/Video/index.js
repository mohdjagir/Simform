import * as Constant from '../../Utils/Constant/index';
import { callApi } from '../../Services/index'

export default class VideoModel {
   static getVideoList(requestBody=null) {
      return callApi(Constant.METHOD_TYPE_GET, Constant.API_FETCH_VIDEO_LIST, requestBody)
   }
}