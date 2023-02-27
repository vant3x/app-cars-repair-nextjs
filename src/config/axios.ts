import axios from 'axios';

const axiosClient = axios.create({
    baseURL:  process.env.apiURL,
    withCredentials:false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    }
  
});

axiosClient.interceptors.request.use(function (response) {
    return response;

}, function (error) {
    return Promise.reject(error);

})

/*axiosClient.interceptors.response.use(function (response) { 
    return response;
}
    , function (error) { 
        console.log(error)      
        return error;
    }
);
*/
export default axiosClient; 