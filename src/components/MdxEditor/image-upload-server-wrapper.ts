const cloudName = "smithtech";

export const UploadImageInServer = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jcenhuuw");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const remoteImageObj = await response.json();

  return remoteImageObj.secure_url;
};
