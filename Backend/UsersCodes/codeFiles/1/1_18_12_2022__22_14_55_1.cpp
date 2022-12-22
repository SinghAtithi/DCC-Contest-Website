#include<iostream>
using namespace std;
int main(){
    int a,b,c;
    cin>>a>>b>>c;
    int maxi = max(max(a,b),c);
    int mini = min(min(a,b),c); 
    cout<<maxi<<endl;
    cout<<mini;
long long sum = 0;
//int sum=0;
for(int i=0;i<10000;i++){
  for(int j=0;j<10000;j++){
   sum=sum+i+j;
  }
}

    return 0;
}