const empTiming = require('../../services/employee/employeeTiming.service');
const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { STATUS_CODES } = require('../../utils/constants');

exports.employeePunchHandle = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { punch_in, punch_out } = req.body;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    let empTimingRecord;
    if (punch_in) {
      empTimingRecord = await empTiming.createPunchIn(user_id, punch_in);
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            empTimingRecord,
            'Break started successfully',
          ),
        );
    } else if (punch_out) {
      empTimingRecord = await empTiming.findPunchByUserId(user_id);

      if (!empTimingRecord || empTimingRecord.punch_out) {
        return next(
          new ApiError('No ongoing break to end', STATUS_CODES.BAD_REQUEST),
        );
      }

      empTimingRecord.punch_out = new Date(punch_out);
      await empTimingRecord.save();

      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            empTimingRecord,
            'Break ended successfully',
          ),
        );
    } else {
      return next(
        new ApiError(
          'Invalid request: punch_in or punch_out is required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});

exports.employeeBreakHandle = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const punch_id = req.params.punch_id;
    const { start_time, end_time, reason } = req.body;
    if (!user_id) {
      return next(new ApiError('User not found', STATUS_CODES.NOT_ACCEPTABLE));
    }
    const empTimingRecord = await empTiming.findPunchById(punch_id);
    if (!empTimingRecord) {
      return next(
        new ApiError('Punch record not found', STATUS_CODES.NOT_FOUND),
      );
    }
    if (start_time) {
      empTimingRecord.breaks.push({ start_time, reason });
      await empTimingRecord.save();
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            empTimingRecord,
            'Break started successfully',
          ),
        );
    } else if (end_time) {
      const lastBreak =
        empTimingRecord.breaks[empTimingRecord.breaks.length - 1];
      if (!lastBreak || lastBreak.end_time) {
        return next(
          new ApiError('No ongoing break to end', STATUS_CODES.BAD_REQUEST),
        );
      }
      lastBreak.end_time = end_time;
      await empTimingRecord.save();
      return res
        .status(STATUS_CODES.SUCCESS)
        .json(
          new ApiResponse(
            STATUS_CODES.SUCCESS,
            empTimingRecord,
            'Break ended successfully',
          ),
        );
    } else {
      return next(
        new ApiError(
          'Invalid request: start_time or end_time required',
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }
  } catch (error) {
    return next(
      new ApiError(
        error.message || 'Something went wrong',
        STATUS_CODES.SERVER_ERROR,
      ),
    );
  }
});
