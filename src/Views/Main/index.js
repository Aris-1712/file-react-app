import React, { useEffect, useState } from 'react'
import Directory from './Directory'
import MainHeader from './MainHeader'
import * as Calls from '../../Global/utils'
import { DIR_TYPE, FILE_TYPE } from '../../Global/Types'

const Main = (props) =>{
    let undoState={
        0:"none",
        1:"UNDO",2:"REDO"
    }
    const [path,setPath] = useState('/')
    const [data,setData] = useState([])
    const [undo,setUndo] = useState(0)
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
    const addLocalStorageFile=(fileName)=>{
        setUndo(1)
        localStorage.setItem("LAST",JSON.stringify({path,fileName,type:FILE_TYPE}))
            localStorage.setItem("LAST_ACTION","UNDO")
    }
    const addLocalStorageFolder=(dirName)=>{
        setUndo(1)
        localStorage.setItem("LAST",JSON.stringify({path,dirName,type:DIR_TYPE}))
            localStorage.setItem("LAST_ACTION","UNDO")
    }
    const addDir=async(dirName)=>{
        try {
            let add=await Calls.createDir(path,dirName)
            addLocalStorageFolder(dirName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const addfile=async(fileName)=>{
        try {
            let add=await Calls.createFile(path,fileName)
            addLocalStorageFile(fileName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delDir = async(dirName) =>{
        try {
            let del=await Calls.deleteDir(path,dirName)
            alert("Directory deleted")
            addLocalStorageFolder(dirName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const delFile = async(fileName) =>{
        try {
            let del=await Calls.deleteFile(path,fileName)
            alert("File deleted")
            addLocalStorageFile(fileName)
            getAllData()
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const undoFn = async()=>{
        try {
            let data=JSON.parse(localStorage.getItem("LAST"))
            if(data.type===FILE_TYPE){
                let res=await Calls.switchFile(data.path,data.fileName)
                alert("changes applied")
                getAllData()
            }
            if(data.type===DIR_TYPE){
                let res=await Calls.switchDir(data.path,data.dirName)
                alert("changes applied")
                getAllData()
            }
            if(localStorage.getItem("LAST_ACTION")==="UNDO"){
                setUndo(2)
                localStorage.setItem("LAST_ACTION","REDO")
                return
            }
            if(localStorage.getItem("LAST_ACTION")==="REDO"){
                setUndo(1)
                localStorage.setItem("LAST_ACTION","UNDO")
                return
            }
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    useEffect(()=>{
        getAllData()
    },[path])    
    
    return (
        <>
        <MainHeader undoFn={()=>{undoFn()}} undoLabel={undoState[undo]} undo={undo} addfile={(fileName)=>{addfile(fileName)}} addDir={(dirName)=>{addDir(dirName)}} goHome={()=>{goHome()}} goBack={()=>{goBack()}} path={path}></MainHeader>
        <Directory delFile={(fileName)=>delFile(fileName)} delDir={(dirName)=>delDir(dirName)} path={path} changePath={(path)=>{changePath(path)}} data={data}></Directory>
        </>
    )
}

export default Main