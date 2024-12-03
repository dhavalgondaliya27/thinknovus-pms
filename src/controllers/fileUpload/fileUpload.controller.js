const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const { uploadOnCloudinary } = require('../../utils/cloudinary');

exports.fileUpload = asyncHandler(async (req, res, next) => {
  try {
    let uploadedFileUrl = null;
    if (req.file) {
      const localFilePath = req.file.path;
      console.log(localFilePath);
      const uploadResult = await uploadOnCloudinary(localFilePath);

      if (!uploadResult) {
        return next(
          new ApiError('File upload failed', STATUS_CODES.SERVER_ERROR),
        );
      }

      uploadedFileUrl = uploadResult.secure_url;
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          uploadedFileUrl,
          'File Upload successfully',
        ),
      );
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
