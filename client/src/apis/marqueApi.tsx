import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class marqueAPI {
    handleMarque = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/marque${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const marquesAPI = new marqueAPI()

export default marquesAPI