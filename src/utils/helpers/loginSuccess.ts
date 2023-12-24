import { NavigateFunction } from 'react-router-dom';
import { successNotification } from './notifications';

export const loginSuccessNavigateHandler = (res: any, navigate: NavigateFunction) => {
  const roles = ['STUDENT', 'TEACHER'];
  let role = '';

  const checkRole = roles.every((value) => {
    return res.data.userProfile.roles.includes(value);
  });
  if (checkRole === true) {
    role = 'teacher';
    navigate('/teacher');
  } else {
    role = 'student';
    navigate('/student/classroom');
  }
  successNotification(
    res.data?.googleSignInMessage
      ? `${res.data.googleSignInMessage} ${res.data.message} as ${role}`
      : `${res.data.message} as ${role}`,
  );
};
