const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const KPIService = require('../../services/KPI/KPI.service');

exports.createOrUpdateKPIDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const KPIId = req.query.kpi_id;

    // Validate the incoming data using a validator
    // const { error } = KPIValidator.KPISchema.validate(data);
    // if (error) {
    //   return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    // }

    const KPIDetails = await KPIService.createOrUpdateKPIDetails(KPIId, data);

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          KPIDetails,
          'KPI details processed successfully',
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

exports.getAllKPIs = asyncHandler(async (req, res, next) => {
  try {
    const KPIs = await KPIService.getAllKPIs();
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(new ApiResponse(STATUS_CODES.SUCCESS, KPIs, 'KPI fetched successfully'));
  } catch (error) {
    console.error(error);
    return next(new ApiError(error.message || 'Something went wrong', STATUS_CODES.SERVER_ERROR));
  }
});

exports.getKPIById = asyncHandler(async (req, res, next) => {
  try {
    const KPI_id = req.params.KPI_id;
    const KPI = await KPIService.getKPIsById(KPI_id);
    if (!KPI) {
      return next(new ApiError('KPI not found', STATUS_CODES.NOT_FOUND));
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(new ApiResponse(STATUS_CODES.SUCCESS, KPI, 'KPI fetched successfully'));
  } catch (error) {
    console.error(error);
    return next(new ApiError(error.message || 'Something went wrong', STATUS_CODES.SERVER_ERROR));
  }
});
