const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');
const empvalidaor = require('../../validators/employee.validator');
const userService = require('../../services/employee/user.service');
const empService = require('../../services/employee/employee.service');
const empPromotionService = require('../../services/employee/employeePromotions.service');
const empProfessionalService = require('../../services/employee/employeeProfessional.service');
const empJourneyService = require('../../services/employee/employeeJourney.service');
const empTaskService = require('../../services/task/task.services');
const projectTeamService = require('../../services/project/projectTeam.service');

exports.createEmployee = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = empvalidaor.empSchema.validate(data);

    if (error) {
      return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
    }

    const userExists = await userService.findUserByEmail(data.email);
    if (userExists) {
      return next(new ApiError('User already exists', STATUS_CODES.CONFLICT));
    }
    if (data.password) {
      data.password = await userService.hashPassword(data.password);
    }
    const employee = await empService.createEmployee(data);
    if (!employee) {
      return next(new ApiError('Employee not found', STATUS_CODES.NOT_FOUND));
    }

    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          employee,
          'Employee created successfully',
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

exports.createOrupdateEmployeePersonalInfo = asyncHandler(
  async (req, res, next) => {
    try {
      const data = req.body;
      const user_id = req.query.user_id;
      console.log('user_id', user_id);

      const { error } = empvalidaor.empSchema.validate(data);

      if (error) {
        return next(new ApiError(error.message, STATUS_CODES.BAD_REQUEST));
      }
      let user;
      const userExists = await userService.findUserByEmail(data.email);

      if (userExists && userExists._id.toString() !== user_id) {
        return next(new ApiError('User already exists', STATUS_CODES.CONFLICT));
      }
      if (!user_id) {
        user = await empService.createUser(data);
      } else {
        user = await userService.findUserByID(user_id);
      }
      await Promise.all([
        empService.createOrUpdateUser(user._id, data),
        empService.createOrUpdateContactInfo(
          user._id,
          data.contact_information,
        ),
        empService.createOrUpdateIdentityDetails(user._id, data),
        empService.createOrUpdateBankDetails(user._id, data),
        empService.createOrUpdateUserAddress(user._id, data),
      ]);

      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            user,
            'Employee created successfully',
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
  },
);

exports.getEmployeeInfo = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user;
    if (!user_id.is_admin) {
      return next(new ApiError('Unauthorized access', STATUS_CODES.FORBIDDEN));
    }
    const users = await userService.findAllUsers({});
    if (!users || users.length === 0) {
      return next(new ApiError('No users found', STATUS_CODES.NOT_FOUND));
    }
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const promotionInfo = await empPromotionService.getPromotionsByUserId(
          user._id,
        );
        // Fetch user journey and calculate true fields
        const userJourney = await empJourneyService.getJourneyInfo(user._id);
        const journeyCount =
          empJourneyService.getTotalJourneyCount(userJourney);
        const taskCount = await empTaskService.getTotalAssignedTasks(user._id);
        const projectCount = await projectTeamService.getTotalAssignedProjects(
          user._id,
        );
        return {
          ...user.toObject(),
          designation: promotionInfo?.designation || null,
          journey_count: journeyCount,
          task_count: taskCount,
          project_count: projectCount,
        };
      }),
    );
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          usersWithDetails,
          'Employee information fetched successfully',
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

exports.getEmployeePersonalInfo = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return next(
        new ApiError('Please enter user id !!!', STATUS_CODES.BAD_REQUEST),
      );
    }
    const user = await userService.findUserByID(user_id);
    if (!user) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_FOUND));
    }
    const [professionalInfoData, identity, address, contact] =
      await Promise.all([
        empProfessionalService.getProfessionalInfo(user_id),
        empService.getIdentityDetailsByUserId(user_id),
        empService.getAddressByUserId(user_id),
        empService.getContactByUserId(user_id),
      ]);
    const professionalInfo = {
      skype: professionalInfoData.skype,
      linkedin: professionalInfoData.linkedin,
      language: professionalInfoData.language,
      anniversary_date: professionalInfoData.anniversary_date,
    };
    const responseData = {
      user,
      professionalInfo,
      identity,
      address,
      contact,
    };
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          responseData,
          'Employee data fatch successfully',
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

exports.getOwnUserProfilePreview = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const userData = await empService.getAllUserDetailsById(user_id);
    if (!userData) {
      return next(new ApiError('Userdata not found', STATUS_CODES.NOT_FOUND));
    }
    return res
      .status(STATUS_CODES.SUCCESS)
      .json(
        new ApiResponse(
          STATUS_CODES.SUCCESS,
          userData,
          'Userdata found successfully',
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
