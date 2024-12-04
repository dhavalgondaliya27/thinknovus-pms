const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const clientService = require('../../services/client/client.service');
const clientValidator = require('../../validators/client.validator');

exports.createOrUpdateClientDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const clientId = req.query.client_id;

    const { error } = clientValidator.clientSchema.validate(data);
    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const clientDetails = await clientService.createOrUpdateClientDetails(
      clientId,
      data,
    );

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

exports.getClientInfo = asyncHandler(async (req, res, next) => {
  try {
    const client_id = req.params.client_id;

    if (!client_id) {
      return next(
        new ApiError('Client ID is required', STATUS_CODES.BAD_REQUEST),
      );
    }

    // Fetch client data
    const client = await clientService.findClientById(client_id);
    if (!client) {
      return next(new ApiError('Client not found', STATUS_CODES.NOT_FOUND));
    }

    // Fetch client details
    const [clientInfo] = await Promise.all([
      clientService.getClientInfo(client_id),
    ]);

    const responseData = {
      clientInfo: clientInfo || {},
    };

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          responseData,
          'Client information fetched successfully',
        ),
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
