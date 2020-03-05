import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionType from "./actionTypes";

export const saveCourse = course => {
  return courseApi.saveCourse(course).then(c => {
    dispatcher.dispatch({
      actionType: course.id ? actionType.UPDATE_COURSE : actionType.CREATE_COURSE,
      course: c
    });
  });
};

export const LOADCourses = () => {
  return courseApi.getCourses().then(_courses => {
    dispatcher.dispatch({
      actionType:actionType.LOAD_COURSES,
      courses: _courses
    })
  })
};

export const deleteCourse = id => {
  return courseApi.deleteCourse(id).then( () => {
      dispatcher.dispatch({
        actionType: actionType.DELETE_COURSE,
        id : id
      })
  })
};
