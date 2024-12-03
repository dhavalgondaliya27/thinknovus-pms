const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const projectService = require('../../services/project/project.services');

exports.createOrUpdateProjectDetails = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const projectId = req.query.project_id;

    //   const { error } = projectValidator.validate(data);
    //   if (error) {
    //     return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    //   }

    const projectDetails = await projectService.createOrUpdateProjectDetails(
      projectId,
      data,
    );

    // await Promise.all([
    // projectService.updateProjectTeamDetails(projectId, data),
    // ]);

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          projectDetails,
          'Project details processed successfully',
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
