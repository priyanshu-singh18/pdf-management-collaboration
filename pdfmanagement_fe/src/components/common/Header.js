import React, { useState } from "react";
import classes from "./Header.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginStateAtom } from "../../context/loginState";
import LogoutButton from "./LogoutButton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { filedatastate } from "../../context/filedataState";

export default function Header() {
  // const [login, setLogin] = useRecoilState(loginStateAtom);
  const navigate = useNavigate();
  const [shareWithEmail, setShareWithEmail] = useState("");
  const location = useLocation();
  const { file_id } = useRecoilValue(filedatastate);
  const [formdata, setFormdata] = useState();
  // console.log(login.isLoggedIn);
  const token = sessionStorage.getItem("token");
  const logoutHandler = (val) => {
    // setLogin({ isLoggedIn: false, token: "" });
    sessionStorage.clear();
    navigate("/");
  };
  const [isModalVisible, setIsModalVisible] = useState();
  const [error, setError] = useState(null); // Add error state

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFormdata(formData);
  };

  const handleUploadButton = async () => {
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8000/uploads/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      // setIsLoading(true);
      window.location.reload(false);
    } catch (error) {
      setError("Error uploading file. Please try again."); // Set error message
    }
  };

  const handleShareButton = async () => {
    console.log(shareWithEmail);
    const data = { share_to: shareWithEmail, file_id: file_id };
    try {
      const share_file = async () => {
        return await axios.post(
          "http://127.0.0.1:8000/uploads/share",
          JSON.stringify(data),
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      };

      const resp = await share_file();
      setShareWithEmail("");
      console.log(resp);
    } catch (error) {
      setError("Error sharing file. Please try again."); // Set error message
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <header className={classes.header}>
      <h1>PDF Management and Collaboration</h1>
      <div className={classes.controller}>
        {location.pathname === "/dashboard" && (
          <button onClick={toggleModal}>Upload File</button>
        )}
        {location.pathname === "/pdfview" && (
          <button onClick={toggleModal}>Share File</button>
        )}
        {token && <LogoutButton logout={logoutHandler} />}
      </div>
      {isModalVisible && location.pathname === "/dashboard" && (
        <Modal onCloseClick={toggleModal}>
          <div className={classes["modal-content"]}>
            <input type="file" onChange={handleFileUpload} />
            <div className={classes["modal-controllers"]}>
              <button onClick={handleUploadButton}>Upload</button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
      {isModalVisible && location.pathname === "/pdfview" && (
        <Modal onCloseClick={toggleModal}>
          <div className={classes["modal-content"]}>
            <input
              type="email"
              placeholder="Enter recipient email"
              value={shareWithEmail}
              onChange={(e) => setShareWithEmail(e.target.value)}
            />
            <div className={classes["modal-controllers"]}>
              <button onClick={handleShareButton}>Share</button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
      {error && <div className={classes.error}>{error}</div>}{" "}
      {/* Display error message */}
    </header>
  );
}
