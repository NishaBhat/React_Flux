import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = []; // This is a private variable since it is declared outside the class

class CourseStore extends EventEmitter {
  addChangeEvent(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeEvent(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  _emit() {
    this.emit(CHANGE_EVENT);
  }
  getCourses(){
    return _courses;
  }
  getCourseBySlug(slug){
    return _courses.find(e => e.slug === slug);
  }
}

const store = new CourseStore();
export default store;

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionType.CREATE_COURSE: {
      _courses.push(action.course)
      store._emit(); //This is compulsary to view the changes 
      break;
    }
    case actionType.LOAD_COURSES: {
      _courses = action.courses;
      store._emit(); //This is compulsary to view the changes 
      break;
    }
    case actionType.UPDATE_COURSE: {
      _courses = _courses.map( e => e.id === action.course.id ? action.course : e);
      store._emit();
      break;
    }
    case actionType.DELETE_COURSE: {
      _courses = _courses.filter( c => c.id !== parseInt(action.id,10));
      store._emit();
      break;
    }
    default: //do nothing here
  }
});
