const signupQues = [
  {
    question: "What is your name? ", //made change here
    skippable: false,
    state: "name",
    placeholder : "Atithi Kumar Singh",
    skippable : false,
  },
  {
    question: "Enter Your Email.",
    skippable: false,
    state: "email",
    placeholder : "coderRavan@gmail.com",
    skippable : false
  },
  {
    question: "Select an UserName",
    skippable: false,
    state: "username",
    placeholder : "coder_ravan",
    skippable : false
  },
  {
    question: "Type your password",
    skippable: false,
    state: "password",
    placeholder : "********",
    skippable : false
  },
  {
    question: "Confirm Your Password",
    skippable: false,
    state: "confirmPassword",
    placeholder : "********",
    skippable : false
  },
  {
    question: "What is the URL of your GitHub Profile?",
    skippable: true,
    state: "githubURL",
    placeholder : "You can skip it",
    skippable : true
  },
  {
    question: "What is the URL of your LinkedIn Profile?",
    skippable: true,
    state: "linkedinURL",
    placeholder : "You can skip it",
    skippable : true
  },
  {
    question: "Finally, we got your name. Btw What is the URL of your CodeForces Profile?",
    skippable: true,
    state: "codeforcesURL",
    placeholder : "coder_ravan",
    skippable : false
  },
  {
    question: "URL of your CodeChef Profile",
    skippable: true,
    state: "codechefURL",
    placeholder : "coder_ravan",
    skippable : true
  },
  {
    question: "Who are you, in a nutshell?",
    skippable: true,
    state: "bio",
    placeholder : "",
    skippable : true
  },
  {
    question: "What are your interests?",
    skippable: true,
    state: "interests",
    placeholder : "",
    skippable : true
  },
];

export default signupQues;
