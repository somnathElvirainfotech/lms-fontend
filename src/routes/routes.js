import React, { useEffect, useState, createContext } from 'react'
import { useRoutes, Navigate, Route, Routes, exact } from 'react-router-dom'

import Home from '../views/Home/Home';
import AboutUs from '../views/AboutUs';
import Activites from '../views/Activites';
import AddEditChapter from '../views/AddEditChapter';
import AddEditGroup from '../views/AddEditGroup';
import AddNewAssignment from '../views/AddNewAssignment';
import Assignment from '../views/Assignment';
import Contact from '../views/Contact';

import Enrollment from '../views/Enrollment';
import MyCourses from '../views/MyCourses/MyCourseMain';
import SingleCourse from '../views/SingleCourse';
import SingleCourseQA from '../views/SingleCourse/SingleCourseQ&A';
import UserList from '../views/UserList';
import UserGroup from '../views/UserGroup';
import Profile from '../views/Profile/Profile';
import Courses from '../views/Courses';
import Singlecourse from '../views/Singlecourse';
import MyCourse from '../views/MyCourses/MyCourse';
// import { EditProfile } from '../views/profileEdit/EditProfile2';
import { EditProfile } from '../views/profileEdit/EditProfile';

import CourseCreate from '../views/Course/Course';
import CourseAdd from '../views/Course/CourseAdd';
import CourseEdit from '../views/Course/CourseEdit';


import ChapterCreate from '../views/Chapter/Chapter';
import ChapterAdd from '../views/Chapter/ChapterAdd';
import ChapterEdit from '../views/Chapter/ChapterEdit';

import LessonCreate from '../views/Lesson/Lesson';
import LessonAdd from '../views/Lesson/LessonAdd';
import LessonEdit from '../views/Lesson/LessonEdit';


import AssignmentCreate from '../views/CourseAssignment/CourseAssignment';
import Category from '../views/Ctategory/Category';
import Language from '../views/Language/Language';
import Qualification from '../views/Qualification/Qualification';
import AllRating from '../views/AllRating';
import Task from '../views/Task/Task';

import UserCreate from '../views/UserCreate/User';

// middleware add
import { RequireAuth, RequireAuthLogout, ActiveMaintenance } from '../middleware/RequireAuth';
import SingleTask from '../views/SingleTask';
import AllRatingTask from '../views/AllRatingTask';

import SingleXapi from '../views/SingleXapi';
import Navbar from '../views/Common/Navbar';
import TaskAdd from '../views/Task/TaskAdd';
import TaskEdit from '../views/Task/TaskEdit';
import UserAdd from '../views/UserCreate/UserAdd';
import UserEdit from '../views/UserCreate/UserEdit';
import Certificate from '../views/Certificates/Certificate';
import MaintenanceMode from '../views/MaintenanceMode';
import MaintenanceService from '../services/MaintenanceService';
import ViewResult from '../views/Enrollment/ViewResult';
import Certificate1 from '../views/Certificates/all_three_certificate/certificate-1/Certificate1';
import Certificate2 from '../views/Certificates/all_three_certificate/certificate-2/Certificate2';
import Certificate3 from '../views/Certificates/all_three_certificate/certificate-3/Certificate3';

export const LangContext = createContext();


export default function RoutesList() {

  var [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      var responce = await MaintenanceService.getAll();
      if (responce.data.status) {
        // console.log(responce.data.data);
        if (responce.data.data[0].status == "active")
          setData(responce.data.data[0])
      }

    })()
  }, [])




  const [lang, setLang] = useState("english");
  var languageFun=()=>setLang()

  const langData = {
    language_name: lang,
    set_language:setLang
  }


  return (
    <LangContext.Provider value={{ languageList: langData }}>

      <Routes>
        <Route path="/" element={<ActiveMaintenance data={data}><RequireAuthLogout><Navbar /></RequireAuthLogout></ActiveMaintenance>}>
          <Route index element={<RequireAuthLogout><Home /></RequireAuthLogout>} />
          <Route path='/my-courses' element={<RequireAuth><MyCourses /></RequireAuth>} />
          <Route path='/enrollments' element={<RequireAuth><Enrollment /></RequireAuth>} />
          <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path='/profile-edit' element={<RequireAuth><EditProfile /></RequireAuth>} />
          <Route path='/courses' element={<RequireAuth><Courses /></RequireAuth>} />
          <Route path='/singlecourse' element={<RequireAuth><Singlecourse /></RequireAuth>} />
          <Route path='/allreview' element={<AllRating />} />

          <Route path='/course' element={<RequireAuth><CourseCreate /></RequireAuth>} />
          <Route path='/course/add' element={<CourseAdd />} />
          <Route path='/course/edit' element={<CourseEdit />} />

          <Route path='/chapter' element={<ChapterCreate />} />
          <Route path='/chapter/add' element={<ChapterAdd />} />
          <Route path='/chapter/edit' element={<ChapterEdit />} />

          <Route path='/lesson' element={<LessonCreate />} />
          <Route path='/lesson/add' element={<LessonAdd />} />
          <Route path='/lesson/edit' element={<LessonEdit />} />

          <Route path='/assignment-create' element={<AssignmentCreate />} />


          <Route path='/task' element={<RequireAuth><Task /></RequireAuth>} />
          <Route path='/task/add' element={<RequireAuth><TaskAdd /></RequireAuth>} />
          <Route path='/task/edit' element={<RequireAuth><TaskEdit /></RequireAuth>} />

          <Route path='/group' element={<RequireAuth><UserGroup /></RequireAuth>} />
          <Route path='/language' element={<RequireAuth><Language /></RequireAuth>} />
          <Route path='/qualification' element={<RequireAuth><Qualification /></RequireAuth>} />
          <Route path='/category' element={<RequireAuth><Category /></RequireAuth>} />

          <Route path='/user' element={<UserCreate />} />
          <Route path='/user/add' element={<UserAdd />} />
          <Route path='/user/edit' element={<UserEdit />} />

          <Route path='/activites' element={<Activites />} />

          <Route path='/about-us' element={<AboutUs />} />

          <Route path='/view-result' element={<ViewResult />} />

         

        </Route>

        <Route path='/certificate' element={<RequireAuth><Certificate /></RequireAuth>} />

        <Route path="/maintenance" element={<MaintenanceMode />} />







        <Route path='/add-edit-chapter' element={<AddEditChapter />} />
        <Route path='/add-edit-group' element={<AddEditGroup />} />
        <Route path='/add-new-assignment' element={<AddNewAssignment />} />
        <Route path='/assignment' element={<Assignment />} />
        <Route path='/contact' element={<Contact />} />


        <Route path='/single-course' element={<SingleCourse />} />
        <Route path='/single-course-Q&A' element={<SingleCourseQA />} />
        <Route path='/user-list' element={<UserList />} />







        <Route path='/mycourse' element={<MyCourse />} />

        <Route path='/allreviewtask' element={<AllRatingTask />} />


        <Route path='/singletask' element={<SingleTask />} />
        <Route path="/singlexapi" element={<SingleXapi />} />



        <Route path='/profile-edit' element={<RequireAuth><EditProfile /></RequireAuth>} />



      </Routes>

    </LangContext.Provider>





  );
}