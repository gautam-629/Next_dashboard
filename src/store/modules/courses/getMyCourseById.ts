import { APIGetMyCourseById, APIGetMyDraftById } from '../../../api/course';
import { INITIAL_COURSE } from '../../../utils/interfaces/Course.model';
import { AnyAction, Dispatch } from 'redux';
import { setCourseData } from './actions';

// export const getAllCourseList =
//   (page: any, limit: any) => async (dispatch: Dispatch<AnyAction>) => {
//     const res: any = await APIGetAllCourseList(page, limit);
//     const myCourseList = {
//       courses: res?.data?.results ?? [],
//       count: res?.data?.count ?? 0,
//     };
//     if (res) {
//       dispatch(setMyCourses(myCourseList));
//     }
//     return res;
//   };

export const getMyCourseById = (draftId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    // dispatch(setCourseData(INITIAL_COURSE));
    try {
      const response = await APIGetMyCourseById(draftId);
      console.log('Initial cours details', response?.data);

      dispatch(setCourseData(response?.data ?? {}));
    } catch (error: any) {
      // errorNotification(error?.toString() + 'Error in Actions');
      //  When creating new course id exists but data doesnt in that case
      dispatch(setCourseData(INITIAL_COURSE));
    }
  };
};
export const getMyDraftById = (draftId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    // dispatch(setCourseData(INITIAL_COURSE));
    try {
      const response = await APIGetMyDraftById(draftId);
      console.log('Initial cours details', response?.data);

      dispatch(setCourseData(response?.data ?? {}));
    } catch (error: any) {
      // errorNotification(error?.toString() + 'Error in Actions');
      //  When creating new course id exists but data doesnt in that case
      dispatch(setCourseData(INITIAL_COURSE));
    }
  };
};
