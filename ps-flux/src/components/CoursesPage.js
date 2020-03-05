import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import { LOADCourses,deleteCourse } from "../actions/courseActions";

const CoursesPage = props => {
  const [courses, setCourses] = useState(courseStore.getCourses());

  const onChange = () => {
    setCourses(courseStore.getCourses());
  }
  useEffect(() => {
    courseStore.addChangeEvent(onChange)
    if(courseStore.getCourses().length === 0) LOADCourses();
    return () => courseStore.removeChangeEvent(onChange);
  }, []);

  return (
    <>
      <h1>Courses</h1>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <td>Title</td>
            <td>Author Id</td>
            <td>Category</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <Link to={"/course:" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorId}</td>
                <td>{course.category}</td>
                <td><button className="btn btn-outline-danger" onClick={() => deleteCourse(course.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CoursesPage;
