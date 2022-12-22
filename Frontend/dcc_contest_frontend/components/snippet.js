const snippet = ["#include <bits/stdc++.h>",
      "using namespace std;",
      "",
      "void solve()",
      "{",
      "     ",
      "}",
      "",
      "int main()",
      "{",
      "      ios_base::sync_with_stdio(false);",
      "      cin.tie(NULL);",
      "      cout.tie(NULL);",
      "",
      "      int Test_Cases = 1;",
      "      // cin>>Test_Cases;",
      "",
      "      while (Test_Cases--)",
      "      {",
      "            solve();",
      "      }",
      "      ",
      "      return 0;",
      "}"]


// create a string which will be merger of elements of snippet array
let code = ""
snippet.forEach((line) => {
      code += line + "\n";
})

export default code