import React, { useState, useEffect, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import { CanvasPreview } from './CanvasPreview';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: 140,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState('');
  const [name, setName] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [croppedImageFile, setCroppedImageFile] = useState(null);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
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
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      CanvasPreview(imgRef.current, canvas, completedCrop);
      // Get the cropped image data from the canvas
      canvas.toBlob((blob) => {
        // Create a File object from the Blob object
        if (blob) {
          const file = new File([blob], name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          setCroppedImageFile(file);
        }
      }, 'image/jpeg');
    } else {
      setCroppedImageFile(null);
    }
  }, [completedCrop]);

  function uploadCroppedImage() {
    if (!croppedImageFile) return;
    // Here you can upload the cropped image file to your cloud storage
    console.log('Uploading cropped image:', croppedImageFile);
    const storage = getStorage();
    const imageRef = ref(storage, `images/${croppedImageFile.name}`);

    uploadBytes(imageRef, croppedImageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url=> console.log(url));
    })
  }
//   const uploadFile = () => {
//     if (!imageUpload) return;

//     const storage = getStorage();

//     const imageRef = ref(storage, `images/${imageUpload.name}`)

//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then(url=> console.log(url))
//     })
//   }

  return (
    <>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          locked={true}
          >
          <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        <Stack direction="row" gap={2}>
        {!!completedCrop && (
            <div>
            <canvas
            ref={previewCanvasRef}
            style={{
                border: '1px solid black',
                objectFit: 'contain',
                borderRadius: '100%',
                width: 200,
                height: 200,
            }}
            />
            </div>
      )}
      <Box display="flex" alignItems="center">
        <Button onClick={uploadCroppedImage} variant='outlined'>Upload</Button>
      </Box>
      </Stack>
    </>
);
}
