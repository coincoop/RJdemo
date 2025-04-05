import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class AuthAPI {
    handleAuthentitation = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/auth${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const authenticationAPI = new AuthAPI()

export default authenticationAPI