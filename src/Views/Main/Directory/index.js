import React, { useState } from "react";
import "./Directory.css";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileText,
  AiFillFolder,
} from "react-icons/ai";
import { DIR_TYPE, FILE_TYPE } from "../../../Global/Types";
import Button from "../../../Component/Button";
import ModalComp from "../../../Component/ModalComp";

const Directory = ({ data,changePath,path,delDir,delFile }) => {
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [dataView,setDataView]=useState("")
  const [viewHeader,setViewHeader]=useState("")
  const clear=()=>{
    setModalIsOpen(false)
    setDataView("")
    setViewHeader("")
  }
  const viewModal = (
    <div className="d-flex flex-column">
      <p>{viewHeader}</p>
      <textarea
      disabled
        value={dataView}
        className="mt-3 mb-3"
        type="text"
      ></textarea>
      <div className="d-flex flex-row  align-items-center">
        {/* <Button onClick={AddFolderHandler} title={"OK"} /> */}
        <Button onClick={clear} title={"CLOSE"} />
      </div>
    </div>
  );
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="directoryHolder">
          {data.map((ele,ind) => {
            if (ele.type === FILE_TYPE) {
              return (
                <div key={ind} className="d-flex flex-row justify-content-between mt-3">
                  <div onDoubleClick={()=>{
                    setModalIsOpen(true)
                    setDataView(ele.data)
                    setViewHeader(ele.fileName)
                  }} className="d-flex flex-row align-items-center cursorPointer">
                    <AiFillFileText size={20} />
                    <p className="ml-2">{ele.fileName}</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <AiFillDelete className="cursorPointer" onClick={()=>{delFile(ele.fileName)}} size={20} />
                  </div>
                </div>
              );
            }
            if (ele.type === DIR_TYPE) {
              return (
                <div key={ind} className="d-flex flex-row justify-content-between mt-3">
                  <div onDoubleClick={()=>{changePath(`${path}${ele.dirName}/`)}} className="d-flex flex-row align-items-center cursorPointer">
                    <AiFillFolder size={20} />
                    <p className="ml-2">{ele.dirName}</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <AiFillDelete className="cursorPointer" onClick={()=>{delDir(ele.dirName)}} size={20} />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
    <ModalComp content={viewModal} modalIsOpen={modalIsOpen} />
    </>
  );
};

export default Directory;
