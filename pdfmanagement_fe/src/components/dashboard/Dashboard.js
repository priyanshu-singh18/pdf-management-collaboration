import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfPreview from "../pdfpreview/PdfPreview";
import "./Dashboards.css";
import { Route, useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import PdfViewPage from "./PdfViewPage";
import { useSetRecoilState } from "recoil";
import { filedatastate } from "../../context/filedataState";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default function Dashboard() {
  const [userdata, setUserdata] = useState([]);
  const [shareddata, setShareddata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setFileData = useSetRecoilState(filedatastate);

  const [formdata, setFormdata] = useState();

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/");
        return;
      }

      const { exp } = parseJwt(token);
      if (Date.now() >= exp * 1000) {
        console.log(false);
      } else {
        console.log(true);
      }
      // console.log(exp);

      const user_files = await axios.get(
        "http://127.0.0.1:8000/uploads/fetch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const shared_files = await axios.get(
        "http://127.0.0.1:8000/uploads/shared",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserdata(user_files.data);
      setShareddata(shared_files.data);
      // console.log({ user_files: user_files.data });
      // console.log({ shared_files: shared_files.data });
      setIsLoading(false);
    })();
  }, []);

  const handleItemClick = (val) => {
    const temp = userdata?.filter((item) => item.file_id == val);
    console.log(temp[0]);
    setFileData(temp[0].uploaded_file);
    navigate("/pdfview");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    setFormdata(formData);
  };

  const handleUploadButton = async () => {
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
    // console.log(resp);
    window.location.reload(false);
  };

  // console.log(userdata);
  // console.log(shareddata);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const files1 =
    userdata.length > 0 ? (
      userdata?.map((item, index) => {
        return (
          <ListItem
            key={item.file_id}
            serial={index + 1}
            name={`File ${index + 1}`}
            uploaded_by={item.uploaded_by_email}
            uploaded_at={item.uploaded_at}
            clickedItem={handleItemClick}
            file_id={item.file_id}
          />
        );
      })
    ) : (
      <p>Upload Files First</p>
    );
  const files2 =
    shareddata.length > 0 ? (
      shareddata?.map((item, index) => {
        return (
          <ListItem
            key={item.item_id}
            serial={index + 1}
            name={`File ${index + 1}`}
            uploaded_by={item.uploaded_by_email}
            uploaded_at={item.uploaded_at}
            file_id={item.file_id}
            clickedItem={handleItemClick}
          />
        );
      })
    ) : (
      <p>You Dont have Shared Files</p>
    );

  return (
    <>
      <div className="container">
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
        <button onClick={handleUploadButton} className="logout-button">
          Upload
        </button>
        <div className="files-container">
          <h1>Your Files</h1>
          <ul className="file-list">{files1}</ul>
        </div>
        <div className="files-container">
          <h1>Shared Files</h1>
          <ul className="file-list">{files2}</ul>
        </div>
        {/* {isView && <PdfPreview file_data={userdata[2]?.uploaded_file} />} */}
      </div>
    </>
  );
}
