import "react-toastify/dist/ReactToastify.css";

import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import AboutPage from "./AboutPage";
import CoursesPage from "./CoursesPage";
import Header from "./common/Header";
import HomePage from "./HomePage";
import ManageCoursePage from "./ManageCoursePage";
import NotFoundPage from "./NotFoundPage";
import React from "react";

const App = () => {
  toast.configure({
    autoClose: 8000,
    draggable: false
    //etc you get the idea
  });
  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Redirect from="/about-page" to="/about" />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;
