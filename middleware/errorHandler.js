const asyncHandler = (cb) => {
  return async(req, res, next) => {
    try{
      await cb(req, res, next);
    } catch(error){
      console.log('There was a problem fulfilling the book route');
      throw(error);
    }
  }
}

exports.asyncHandler = asyncHandler;