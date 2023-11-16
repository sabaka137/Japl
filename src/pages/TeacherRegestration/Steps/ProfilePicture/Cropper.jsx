
import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';



const Cropper= ({imageToCrop,croppedImage,setValue}) => {
  const [crop, setCrop] = useState({ unit: 'px', width: 200, aspect: 1 });
    const [image, setImage] = useState(null);
    
    const cropImageNow = () => {
      if (!crop || !image ) {
        return;
      }
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
    
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';
    
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
 
    
  
      const base64Image = canvas.toDataURL('image/jpeg');
      setValue('general.photo',base64Image)
      croppedImage(base64Image);
    };

  return (
    <div>
    <div>
      {imageToCrop && (
        <div>
          <ReactCrop src={imageToCrop}  onImageLoaded={setImage}
            maxHeight={400}
            minHeight={200}
            minWidth={200}
            maxWidth={400}
            crop={crop} onChange={setCrop}  onComplete={(c) => cropImageNow()} />
        </div>
      )}
    </div>
  </div>
  )
}

export default Cropper