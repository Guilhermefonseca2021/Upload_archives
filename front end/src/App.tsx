import "./App.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState<File | undefined>(undefined);

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e?.target?.files?.[0];
    setFile(selectedFile);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (file) {
      console.log("Selected File:", file);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost3333/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("No file selected.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleUpload} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
