export function fileTypeByUrl(fileUrl) {
  return (fileUrl && fileUrl.split('.').pop()) || '';
}

// ----------------------------------------------------------------------

export function fileNameByUrl(fileUrl) {
  return fileUrl.split('/').pop();
}

export const urlToFile = (blobUrl) =>
  new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
      res.blob().then((blob) => {
        const name = fileNameByUrl(blobUrl);
        const type = fileTypeByUrl(blobUrl);
        const file = new File([blob], name || 'default.png', { type: type || blob.type });
        file.preview = URL.createObjectURL(blob);
        resolve(file);
      });
    });
  });
