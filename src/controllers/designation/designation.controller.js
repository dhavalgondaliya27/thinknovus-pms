const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
// const empvalidaor = require('../../validators/employee.validator');
const designationService = require('../../services/designation/designation.service');

exports.createOrUpdateDesignationDetails = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const designationid = req.query.designationid;
      //   const { error } = empvalidaor.empSchema.validate(data);
      //   if (error) {
      //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      //   }
      const designationInfo =
        await designationService.createOrUpdateDesignationDetailsInfo(
          designationid,
          data,
        );
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            designationInfo,
            'Designation details processed successfully',
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
  },
);
