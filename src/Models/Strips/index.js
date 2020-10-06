import * as Constant from '../../Utils/Constant/index';
import { callApi } from '../../Services/index'


export default class ChemicalModel {
   static getChemicalList(requestBody=null) {
      return callApi(Constant.METHOD_TYPE_GET, Constant.API_FETCH_STRIPS_LIST, requestBody)
   }
}