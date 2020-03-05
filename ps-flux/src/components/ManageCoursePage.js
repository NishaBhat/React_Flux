import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import courseStore from "../stores/courseStore";
import * as courseAction from "../actions/courseActions";

import CourseForm from "./CourseForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**This param "slug" should match App.js */
const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses,setCourses] = useState(courseStore.getCourses())
  const [course, setCourse] = useState({
    title: "",
    authorId: "",
    category: "",
    id: null,
    slug: ""
  });
  useEffect(() => {
    let slug = props.match.params.slug;
    courseStore.addChangeEvent(onChange)
    if(courses.length === 0 ){
      courseAction.LOADCourses();
    }
    else if(slug){
      slug = slug.slice(1);
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeEvent(onChange);
  }, [courses.length, props.match.params.slug]);
  const onChange = () => {
    setCourses(courseStore.getCourses());
  }
  const handleChange = ({ target }) => {
    setCourse({ ...course, [target.name]: target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (!isFormValid()) return;
    courseAction.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast("Course Saved");
    });
  };
  const isFormValid = () => {
    const _errors = {};
    if (!course.title) _errors.title = "Title is Compulsary";
    if (!course.authorId) _errors.authorId = "Author is Compulsary";
    if (!course.category) _errors.category = "Category is Compulsary";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };
  return (
    <div className="container-fluid">
      <h2>Manage Course</h2>
      <Prompt when={true} message="Are you sure you want to leave?" />
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

export default ManageCoursePage;
