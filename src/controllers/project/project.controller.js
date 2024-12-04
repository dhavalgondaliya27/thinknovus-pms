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

exports.getProjectInfo = asyncHandler(async (req, res, next) => {
  try {
    const project_id = req.params.project_id;

    if (!project_id) {
      return next(
        new ApiError('Project ID is required', STATUS_CODES.BAD_REQUEST),
      );
    }

    // Fetch user data
    const user = await projectService.findProjectByID(project_id);
    if (!user) {
      return next(new ApiError('Project not found', STATUS_CODES.NOT_FOUND));
    }

    // Fetch associated promotions and access details
    const [projectInfo] = await Promise.all([
      projectService.getProjectInfo(project_id),
    ]);

    const responseData = {
      projectInfo: projectInfo || {},
    };

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          responseData,
          'Project information fetched successfully',
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

