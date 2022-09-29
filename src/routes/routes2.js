import React from 'react'
import { useRoutes, Navigate, Route, Routes, exact } from 'react-router-dom'

import Home from '../views/Home/Home';
import AboutUs from '../views/AboutUs';
import Activites from '../views/Activites';
import AddEditChapter from '../views/AddEditChapter';
import AddEditGroup from '../views/AddEditGroup';
import AddNewAssignment from '../views/AddNewAssignment';
import Assignment from '../views/Assignment';
import Contact from '../views/Contact';
import Courses from '../views/Courses';
import Enrollment from '../views/Enrollment';
import MyCourses from '../views/MyCourses/MyCourseMain';
import SingleCourse from '../views/SingleCourse';
import SingleCourseQA from '../views/SingleCourse/SingleCourseQ&A';
import UserList from '../views/UserList';
import UserGroup from '../views/UserGroup';
import Profile from '../views/Profile/Profile';
import Course from '../views/Courses';
import Singlecourse from '../views/Singlecourse';
import MyCourse from '../views/MyCourses/MyCourse';
// import { EditProfile } from '../views/profileEdit/EditProfile2';
import { EditProfile } from '../views/profileEdit/EditProfile';

import CourseCreate from '../views/Course/Course';
import ChapterCreate from '../views/Chapter/Chapter';
import LessonCreate from '../views/Lesson/Lesson';
import AssignmentCreate from '../views/CourseAssignment/CourseAssignment';
import Category from '../views/Ctategory/Category';
import Language from '../views/Language/Language';
import Qualification from '../views/Qualification/Qualification';
import AllRating from '../views/AllRating';
import Task from '../views/Task/Task';

import UserCreate from '../views/UserCreate/User';

// middleware add
import { RequireAuth, RequireAuthLogout } from '../middleware/RequireAuth';
import SingleTask from '../views/SingleTask';
import AllRatingTask from '../views/AllRatingTask';

import SingleXapi from '../views/SingleXapi';


export default function RoutesList() {
  // return useRoutes([
  //   { path: "/about-us", element: <AboutUs /> },
  //   { path: "/activites", element: <Activites /> },
  //   { path: "/add-edit-chapter", element: <AddEditChapter /> },
  //   { path: "/add-edit-group", element: <AddEditGroup /> },
  //   { path: "/add-new-assignment", element: <AddNewAssignment /> },
  //   { path: "/assignment", element: <Assignment /> },
  //   { path: "/contact", element: <Contact /> },
  //   { path: "/courses", element: <Courses /> },
  //   { path: "/enrollments", element: <Enrollment /> },
  //   { path: "/my-courses", element: <MyCourses /> },
  //   { path: "/single-course", element: <SingleCourse /> },
  //   { path: "/single-course-Q&A", element: <SingleCourseQA /> },
  //   { path: "/user-list", element: <UserList /> },
  //   { path: "/user-group", element: <UserGroup /> },
  //   {
  //     path: "/profile", element: <RequireAuth><Profile /></RequireAuth>,
  //     children:[
  //       { path: "/edit", element: <RequireAuth><EditProfile /></RequireAuth> }
  //     ]
  //   },
  //   // { path: "/profile/edit", element: <RequireAuth><EditProfile /></RequireAuth> },
  //   { path: "/", element: <RequireAuthLogout><c /></RequireAuthLogout> },
  //   { path: "*", element: <Navigate to="/" /> }
  // ])

  return (
       <Routes>
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/activites' element={<Activites />} />
      <Route path='/add-edit-chapter' element={<AddEditChapter />} />
      <Route path='/add-edit-group' element={<AddEditGroup />} />
      <Route path='/add-new-assignment' element={<AddNewAssignment />} />
      <Route path='/assignment' element={<Assignment />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/enrollments' element={<Enrollment />} />
      <Route path='/my-courses' element={<MyCourses />} />
      <Route path='/single-course' element={<SingleCourse />} />
      <Route path='/single-course-Q&A' element={<SingleCourseQA />} />
      <Route path='/user-list' element={<UserList />} />
      <Route path='/user-group' element={<UserGroup />} />
      <Route path='/language' element={<Language />} />
      <Route path='/qualification' element={<Qualification />} />
      <Route path='/users' element={<UserCreate />} />
      <Route path='/course' element={<Course />} />
      <Route path='/course-create' element={<CourseCreate />} />
      <Route path='/chapter' element={<ChapterCreate />} />
      <Route path='/lesson' element={<LessonCreate />} />
      <Route path='/assignment-create' element={<AssignmentCreate />} />
      <Route path='/singlecourse' element={<Singlecourse />} />
      <Route path='/mycourse' element={<MyCourse />} />
      <Route path='/allreview' element={<AllRating />} />
      <Route path='/allreviewtask' element={<AllRatingTask />} />
      <Route path='/task' element={<Task />} />
      <Route path='/category' element={<RequireAuth><Category /></RequireAuth>} />
      <Route path='/singletask' element={<SingleTask />} />
      <Route path="/singlexapi" element={<SingleXapi />} />
      <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} >

      </Route>
      <Route path='/profile-edit' element={<RequireAuth><EditProfile /></RequireAuth>} />

      <Route index path="/" element={<Home />} />

    </Routes>   



    



  );
}
