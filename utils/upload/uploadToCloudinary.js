console.log("Cloudinary:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "EXISTS" : "MISSING",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "EXISTS" : "MISSING",
});
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");

module.exports = (file, model, field) => {
  return new Promise((resolve, reject) => {
    const type = file.detectedType.type;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `moatasem-portfolio/${model}/${field}/${type}`,
        resource_type: type,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          type: type,
          mimeType: file.detectedType.mime,
          ext: file.detectedType.ext,
          size: file.size,
          fieldName: file.fieldName,
          originalName: file.originalName,
          encoding: file.encoding,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};