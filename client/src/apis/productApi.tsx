import { appInfo } from "@/constants/appInfos"
import axiosCilent from "@/apis/axiosCilent"

class productAPI {
    handleCar = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent({
             url: `${appInfo.BASE_URL}/product${url}`,
             method: method ?? 'get',
             data,
         })
    }
    
}

const productsAPI = new productAPI()

export default productsAPI