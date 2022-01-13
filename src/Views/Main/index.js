import React, { useEffect, useState } from 'react'
import Directory from './Directory'
import MainHeader from './MainHeader'
import * as Calls from '../../Global/utils'

const Main = (props) =>{
    const [path,setPath] = useState('/')
    const [data,setData] = useState([])
    const getAllData=async()=>{
        try {
            let allData=await Calls.getall(path)
            setData([...allData.data])
        } catch (error) {
            alert(error.message)
        }
    }

    const goBack=()=>{
        let paths=path.split('/').filter((ele)=>{if(ele){
            return ele
        }})
        let toBeRemoved=`${paths[paths.length-1]}/`
        let newPath=path.replace(toBeRemoved,'')
        setPath(newPath)
    }

    const goHome=()=>{
        setPath('/')
    }

    const changePath=(path)=>{
        setPath(path)
    }

    const addDir=async(dirName)=>{
        try {
            let add=await Calls.createDir(path,dirName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const addfile=async(fileName)=>{
        try {
            let add=await Calls.createFile(path,fileName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delDir = async(dirName) =>{
        try {
            let del=await Calls.deleteDir(path,dirName)
            alert("Directory deleted")
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delFile = async(fileName) =>{
        try {
            let del=await Calls.deleteFile(path,fileName)
            alert("File deleted")
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(()=>{
        getAllData()
    },[path])    
    
    return (
        <>
        <MainHeader addfile={(fileName)=>{addfile(fileName)}} addDir={(dirName)=>{addDir(dirName)}} goHome={()=>{goHome()}} goBack={()=>{goBack()}} path={path}></MainHeader>
        <Directory delFile={(fileName)=>delFile(fileName)} delDir={(dirName)=>delDir(dirName)} path={path} changePath={(path)=>{changePath(path)}} data={data}></Directory>
        </>
    )
}

export default Main