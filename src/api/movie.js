import client from "./clint"

export const uploadTrailer = async (formData, onUploadProgress)=>{
    const token = localStorage.getItem('auth-token')
    try{
        const {data} = await client.post('/movie/upload-trailer',formData,{
            headers:{
                authorization: 'Bearer ' + token,
                'content-type':'multipart/form-data'
            },
            onUploadProgress:({loaded,total})=>{
                if(onUploadProgress) onUploadProgress(Math.floor((loaded/total)*100));
            },
        });
        return data;
    }catch(error){
        console.log(error.response.data)
        const { response } = error
        if(response?.data) return response.data

        return {error:error.message || error}       
    }
}