const signupQues = [
      {
            question: "What is your name?",
            skippable: false,
            state:"name",
      },
      {
            question: "Select an UserName",
            skippable: false,
            state:"username",
      },
      {
            question: "Type your password",
            skippable: false,
            state:"password",
      },
      {
            question: "URL of your Github Profile",
            skippable: true,
            state:"githubURL",
      },
      {
            question: "URL of your LinkedIn Profile",
            skippable: true,
            state:"linkedinURL",
      },
      {
            question: "URL of your CodeForces Profile",
            skippable: true,
            state:"codeforcesURL",
      },
      {
            question: "URL of your CodeChef Profile",
            skippable: true,
            state:"codechefURL",
      },
      {
            question: "Who are you, in a nutshell?",
            skippable: true,
            state:"bio",
      }, {
            question: "What are your interests?",
            skippable: true,
            state:"interests",
      }
]

export default signupQues;