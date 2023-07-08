import React, { useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  useEffect(() => {
    (async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4ODIwNTA2LCJpYXQiOjE2ODg4MTY5MDYsImp0aSI6IjNlMWY4OTRjNTcxZTQ4NWE5OTRmN2ZlZGUyZTNhNTYxIiwidXNlcl9pZCI6Mn0._HR5RvapecYeYKVBkjVm9g2epKYEJkXKq-1yVO9HQoY";
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

      console.log({ user_files: user_files.data });
      console.log({ shared_files: shared_files.data });
    })();
  }, []);
  return (
    <>
      <div>
        <h1>Your Files</h1>
      </div>
      <div>
        <h1>Shared Files</h1>
      </div>
    </>
  );
}
