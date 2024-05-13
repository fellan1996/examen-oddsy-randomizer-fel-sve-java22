import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { CanvasPreview } from "./CanvasPreview";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { IconButton } from "@mui/material";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 180,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropper({ handleUpload }) {
  const [imgSrc, setImgSrc] = useState("");
  const [name, setName] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const inputRef = React.useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  function handleFileSelect(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      const file = e.target.files[0];
      reader.readAsDataURL(file);
      setName(file.name);
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      previewCanvasRef.current
    ) {
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      CanvasPreview(imgRef.current, canvas, completedCrop);
      // Get the cropped image data from the canvas
      canvas.toBlob((blob) => {
        // Create a File object from the Blob object
        if (blob) {
          const file = new File([blob], name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          setCroppedImageFile(file);
        }
      }, "image/jpeg");
    } else {
      setCroppedImageFile(null);
    }
  }, [completedCrop]);

  function uploadCroppedImage() {
    if (!croppedImageFile) return;
    // Here you can upload the cropped image file to your cloud storage
    console.log("Uploading cropped image:", croppedImageFile);
    const storage = getStorage();
    const imageRef = ref(storage, `images/${croppedImageFile.name}`);
    try {
      uploadBytes(imageRef, croppedImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          handleUpload(url);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleFileSelect}
          />
        <IconButton onClick={handleButtonClick}>
          <InputLabel sx={{pointerEvents: "none"}}> Picture: </InputLabel>
          
          <AddPhotoAlternateOutlinedIcon />
        </IconButton>
      </div>
      {/* <input type="file" accept="image/*" onChange={handleFileSelect} /> */}
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          circularCrop
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          locked={true}
        >
          <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <Stack direction="row" gap={2}>
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              borderRadius: "100%",
              width: 180,
              height: 180,
            }}
          />
          <Box display="flex" alignItems="center">
            <Button onClick={uploadCroppedImage} variant="outlined">
              Upload
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
}
