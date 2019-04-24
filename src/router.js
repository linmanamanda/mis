// 登录注册
import LoginView from './components/login/Login.vue'
import RegisterView from './components/login/Register.vue'
import PasswordView from './components/login/Password.vue'

// 学生端
import StudentIndexView from './components/student/Index.vue'
import InfoView from './components/student/Info.vue'
// import InfoUpdatationView from './components/student/InfoUpdatation.vue'
import HomeworkView from './components/student/Homework.vue'
// import GradeView from './components/student/Grade.vue'
// import LessonView from './components/student/Lesson.vue'
import LabView from './components/student/Lab.vue'
import StudentCourseView from './components/student/Course.vue'
import AnnouncementView from './components/student/Announcement.vue'

// 教师端
import ProfessorIndexView from './components/professor/Index.vue'
import ProfessorGradeIndexView from './components/professor/GradeIndex.vue'
import ProfessorGradeDetailView from './components/professor/GradeDetail.vue'
import ProfessorLabView from './components/professor/Lab.vue'
import ProfessorCourseView from './components/professor/Course.vue'

// 管理员端
import AdministratorIndexView from './components/administrator/Index.vue'
import AdministratorStudentView from './components/administrator/Student.vue'
import AdministratorTeacherView from './components/administrator/Teacher.vue'
import AdministratorEquipmentView from './components/administrator/Equipment.vue'
import AdministratorAnnouncementView from './components/administrator/Announcement.vue'

export default [
  {
    path: '/login', 
    component: LoginView
  },
  {
    path: '/login/register', 
    component: RegisterView
  },
  {
    path: '/login/Password', 
    component: PasswordView
  },
  {
    path: '/student', 
    component: StudentIndexView,
    children: [
      {
        path: 'info',
        component: InfoView,
      },
      {
        path: 'lab',
        component: LabView,
      },
      {
        path: 'course',
        component: StudentCourseView,
      },
      {
        path: 'homework',
        component: HomeworkView,
      },
      {
        path: 'announcement',
        component: AnnouncementView,
      },
    ],
  },
  {
    path: '/professor', 
    component: ProfessorIndexView,
    children: [{
        path: 'grade',
        component: ProfessorGradeIndexView,
      },
      {
        path: 'grade/:id',
        component: ProfessorGradeDetailView,
      },
      {
        path: 'lab',
        component: ProfessorLabView,
      },
      {
        path: 'course',
        component: ProfessorCourseView,
      },
    ],
  },
  {
    path: '/administrator', 
    component: AdministratorIndexView,
    children: [{
        path: 'student',
        component: AdministratorStudentView
      },
      {
        path: 'teacher',
        component: AdministratorTeacherView
      },
      {
        path: 'equipment',
        component: AdministratorEquipmentView,
      },
      {
        path: 'announcement',
        component: AdministratorAnnouncementView,
      }
    ],
  },
  {
    path: '*',
    component: LoginView,
  }
]
  
