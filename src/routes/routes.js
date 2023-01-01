import React, { useEffect, useState, createContext } from 'react'
import { useRoutes, Navigate, Route, Routes, exact,BrowserRouter } from 'react-router-dom';
import '../links/font-awesome/css/font-awesome.min.css';
import '../links/css/style.css';
import '../links/css/responsive.css';


import $ from 'jquery';
import "jquery-ui-dist/jquery-ui";

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
import PrintResult from '../views/Enrollment/PrintResult';
import SingleXapiModal from '../views/SingleXapiModal';



export const LangContext = createContext();



export default function RoutesList() {

  var [data, setData] = useState({});


  useEffect(()=>{


     /*mega menu*/
     $('#mega-menu-fresher li').on('mouseenter', function () {
      //alert("2!");
      if ($(this).siblings().children().hasClass('active-mega-menu')) {
          $(this).siblings().children().removeClass('active-mega-menu');
      }
      $(this).children().addClass('active-mega-menu');
  });
  $('#mega-menu-fresher').hover(function () {
      $('#mega-menu-fresher li').children().removeClass('active-mega-menu');
      $('#mega-menu-fresher li:first-child').children().addClass('active-mega-menu');
  });

  $('.cat-menu ul.menu-list li#mega-menu-parent').hover(function () {
      //alert("3!");
      $('#mega-menu-fresher').toggle();
  });
  $('#mega-menu-fresher ul li.vegies').hover(function () {
      $(this).children('a.active-mega-menu').css('color', '#000');
  });
  $('#mega-menu-fresher ul li.vegies').hover(function () {
      $(this).children('a.active-mega-menu').css('color', '#000');
  });
   

  },[])



  useEffect(() => {
    (async () => {
      var responce = await MaintenanceService.getAll();
      if (responce.data.status) {
        // console.log(responce.data.data);
        //if (responce.data.data[0].status == "active")
          setData(responce.data.data[0])
      }

    })()
  }, [])




  const [lang, setLang] = useState("1");
  const [xapiName, setXapiName] = useState("");
  var languageFun=()=>setLang()

  const langData = {
    language_name: lang,
    set_language:setLang
  }

  const xapiData={
    xapiName:xapiName,
    setXapiName,setXapiName
  }


  return (
    <LangContext.Provider value={{ languageList: langData,xapi_result:xapiData }}>


    
      <Routes>
        <Route path="/" element={<ActiveMaintenance data={data}><RequireAuthLogout><Navbar /></RequireAuthLogout></ActiveMaintenance>}>
          <Route index element={<RequireAuthLogout><Home /></RequireAuthLogout>} />
          <Route path='my-courses' element={<RequireAuth><MyCourses /></RequireAuth>} />
          <Route path='enrollments' element={<RequireAuth><Enrollment /></RequireAuth>} />
          {/* <Route path='profile-edit' element={<RequireAuth><Profile /></RequireAuth>} />  design profile page */}
          <Route path='profile' element={<RequireAuth><EditProfile /></RequireAuth>} />
          <Route path='courses' element={<RequireAuth><Courses /></RequireAuth>} />
          <Route path='courses/:name' element={<RequireAuth><Singlecourse /></RequireAuth>} />

          <Route path='allreview' element={<AllRating />} />

          <Route path='course' element={<RequireAuth><CourseCreate /></RequireAuth>} />
          <Route path='course/add' element={<RequireAuth><CourseAdd /></RequireAuth>} />
          <Route path='course/edit' element={<RequireAuth><CourseEdit /></RequireAuth>} />

          <Route path='chapter' element={<RequireAuth><ChapterCreate /></RequireAuth>} />
          <Route path='chapter/add' element={<RequireAuth><ChapterAdd /></RequireAuth> } />
          <Route path='chapter/edit' element={<RequireAuth><ChapterEdit /></RequireAuth>} />

          <Route path='lesson' element={<RequireAuth><LessonCreate /></RequireAuth>} />
          <Route path='lesson/add' element={<RequireAuth><LessonAdd /></RequireAuth>} />
          <Route path='lesson/edit' element={<RequireAuth><LessonEdit /></RequireAuth>} />

          <Route path='assignment-create' element={<AssignmentCreate />} />


          <Route path='task' element={<RequireAuth><Task /></RequireAuth>} />
          <Route path='task/add' element={<RequireAuth><TaskAdd /></RequireAuth>} />
          <Route path='task/edit' element={<RequireAuth><TaskEdit /></RequireAuth>} />

          <Route path='group' element={<RequireAuth><UserGroup /></RequireAuth>} />
          <Route path='language' element={<RequireAuth><Language /></RequireAuth>} />
          <Route path='qualification' element={<RequireAuth><Qualification /></RequireAuth>} />
          <Route path='category' element={<RequireAuth><Category /></RequireAuth>} />

          <Route path='user' element={<RequireAuth><UserCreate /></RequireAuth>} />
          <Route path='user/add' element={<RequireAuth><UserAdd /></RequireAuth>} />
          <Route path='user/edit' element={<RequireAuth><UserEdit /></RequireAuth>} />

          <Route path='activites' element={<RequireAuth><Activites /></RequireAuth>} />

          <Route path='about-us' element={<RequireAuth><AboutUs /></RequireAuth>} />

          <Route path='view-result' element={<ViewResult />} />

          

          {/** error page handler */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Route>

        <Route path="xapicourse" element={<RequireAuth><SingleXapiModal /></RequireAuth>} />

        <Route path='/print-result' element={<RequireAuth><PrintResult /></RequireAuth>}  />

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

         {/** error page handler */}
        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>
    

    </LangContext.Provider>





  );
}
