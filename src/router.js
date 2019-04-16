// 登录注册
import LoginView from './components/login/Login.vue'
import RegisterView from './components/login/Register.vue'
import PasswordView from './components/login/Password.vue'

// 学生端
import StudentIndexView from './components/student/Index.vue'
// import InfoDetailView from './components/student/InfoDetail.vue'
// import InfoUpdatationView from './components/student/InfoUpdatation.vue'
// import HomewordView from './components/student/Homeword.vue'
// import GradeView from './components/student/Grade.vue'
// import LessonView from './components/student/Lesson.vue'
// import LabView from './components/student/Lab.vue'
// import AnnouncementView from './components/student/Announcement.vue'

// 教师端
import ProfessorIndexView from './components/professor/Index.vue'
import ProfessorGradeIndexView from './components/professor/GradeIndex.vue'
import ProfessorGradeDetailView from './components/professor/GradeDetail.vue'
import ProfessorLabDetailView from './components/professor/LabDetail.vue'

// 管理员端
import AdministratorIndexView from './components/administrator/Index.vue'
import AdministratorStudentView from './components/administrator/Student.vue'

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
  },
  {
    path: '/professor', 
    component: ProfessorIndexView,
    children: [{
        path: 'grade',
        component: ProfessorGradeIndexView
      },
      {
        path: 'grade/:id',
        component: ProfessorGradeDetailView
      },
      {
        path: 'lab',
        component: ProfessorLabDetailView
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
        path: 'student',
        component: AdministratorStudentView
      },
    ],
  },
  {
    path: '*',
    component: LoginView,
  }
]
  
