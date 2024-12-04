const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const departmentService = require('../../services/department/department.service');

exports.createOrUpdateDepartmentDetails = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const departmentId = req.query.department_id;

      // Validate the incoming data using a validator (assumes you have departmentValidator)
      //   const { error } = departmentValidator.departmentSchema.validate(data);
      //   if (error) {
      //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      //   }

      const departmentDetails =
        await departmentService.createOrUpdateDepartmentDetails(
          departmentId,
          data,
        );

      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            departmentDetails,
            'Department details processed successfully',
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

exports.getAllDepartments = asyncHandler(async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          departments,
          'Departments fetched successfully',
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

exports.getDepartmentById = asyncHandler(async (req, res, next) => {
  try {
    const department_id = req.params.department_id;
    const department = await departmentService.getDepartmentById(department_id);
    if (!department) {
      return next(new ApiError('Department not found', STATUS_CODES.NOT_FOUND));
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          department,
          'Department fetched successfully',
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
