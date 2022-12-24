#include <bits/stdc++.h>
using namespace std;

void solve()
{
     int n;cin>>n;
     vector<int>v(n);
     for(auto &x:v)cin>>x;
     sort(v.begin(), v.end());
     cout<<v[n-1]<<" "<<v[0];
}

int main()
{
      ios_base::sync_with_stdio(false);
      cin.tie(NULL);
      cout.tie(NULL);

      int Test_Cases = 1;
      // cin>>Test_Cases;

      while (Test_Cases--)
      {
            solve();
      }
      
      return 0;
}
