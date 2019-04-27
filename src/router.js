// 登录注册
import LoginView from './components/login/Login.vue'
import RegisterView from './components/login/Register.vue'
import PasswordView from './components/login/Password.vue'

// 学生端
import StudentIndexView from './components/student/Index.vue'
import StudentInfoView from './components/student/Info.vue'
import StudentHomeworkView from './components/student/Homework.vue'
import StudentScoreView from './components/student/Score.vue'
import StudentLabView from './components/student/Lab.vue'
import StudentCourseView from './components/student/Course.vue'
import StudentAnnouncementView from './components/student/Announcement.vue'

// 教师端
import ProfessorIndexView from './components/professor/Index.vue'
import ProfessorInfoView from './components/professor/Info.vue'
import ProfessorScoreView from './components/professor/Score.vue'
import ProfessorLabView from './components/professor/Lab.vue'
import ProfessorCourseView from './components/professor/Course.vue'
import ProfessorAnnouncementView from './components/professor/Announcement.vue'

// 管理员端
import AdministratorIndexView from './components/administrator/Index.vue'
import AdministratorStudentView from './components/administrator/Student.vue'
import AdministratorTeacherView from './components/administrator/Teacher.vue'
import AdministratorEquipmentView from './components/administrator/Equipment.vue'
import AdministratorCourseView from './components/administrator/Course.vue'
import AdministratorAnnouncementView from './components/administrator/Announcement.vue'

export default [
  {
    path: '/login', 
    component: LoginView,
  },
  {
    path: '/register', 
    component: RegisterView,
  },
  {
    path: '/password', 
    component: PasswordView,
  },
  {
    path: '/student', 
    component: StudentIndexView,
    children: [
      {
        path: 'info',
        component: StudentInfoView,
      },
      {
        path: 'homework',
        component: StudentHomeworkView,
      },
      {
        path: 'score',
        component: StudentScoreView,
      },
      {
        path: 'course',
        component: StudentCourseView,
      },
      {
        path: 'lab',
        component: StudentLabView,
      },
      {
        path: 'announcement',
        component: StudentAnnouncementView,
      },
    ],
  },
  {
    path: '/professor', 
    component: ProfessorIndexView,
    children: [
      {
        path: 'info',
        component: ProfessorInfoView,
      },
      {
        path: 'course',
        component: ProfessorCourseView,
      },
      {
        path: 'score',
        component: ProfessorScoreView,
      },
      {
        path: 'lab',
        component: ProfessorLabView,
      },
      {
        path: 'announcement',
        component: ProfessorAnnouncementView,
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
        path: 'course',
        component: AdministratorCourseView,
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
  
