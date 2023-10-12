export const AdminSideNavMap = {
  home: 1,
  dashboard: 2,

  assign_revoke_roles: 3,
  change_email_request: 4,

  view_problem: 5,
  create_problems: 6,

  view_contests: 9,
  create_contest: 10,

  launch_contest: 13,
  registrations: 14,
  contest_stats: 15,
  update_ratings: 16,
};

export const PROBLEM_SEARCH = [
  "ques_id",
  "contest_id",
  "name",
  "display_after",
  "assigned",
  "is_draft",
];

export const CONTEST_SEARCH = ["contest_name", "contest_id", "is_draft"];

export const ADMIN = "admin";
export const SUPER_ADMIN = "super_admin";
export const END_USER = "end_user";

export const ADMIN_DASHBOARD = "/admin/dashboard";

export const BASE_URL = "https://ill-pear-dalmatian-slip.cyclic.app";
// export const BASE_URL = "http://localhost:5000";
export const LOGIN_ENDPOINT_BACKEND = "/auth/login";
export const SIGNUP_ENDPOINT_BACKEND = "/auth/register";

export const CREATE_QUESTION_ENDPOINT_BACKEND = "/question/create";
export const UPDATE_QUESTION_ENDPOINT_BACKEND = "/question/update";
export const SEARCH_QUESIONS_ENDPOINT_BACKEND = "/question/search";
export const DELETE_QUESION_ENDPOINT_BACKEND = "/question/delete";

export const CREATE_CONTEST_ENDPOINT_BACKEND = "/contest/create";
export const UPDATE_CONTEST_ENDPOINT_BACKEND = "/contest/update";
export const SEARCH_CONTESTS_ENDPOINT_BACKEND = "/contest/search";
export const DELETE_CONTEST_ENDPOINT_BACKEND = "/contest/delete";
export const LAUNCH_CANCEL_CONTEST_ENDPOINT_BACKEND = "/contest/launch";
export const REGISTER_CONTEST_ENDPOINT_BACKEND = "/contest/register";
export const UPDATE_RATINGS_CONTEST_ENDPOINT_BACKEND = "/updateRating";
export const GET_CONTEST_STATISTICS_BACKEND = "/contest/statistics";

export const UPDATE_ROLE_ENDPOINT_BACKEND = "/user/roles";
export const SEARCH_USER_ENDPOINT_BACKEND = "/user/search";
export const UPDATE_USER_ENDPOINT_BACKEND = "/user/update";
export const GET_USER_ENDPOINT_BACKEND = "/user/data";

export const PRE_FETCH_COLLABORATORS_AND_QUESTION_ENDPOINT_BACKEND =
  "/contest/collabAndQues";

export const GET_DASHBOARD_DATA = "/dashboard";
export const VERIFY_EMAIL_BACKEND = "/auth/verifyEmail";
export const FORGOT_PASSWORD_BACKEND = "/auth/forgotPassword";
export const SEND_FORGOT_PASSWORD_EMAIL_BACKEND = "/auth/forgotPasswordEmail";
export const RESEND_CONFIRMATION_EMAIL = "/auth/resendConfirmationEmail";
export const SUBMIT_QUESTION = "/question/submit";
export const SUBMIT_QUESTION_TEST = "/question/submit/test";
export const GET_A_QUESTION = "/question/getOneForEdit";
export const GET_SUBMISSION = "/question/getSubmission";

export const HOME_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const FORGET_PASSWORD_PAGE = "/forgotPassword";
export const RESEND_CONFIRMATION_EMAIL_PAGE = "/confirmEmail";
export const SIGNUP_PAGE = "/signup";
export const PROBLEM_SET_PAGE = "/problemset";
export const CONTEST_PAGE = "/contest";
export const INTERVIEW_PREP_PAGE = "/interviewPrep";
export const ABOUT_PAGE = "/about";
export const EVENT_PAGE = "/events";

export const SETTINGS_PAGE = "/settings";

export const ASSIGN_REVOKE_ROLES_PAGE = "/superAdmin/roles";

export const VIEW_PROBLEMS_CREATED_PAGE = "/admin/problems/view";
export const CREATE_PROBLEM_PAGE = "/admin/problems/create";

export const VIEW_CONTESTS_CREATED_PAGE = "/admin/contest/view";
export const CREATE_CONTEST_PAGE = "/admin/contest/create";
export const LAUNCH_CONTEST_PAGE = "/admin/contest/launch";
export const VIEW_CONTEST_REGISTRATIONS = "/admin/contest/registrations";
export const UPDATE_RATINGS_PAGE = "/admin/contest/updateRatings";
export const CONTEST_STATS_PAGE = "/admin/contest/stats";

export const REPORT_VIOLATIONS = "/admin/report";
export const BAN_USERS = "/superAdmin/banusers";

export const IMAGEKIT_PUBLIC_KEY = "public_bkNkzRpT9kFSd7Flmfy8NYvGr6s=";
export const IMAGEKIT_URL = "https://ik.imagekit.io/vkp8vbrb4/";
