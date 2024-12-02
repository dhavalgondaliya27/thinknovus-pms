const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const clientService = require('../../services/client/client.service');

exports.createOrUpdateClientDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const clientId = req.params.client_id;

    //   const { error } = clientValidator.validate(data);
    //   if (error) {
    //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    //   }

    const clientDetails = await clientService.createOrUpdateClientDetails(
      clientId,
      data,
    );

    // await Promise.all([clientService.updateClientContactInfo(clientId, data)]);

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          clientDetails,
          'Client details processed successfully',
        ),
      );
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
