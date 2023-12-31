import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginStateAtom } from "../../context/loginState";
import LogoutButton from "./LogoutButton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { filedatastate } from "../../context/filedataState";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Header() {
  const navigate = useNavigate();
  const [shareWithEmail, setShareWithEmail] = useState("");
  const location = useLocation();
  const { file_id } = useRecoilValue(filedatastate);
  const [formdata, setFormdata] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [active, setActive] = useState(false);
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const token = sessionStorage.getItem("token");
  const logoutHandler = (val) => {
    setActive(false);
    sessionStorage.clear();
    navigate("/");
  };
  const [isModalVisible, setIsModalVisible] = useState();
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {}, [isLoading]);

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   setFormdata(formData);
  // };

  const handleUploadButton = async () => {
    try {
      const upload_file = async () => {
        return await axios.post(
          `${REACT_APP_BASE_URL}uploads/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      };

      // console.log(resp);
      // setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      formData.append("file_name", filename);
      formData.append("file_description", description);
      // setFormdata(formData);

      // console.log(formData);
      const resp = await upload_file();

      window.location.reload(false);
      // setFormdata("");
      setDescription("");
      setFilename("");
      setIsloading(true);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        const { status, data } = error.response;
        setError(`Error Uploading file (${status}): ${data.error}`);
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError(
          "An error occurred while uploading the file. Please try again."
        );
      }
    }
  };

  const handleShareButton = async () => {
    // console.log(shareWithEmail);
    const data = { share_to: shareWithEmail, file_id: file_id };
    try {
      const share_file = async () => {
        return await axios.post(
          `${REACT_APP_BASE_URL}uploads/share`,
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
      toast.success("File Shared", { position: toast.POSITION.TOP_RIGHT });
      setShareWithEmail("");
      // console.log(resp);
    } catch (error) {
      if (error.response) {
        // console.log(error.response);
        const { status, data } = error.response;
        setError(`Error sharing file (${status}): ${data.error}`);
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An error occurred while sharing the file. Please try again.");
      }
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setError("");
  };

  return (
    <header className={classes.header}>
      <h1>PDF Management and Collaboration</h1>
      <div className={classes.navlinks}>
        <div
          className={classes["menu-icon"]}
          onClick={() => {
            setActive(!active);
          }}
        >
          <FontAwesomeIcon icon={active ? faXmark : faBars} />
        </div>
        <div
          className={
            active ? classes["active-nav-container"] : classes[`nav-items`]
          }
        >
          {token && location.pathname === "/" && (
            <button
              onClick={() => {
                setActive(false);
                navigate("/signup");
              }}
              className={classes["nav-item"]}
            >
              Signup
            </button>
          )}
          {token && location.pathname === "/signup" && (
            <button
              onClick={() => {
                setActive(false);
                navigate("/");
              }}
              className={classes["nav-item"]}
            >
              Login
            </button>
          )}
          {location.pathname === "/dashboard" && (
            <button onClick={toggleModal} className={classes["nav-item"]}>
              Upload File
            </button>
          )}
          {location.pathname === "/pdfview" && (
            <button onClick={toggleModal} className={classes["nav-item"]}>
              Share File
            </button>
          )}
          {token && (
            <button onClick={logoutHandler} className={classes["nav-item"]}>
              {" "}
              Logout{" "}
            </button>
          )}
        </div>
      </div>
      {isModalVisible && location.pathname === "/dashboard" && (
        <Modal onCloseClick={toggleModal}>
          <div className={classes["modal-content"]}>
            <input
              className={classes.fileinput}
              type="text"
              onChange={(e) => {
                setFilename(e.target.value);
              }}
              placeholder="Enter File Name"
            />
            <input
              className={classes.fileinput}
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter File Description"
            />
            <input
              className={classes.fileinput}
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
            <div className={classes["modal-controllers"]}>
              <button onClick={handleUploadButton}>Upload</button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
            {error && <div className={classes.error}>{error}</div>}{" "}
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
              onChange={(e) => {
                setShareWithEmail(e.target.value);
                setError("");
              }}
            />
            <div className={classes["modal-controllers"]}>
              <button onClick={handleShareButton}>Share</button>
              <button onClick={toggleModal}>Cancel</button>
            </div>
            {error && <div className={classes.error}>{error}</div>}{" "}
          </div>
        </Modal>
      )}
      {isLoading && <div></div>}
    </header>
  );
}
