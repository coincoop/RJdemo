/* eslint no-use-before-define: 0 */

import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class adminAPI {
    handleAdmin = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete' 
    )=>{
        const token = localStorage.getItem('auth') 
        ? JSON.parse(localStorage.getItem('auth')!).accessToken 
        : null;
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/admin${url}`,
             method: method ?? 'get',
             data,
             headers: {
                Authorization: `Bearer ${token}`,
            },
         })
    }
    
}

const adminsAPI = new adminAPI()

export default adminsAPI