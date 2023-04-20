export const baseUrl = "https://ce54-4-240-84-221.ngrok-free.app";

export const AdminSideNavMap = {
  home: 1,
  dashboard: 2,

  assign_revoke_roles: 3,
  change_email_request: 4,

  view_problem: 5,
  create_problems: 6,
  edit_problem: 7,
  delete_problem: 8,

  view_contests: 9,
  create_contest: 10,
  edit_contest: 11,
  delete_contest: 12,
  launch_contest: 13,
  view_registrations: 14,
  view_submissions: 15,
  view_results: 16,

  report: 17,
  ban_users: 18,
};

export const PROBLEM_SEARCH = [
  "ques_id",
  "contest_id",
  "name",
  "display_after",
  "assigned",
  "is_draft",
];

export const ADMIN = "admin";
export const SUPER_ADMIN = "super_admin";
export const END_USER = "end_user";

export const USER_DASHBOARD = "/dashboard";
export const ADMIN_DASHBOARD = "/admin/dashboard";

export const BASE_URL = "https://ce54-4-240-84-221.ngrok-free.app";
export const LOGIN_ENDPOINT_BACKEND = "/auth/login";
export const SIGNUP_ENDPOINT_BACKEND = "/auth/register";
export const CREATE_QUESTION_ENDPOINT_BACKEND = "/question/create";
export const SEARCH_QUESIONS_ENDPOINT_BACKEND = "/question/search";
export const GET_DASHBOARD_DATA = "/dashboard";
export const VERIFY_EMAIL_BACKEND = "/auth/verifyEmail";
export const FORGOT_PASSWORD_BACKEND = "/auth/forgotPassword";
export const SEND_FORGOT_PASSWORD_EMAIL_BACKEND = "/auth/forgotPasswordEmail";
export const RESEND_CONFIRMATION_EMAIL = "/auth/resendConfirmationEmail";
export const SUBMIT_QUESTION = "/question/submit";
export const GET_SUBMISSION = "/question/getSubmission";

export const HOME_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const FORGET_PASSWORD_PAGE = "/forgotPassword";
export const RESEND_CONFIRMATION_EMAIL_PAGE = "/confirmEmail";
export const SIGNUP_PAGE = "/signup";
export const PROBLEM_SET_PAGE = "/ProblemSet";
export const CONTEST_PAGE = "/contest";
export const BLOGS_PAGE = "/blogs";
export const ABOUT_PAGE = "/about";

export const SETTINGS_PAGE = "/settings";

export const ASSIGN_REVOKE_ROLES_PAGE = "/super_admin/roles";
export const CHANGE_EMAIL_REQUEST_PAGE = "/super_admin/changeemail";

export const VIEW_PROBLEMS_CREATED_PAGE = "/admin/problems/view";
export const CREATE_PROBLEM_PAGE = "/admin/problems/create";
export const EDIT_PROBLEM_PAGE = "/admin/problems/edit";
export const DELETE_PROBLEM_PAGE = "/admin/problems/delete";

export const VIEW_CONTESTS_CREATED_PAGE = "/admin/contest/view";
export const CREATE_CONTEST_PAGE = "/admin/contest/create";
export const EDIT_CONTEST_PAGE = "/admin/contest/edit";
export const DELETE_CONTEST_PAGE = "/admin/contest/delete";
export const LAUNCH_CONTEST_PAGE = "/admin/contest/launch";
export const VIEW_CONTEST_REGISTRATIONS_PAGE = "/admin/contest/registrations";
export const VIEW_CONTEST_SUBMISSIONS_PAGE = "/admin/contest/submissions";
export const VIEW_CONTEST_RESULT_PAGE = "/admin/contest/results";

export const REPORT_VIOLATIONS = "/admin/report";
export const BAN_USERS = "/super_admin/banusers";
