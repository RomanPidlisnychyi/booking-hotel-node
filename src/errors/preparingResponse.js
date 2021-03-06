module.exports.preparingResponse = err => {
  const { status } = err;

  switch (status) {
    case 400.1:
      return { status: 400, message: 'Bad request 2' };
    case 401:
      return { status: 401, message: 'User not authorized' };
    case 401.1:
      return { status: 401, message: 'Wrong email or password' };
    case 403:
      return { status: 403, message: 'Access denied' };
    case 404:
      return { status: 404, message: 'Not found' };
    case 409:
      return { status: 409, message: 'Already existing' };
    default:
      return { status: 400, message: 'Bad request' };
  }
};
