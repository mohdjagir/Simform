import * as Constant from '../../Utils/Constant/index';
import { callApi } from '../../Services/index'

export default class userLoginModel {
   static userLoginRequest(requestBody) {
      return callApi(Constant.METHOD_TYPE_POST, Constant.API_USER_LOGIN, requestBody)
   }
}