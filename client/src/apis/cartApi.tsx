/* eslint no-use-before-define: 0 */

import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class cartAPI {
    handleCart = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/cart${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const cartsAPI = new cartAPI()

export default cartsAPI