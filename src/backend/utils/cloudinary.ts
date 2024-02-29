import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (buffer: Uint8Array, fileName: string) => {
  const results = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "projects",
          public_id: fileName,
          type: "upload",
          resource_type: "image",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  return results;
};

export const deleteImage = async (publicId: string) => {
  const result = await cloudinary.v2.uploader.destroy(publicId);

  return result;
};

export const getImage = async (publicId: string) => {
  const result = await cloudinary.v2.api.resource(publicId);

  return result;
};

export const getImages = async () => {
  const result = await cloudinary.v2.api.resources();

  return result;
};
