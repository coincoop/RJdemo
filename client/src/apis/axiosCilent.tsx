import axios from 'axios'
import queryString from 'query-string'

const axiosCilent = axios.create({
    paramsSerializer: params=> queryString.stringify(params),
});

axiosCilent.interceptors.request.use(async (config: any)=>{
    config.headers={
        Authorization: '',
        Accept: 'application/json',
        ...config.headers, 
    },
    config.data;

    return config
})

axiosCilent.interceptors.response.use(res => {
    if (res.status === 200) {
        return res; // Return the entire response object
    }
    throw new Error('Error');
}, error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw error.response || new Error('Unknown error');
});

export default axiosCilent