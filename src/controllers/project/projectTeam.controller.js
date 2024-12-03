const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const projectTeamService = require('../../services/project/projectTeam.service');
const projectTeamValidator = require('../../validators/project.validator');
const userService = require('../../services/user.service');

exports.createOrUpdateProjectTeamDetails = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const project_id = req.params.project_id;
      const { error } = projectTeamValidator.projectSchema.validate(data);
      if (error) {
        return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      }
      const projectTeamInfo =
        await projectTeamService.createOrUpdateProjectTeamDetailsInfo(
          project_id,
          data,
        );
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            projectTeamInfo,
            'Project team details processed successfully',
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

exports.getProjectTeamInfo = asyncHandler(async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    console.log(project_id, 'projectid');

    if (!project_id) {
      return next(
        new ApiError('Project ID is required', STATUS_CODES.BAD_REQUEST),
      );
    }

    // Fetch project team data
    const projectTeamInfo =
      await projectTeamService.findProjecTeamByID(project_id);
    if (!projectTeamInfo) {
      return next(
        new ApiError('Project team not found', STATUS_CODES.NOT_FOUND),
      );
    }

    const fetchUserDetails = async (ids) => {
      return await Promise.all(ids.map((id) => userService.findUserByID(id)));
    };

    // Fetch user details for all categories
    const [projectManagers, supervisors, supportPersons, teamMembers] =
      await Promise.all([
        fetchUserDetails(projectTeamInfo.project_manager_ids),
        fetchUserDetails(projectTeamInfo.supervisor_ids),
        fetchUserDetails(projectTeamInfo.support_person_ids),
        fetchUserDetails(projectTeamInfo.team_member_ids),
      ]);

    // Extract only firstname and lastname
    const extractNames = (users) =>
      users.map((user) => ({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      }));

    const responseData = {
      project_manager_details: extractNames(projectManagers),
      supervisor_details: extractNames(supervisors),
      support_person_details: extractNames(supportPersons),
      team_member_details: extractNames(teamMembers),
    };

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          responseData,
          'Project team information fetched successfully',
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
