import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  list,
  getDownloadURL,
} from "@firebase/storage";
import "./App.css";
import { app } from './firebase.js';

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const storage = getStorage(app);


  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setFilename(file.name);
    setFile(file);
  };

  const uploadPhoto = () => {
    const filenameRef = new Date().getTime() + "-" + filename;
    const storageRef = ref(
      storage,
      `quail_firebase_upload_tutorial/images/${filenameRef}`
    );
    
    if (file) {
      uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded an image!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    } else {
      alert("Please select a file to upload!");
    }
  };
  return (
    <div className="App">
      <h1>Choose a picture:</h1>
      <br />
      <input type="file"  accept="image/png, image/jpeg, image/heic, image/jpg" onChange={handlePictureChange} />
      <br />
      <button onClick={() => uploadPhoto()}> Upload photo </button>
    </div>
  );
}

export default App;
