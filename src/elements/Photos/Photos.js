import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./Photos.scss";

export default function Photos(props) {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    async function transformReferences() {
      try {
        if (props.photos?.length > 0) {
          let { data } = await API.addUrls(props.photos);
          setPhotos(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    transformReferences();
  }, [props.photos]);
  return (
    <div className="Photos">
      <h4>Photos:</h4>
      {photos?.length > 0
        ? photos.map((photo) => (
            <img
              className="GooglePhotos"
              key={photo.html_attributions}
              src={photo.photo_url}
              alt="Coffee Shop"
            />
          ))
        : null}
    </div>
  );
}
