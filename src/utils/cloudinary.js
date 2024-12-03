const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const appConfig = require('../config/appConfig');

cloudinary.config({
  cloud_name: appConfig.cloundName,
  api_key: appConfig.clouldAPIKey,
  api_secret: appConfig.clouldSecretey,
});

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log(localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log(response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
