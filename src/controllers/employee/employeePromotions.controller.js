const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const empPromotionsService = require('../../services/employeePromotions.service');

exports.createOrUpdatePromotionsDetails = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const user_id = req.params.user_id;
      const { error } = empvalidaor.empSchema.validate(data);
      if (error) {
        return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      }
      const promotionsInfo =
        await empPromotionsService.createOrUpdatePromotionDetailsInfo(
          user_id,
          data,
        );
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            promotionsInfo,
            'Employee Promotions details processed successfully',
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
