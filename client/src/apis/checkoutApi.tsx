/* eslint no-use-before-define: 0 */

import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class checkoutAPI {
    handleCheckout = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/invoice${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const checkoutsAPI = new checkoutAPI()

export default checkoutsAPI