import React, { useState } from "react";
import Button from "../../../Component/Button";
import "./MainHeader.css";
import { BiArrowBack, BiHomeAlt } from "react-icons/bi";
import ModalComp from "../../../Component/ModalComp";

const MainHeader = ({ path, goBack, goHome, addDir, addfile, undo, undoLabel, undoFn }) => {
  const [modal, setModal] = useState(false);
  const [folder, setFolder] = useState("");
  const [file, setFile] = useState("");
  const [data,setData]=useState("")
  const [fileModal, setfileModal] = useState(false);

  const AddFolderHandler = () => {
    if (folder) {
      
      addDir(folder);
      setFolder();
      setModal(false);
    } else {
      alert("Please enter a valid folder name");
    }
  };

  const AddFileHandler = () => {
    console.log(data)
    if (file) {
      addfile(file,data);
      setFile();
      setData()
      setfileModal(false);
    } else {
      alert("Please enter a valid file name");
    }
  };

  const clear = () => {
    setFolder();
    setModal(false);
    setFile();
    setfileModal(false);
    setData()
  };

  const modalAddFolder = (
    <div className="d-flex flex-column">
      <p>Enter Folder Name</p>
      <input
        value={folder}
        onChange={(e) => {
          setFolder(e.target.value);
        }}
        className="mt-3 mb-3"
        type="text"
      ></input>
      <div className="d-flex flex-row  align-items-center">
        <Button onClick={AddFolderHandler} title={"OK"} />
        <Button onClick={clear} title={"CANCEL"} />
      </div>
    </div>
  );
  const modalAddFile = (
    <div className="d-flex flex-column">
      <p>Enter File Name</p>
      <input
        value={file}
        onChange={(e) => {
          setFile(e.target.value);
        }}
        className="mt-3 mb-3"
        type="text"
      ></input>
      <p>Enter text</p>
      <textarea type="text" value={data} onChange={(e)=>{setData(e.target.value)}} />
      <div className="d-flex flex-row align-items-center mt-3">
        <Button onClick={AddFileHandler} title={"OK"} />
        <Button onClick={clear} title={"CANCEL"} />
      </div>
    </div>
  );
  return (
    <>
      <div className="container-fluid">
        <div className="row mainHeader d-flex flex-column flex-md-row flex-sm-column justify-content-md-between justify-content-sm-center justify-content-center align-items-center">
          <div className="d-flex flex-row align-items-center">
            <BiArrowBack
              onClick={() => {
                goBack();
              }}
              className="mr-3 cursorPointer"
            />
            <BiHomeAlt
              onClick={() => {
                goHome();
              }}
              className="mr-3 cursorPointer"
            />
            <p>Current Path : {path}</p>
          </div>
          <div className=" d-flex flex-row justify-content-between mt-2">
            {undo==0?null:<Button  onClick={undoFn} title={undoLabel} />}
            <Button
              onClick={() => {
                setfileModal(true);
              }}
              title={"Add File"}
            />
            <Button
              onClick={() => {
                setModal(true);
              }}
              title={"Add Folder"}
            />
          </div>
        </div>
      </div>
      <ModalComp content={modalAddFolder} modalIsOpen={modal} />
      <ModalComp content={modalAddFile} modalIsOpen={fileModal} />
    </>
  );
};

export default MainHeader;
