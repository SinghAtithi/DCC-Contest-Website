# Every task will be updated here

>- [x] 1. Get the language and code as post request and develop a mechanism to execute it.
>- [x] 2. Set up a mechanism to give inputs to the code.
>- [x] 3. Set up the database to store questions - 
> >* ques_id 
> >* ques_no
> >* name
> >* Description
> >* Constraints
> >* Input Format
> >* Output Format
> >* Expected Time Limit (in seconds)
> >* Public Test Cases : [{input,output}]
> >* Private Test Cases : [{input,output}]
> >* no_of_public_test_cases 
> >* no_of_private_test_cases 
> >* topics
> >> <strong>Extra</strong> : Added an endpoint /question/create to create questions. While the question is being created, .txt files for inputs and outputs are also created.
>- [x] 4. How to exeute multiple test cases , compare results and give the final verdict ?
> >> <strong>Extra</strong> : Added an endpoint /submit that will evaluate the code using private test cases.
>- [x] 5. Handle TLE
> >> <strong>Extra</strong> : Added endpoints /question to get the list of ques_no,name and topics of all questions and question/:ques_id to get question by ques_no
>- [x] 6. Set up the database to store user details :
> >* user_id
> >* user_name
> >* name
> >* email
> >* password
> >* questions_solved
>- [x] 7. Set up the database to store the code :
> >* ques_id
> >* user_id
> >* language
> >* Code Body
>- [x] 8. Set up the apis to get the question and code(if solved).
>> <strong>Extra</strong> : Added endpoints /code/:ques_no to get all the attempts of code and /code/:ques_no/:attempt_no to get the code by attempt_no
>- [ ] 9. Authentication and Authorisation
>- [ ] 10. Implementing JobQueues
>- [x] 11. Cleaning files
