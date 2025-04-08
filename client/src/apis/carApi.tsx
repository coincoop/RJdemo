import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class carAPI {
    handleCar = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/car${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const carsAPI = new carAPI()

export default carsAPI