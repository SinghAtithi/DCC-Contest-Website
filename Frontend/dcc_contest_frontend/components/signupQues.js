const signupQues = [
  {
    question: "What is your name? * ", //made change here
    skippable: false,
    state: "name",
  },
  {
    question: "Enter Your Email * ",
    skippable: false,
    state: "email",
  },
  {
    question: "Select an UserName * ",
    skippable: false,
    state: "username",
  },
  {
    question: "Type your password *",
    skippable: false,
    state: "password",
  },
  {
    question: "Confirm Your Password *",
    skippable: false,
    state: "confirmPassword",
  },
  {
    question: "Ahey, What was your name, I forgot :)",
    skippable: true,
    state: "githubURL",
  },
  {
    question: "Can you speak loudly, not audible :( - Name?",
    skippable: true,
    state: "linkedinURL",
  },
  {
    question: "Finally, we got your name. Btw What is the URL of your CodeForces Profile? *",
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
