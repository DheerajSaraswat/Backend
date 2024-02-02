// const asyncHandler = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     res.status(error.code || 5000).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const asyncHandler = (handler) => {
  (req, res, next) => {
    Promise.resolve( handler(req,res,next) ).catch((err) => next(err));
  };
};

export { asyncHandler };
