import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfPreview from "../pdfpreview/PdfPreview";
import "./Dashboards.css";
import { useNavigate } from "react-router-dom";

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
  const [uploaded_file, setUploaded_file] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("token");
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

  console.log(userdata);
  console.log(shareddata);

  const files1 = userdata?.map((item) => {
    return <li>{item.uploaded_by_email}</li>;
  });
  const files2 = shareddata?.map((item) => {
    return <li>{item.uploaded_by_email}</li>;
  });

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h1>Your Files</h1>
        <ul>{files1}</ul>
      </div>
      <div>
        <h1>Shared Files</h1>
        <ul>{files2}</ul>
      </div>
      {!isLoading && <PdfPreview file_data={userdata[2]?.uploaded_file} />}
    </div>
  );
}
