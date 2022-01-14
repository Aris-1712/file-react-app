import * as API from './Endpoint'
import Axios from 'axios'

export const getall=async(path)=>{
    let result=await Axios.post(`${API.Endpoint}/getall`,{path})
    return result.data
}

export const createDir=async(path,dirName)=>{
    let result=await Axios.post(`${API.Endpoint}/addDir`,{path,dirName})
    return result.data
}

export const createFile=async(path,fileName,data)=>{
    let result=await Axios.post(`${API.Endpoint}/addfile`,{path,fileName,data})
    return result.data
}

export const deleteDir=async(path,dirName)=>{
    let result=await Axios.post(`${API.Endpoint}/delDir`,{path,dirName})
    return result.data
}

export const deleteFile=async(path,fileName)=>{
    let result=await Axios.post(`${API.Endpoint}/delFile`,{path,fileName})
    return result.data
}

export const switchFile=async(path,fileName)=>{
    let result=await Axios.post(`${API.Endpoint}/switchFile`,{path,fileName})
    return result.data
}
export const switchDir=async(path,dirName)=>{
    let result=await Axios.post(`${API.Endpoint}/switchDir`,{path,dirName})
    return result.data
}