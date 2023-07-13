import { ChangeEvent } from 'react';
import { uploadFiles } from './uploadthing';
import axios from 'axios';

export function fileUpload(onFileLoad: (result: string) => void, onAlert: () => void, file?: File) {
  if (!file) return;

  if (!file.type.includes('image') || file.name.toLowerCase().endsWith(".gif")) {
    onAlert();
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    const result = reader.result as string;
    onFileLoad(result);
  }
}

export async function uploadImage(imagePath: string) {
  try {
    const payload = {
      path: imagePath,
    }
    const { data } = await axios.post('/api/upload', payload);
    return data;
  } catch (err) {
    throw Error();
  }
}
