import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here

    const timeStamp = new Date();
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: timeStamp,
      updatedAt: timeStamp,
      secret: secret,
    };

    const url = "https://gallery-app-server.vercel.app/photos/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        if (data.hasOwnProperty("error")) {
          setError(data.error);
        } else {
          navigate("/photos");
        }
      });
  };

  return (
    <>
      <div className="container">
        {error && <div className="error-msg">{error}</div>}
        <form className="add-form" onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            data-testid="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
