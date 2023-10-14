const signupQues = [
  {
    question: "What is your name(*required)?", //made change here
    skippable: false,
    state: "name",
  },
  {
    question: "Enter Your Email(*required)",
    skippable: false,
    state: "email",
  },
  {
    question: "Select an UserName(*required)",
    skippable: false,
    state: "username",
  },
  {
    question: "Type your password(*required)",
    skippable: false,
    state: "password",
  },
  {
    question: "Confirm Your Password(*required)",
    skippable: false,
    state: "confirmPassword",
  },
  {
    question: "URL of your Github Profile",
    skippable: true,
    state: "githubURL",
  },
  {
    question: "URL of your LinkedIn Profile",
    skippable: true,
    state: "linkedinURL",
  },
  {
    question: "URL of your CodeForces Profile(*required)",
    skippable: true,
    state: "codeforcesURL",
  },
  {
    question: "URL of your CodeChef Profile",
    skippable: true,
    state: "codechefURL",
  },
  {
    question: "Who are you, in a nutshell?",
    skippable: true,
    state: "bio",
  },
  {
    question: "What are your interests?",
    skippable: true,
    state: "interests",
  },
];

export default signupQues;
