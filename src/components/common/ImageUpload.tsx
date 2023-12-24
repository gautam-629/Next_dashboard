// import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react';
import { APIUploadImage } from '../../api/file-handler';
import { Dropzone } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';

const ImageUpload = (props: any) => {
  const [imagePreview, setImagePreview] = useState();
  const handleDrop = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImagePreview(file);
    const formData = new FormData();
    formData.append('file', file);
    const res: any = await APIUploadImage(formData);
    const imageUrl = res?.data?.url ?? '';
    props.setImageUrl(imageUrl);
  };
  return (
    <div>
      <Dropzone onDrop={handleDrop} multiple={false} p={'xs'}>
        {imagePreview ? (
          <div
            style={{
              borderRadius: '4px',
              minHeight: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src={
                typeof imagePreview === 'string' ? imagePreview : URL.createObjectURL(imagePreview)
              }
              alt="Cover Image"
              style={{
                maxWidth: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundSize: 'cover',
                borderRadius: '4px',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ) : (
          <>
            <div
              className="flex flex-col items-center justify-center"
              style={{ minHeight: '150px' }}
            >
              <CloudUpload
                size={32}
                style={{
                  marginRight: '0.5rem',
                }}
              />
              <div>
                Drag and drop an image file here, or click to select a file from your computer.
              </div>
            </div>
          </>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUpload;
