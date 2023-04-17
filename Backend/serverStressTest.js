const autocannon = require("autocannon")
const { request } = require("express")

async function test() {
      const instance = autocannon({
            url: "http://4.240.84.221:5000/question/submit",
            connections: 5,
            duration: 5,
            workers: 1,
            method: "POST",
            //             body: {
            //                   code: `/*
            //     कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
            //     मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥

            //     Karmanye vadhikaraste Ma Phaleshu Kadachana,
            //     Ma Karmaphalaheturbhurma Te Sangostvakarmani,

            //     The meaning of the verse is :—
            //     You have the right to work only but never to its fruits.
            //     Let not the fruits of action be your motive, nor let your attachment be to
            //    inaction
            // */

            // #include <math.h>
            // #include <algorithm>
            // #include <climits>
            // #include <iomanip>
            // #include <iostream>
            // #include <cstring>
            // #include <list>
            // #include <map>
            // #include <queue>
            // #include <set>
            // #include <stack>
            // #include <string>
            // #include <utility>
            // #include <unordered_map>
            // #include <vector>
            // #define int int64_t
            // #define vi vector<int>
            // #define vii vector<pair<int, int>>
            // #define vs vector<string>
            // #define vc vector<char>
            // #define vb vector<bool>
            // #define pb emplace_back
            // #define vvi vector<vector<int>>
            // #define mii map<int, int>
            // #define mci map<char, int>
            // #define pii pair<int, int>
            // #define mp make_pair
            // #define all(x) (x).begin(), (x).end()
            // #define vin(x, v)       \
            //       for (auto &x : v) \
            //             cin >> x;
            // #define vout(x, v)     \
            //       for (auto x : v) \
            //             cout << x << " ";
            // #define MEM(a, b) memset(a, (b), sizeof(a))
            // #define loop(i, j, k) for (int i = j; i < k; i += 1)
            // #define rloop(i, j, k) for (int i = j; i >= k; i -= 1)
            // #define rep(i, j) loop(i, 0, j)
            // #define rrep(i, j) rloop(i, j, 0)
            // #define MP make_pair
            // #define endl "\n"
            // #define INF (int)1e18
            // #define EPS 1e-18
            // #define PI 3.1415926535897932384626433832795
            // #define MOD 1000000007
            // #define MODD 998244353
            // // cout <<setprecision(15)
            // #define NEED_FOR_SPEED_MOST_WANTED      \
            //       ios_base::sync_with_stdio(false); \
            //       cin.tie(NULL);                    \
            //       cout.tie(NULL)
            // using namespace std;

            // /*-----------------------------------D-E-B-U-G-----------------------------------------------*/
            // #ifndef ONLINE_JUDGE
            // #define deb(x)           \
            //       cerr << #x << " "; \
            //       _print(x);         \
            //       cerr << endl;
            // #else
            // #define deb(x)
            // #endif

            // void _print(int t)
            // {
            //       cerr << t;
            // }
            // void _print(string t) { cerr << t; }
            // void _print(char t) { cerr << t; }
            // void _print(long double t) { cerr << t; }
            // void _print(double t) { cerr << t; }
            // void _print(unsigned long long t) { cerr << t; }

            // template <class T, class V>
            // void _print(pair<T, V> p);
            // template <class T>
            // void _print(vector<T> v);
            // template <class T>
            // void _print(set<T> v);
            // template <class T, class V>
            // void _print(map<T, V> v);
            // template <class T>
            // void _print(multiset<T> v);
            // template <class T, class V>
            // void _print(pair<T, V> p)
            // {
            //       cerr << "{";
            //       _print(p.first);
            //       cerr << ",";
            //       _print(p.second);
            //       cerr << "}";
            // }
            // template <class T>
            // void _print(vector<T> v)
            // {
            //       cerr << "[ ";
            //       for (T i : v)
            //       {
            //             _print(i);
            //             cerr << " ";
            //       }
            //       cerr << "]";
            // }
            // template <class T>
            // void _print(set<T> v)
            // {
            //       cerr << "[ ";
            //       for (T i : v)
            //       {
            //             _print(i);
            //             cerr << " ";
            //       }
            //       cerr << "]";
            // }
            // template <class T>
            // void _print(multiset<T> v)
            // {
            //       cerr << "[ ";
            //       for (T i : v)
            //       {
            //             _print(i);
            //             cerr << " ";
            //       }
            //       cerr << "]";
            // }
            // template <class T, class V>
            // void _print(map<T, V> v)
            // {
            //       cerr << "[ ";
            //       for (auto i : v)
            //       {
            //             _print(i);
            //             cerr << " ";
            //       }
            //       cerr << "]";
            // }
            // /*-----------------------------------D-E-B-U-G-----------------------------------------------*/

            // void solve()
            // {
            //       rep(i,100000000){
            //             i++;
            //             i--;
            //       }
            //       int n;cin>>n;
            //       cout << n;
            // }

            // signed main()
            // {
            //       NEED_FOR_SPEED_MOST_WANTED;
            //       // cout << setprecision(15);
            //       int t = 1;
            //       // cin >> t; 
            //       while (t--)
            //       {
            //             solve();
            //             cout << endl;
            //       }
            // }`
            //             }
      })

      instance.on("start", () => {
            console.log("started")
      })

      instance.on("done", handleResult);

      instance.on("response", handleResponse);

      function handleResult(result) {
            console.log("result", result)
      }

      function handleResponse(client, statusCode, resBytes, responseTime) {
            console.log(`Got response with code ${statusCode} in ${responseTime} milliseconds`)
            console.log(`response: ${resBytes.toString()}`)

            //update the body or headers
            client.setHeaders({ new: 'header' })
            client.setBody('new body')
            client.setHeadersAndBody({ new: 'header' }, 'new body')
      }

      autocannon.track(instance, { renderProgressBar: true })
}

test()