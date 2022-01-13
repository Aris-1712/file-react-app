import React from "react";
import "./Directory.css";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileText,
  AiFillFolder,
} from "react-icons/ai";
import { DIR_TYPE, FILE_TYPE } from "../../../Global/Types";

const Directory = ({ data,changePath,path,delDir,delFile }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="directoryHolder">
          {data.map((ele,ind) => {
            if (ele.type === FILE_TYPE) {
              return (
                <div key={ind} className="d-flex flex-row justify-content-between mt-3">
                  <div className="d-flex flex-row align-items-center cursorPointer">
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
  );
};

export default Directory;
