# iitoffice
Final Year Project
Working of IIT Office automation.

We have 5 types of users.
1. Anonymous User (Student)
2. Admin
3. Diary Manager
4. Attendance Manager
5. Attendance User
6. Student Support Manager


and 4 Modules
1. Student Support Center
2. Diary Management System
3. Attendance Management System 
4. User Management System

1. Student Support System
Student Support System is handle by admin and student support manager only.
Anonymous user can only submit complaints. While submitting complaint user ip address will fetched. User can complaints 3 times within 12 hours. If user exceed 3 times then display error "You can only complaint 3 times in 12 hours".
Admin can see submitted complaints with user ip address. Admin can block and unblock user on the bases of ip address. If admin block the user. and user tries to submit complaint then display error "You are blocked". 
Admin and Student Suppor Manager can reply to sumitted complaint. Anonymous user can check complaint status. after checking complaint status complaint will automatically deleted from database.

Anonymous user having queries about admission, about subject offers, about fees, about result, about classes schedules etc can fill the form and submit. Admin and student support manager
can see the submitted queries and can reply to submitted queries to their email address. Student can check his reply on their email address. After reply query will automatically deleted from database.

2. Diary Management System
Diary management system will handle by admin and diary manager. Diary manager only access diary management system . We have 2 register in Diary Management System. 
1. Dispatch Register
2. Peon Book

In Dispatch register when user add new dispatch register. It check if form is empty it display error "Fill the entire form". If form is filled then confirmation message come. if user clicks yes, 
then it add record in dispatch register. If user clicks no, then it will not add register.

In Peon Book, when user add new peon book. It check if form is empty it display error "Fill the entire form". If form is filled then confirmation message come. if user clicks yes, 
then it add record in dispatch register and send link to email entered in form. Status of Peon book will unverified. If Receiver clicks link then status changes to Verified. 
If user clicks no, then it will not add register.


After adding record of Peonbook and dispatch register


3. Attendance Management System

Attendance Management System will handle by admin and attendance manager. Attendance manager can only access attendance management system.
When Admin or Attendance Manager clicks Mark attendance. It will ask to select attendance user. If attendance user is selected then it shown button of Add Attendance. If Admin or Attendance Manager clicks add attendance it will show
pop up with 3 buttons.
1. Today Attendance
2. Absent
3. On Leave



1. When Admin or Attendance Manager clicks Today attendance. It will add attendance with status Present. and TimeOut will appear. If user clicks TimeOut button then it will update TimeOut Button. 
If TimeOut button is not pressed then default time 4:00 pm is saved in TimeOut.
2. When Admin or Attendance Manager clicks Absent. It will add attendance with status Absent.
3. When Admin or Attendance Manager clicks On Leave. Pop up appear to upload leave picture. If picture is uploaded then it mark attendance with status On Leave.




When Admin or Attendance Manager clicks Mark attendance. It will ask to select attendance user. If attendance user is selected then it ask to select date range. If date range and user is not selected then it show error. 
After selecting date range it show 2 buttons.
1. Show Attendance
2. Export 

1. When Admin or Attendance Manager clicks Show Attendance. It will show attendance of selected Date Range.
2. When Admin or Attendance Manager clicks Export. It will export attendance of selected Date Range in excel.



User Management System
User Management System is handle by Admin Only.
When Admin clicks Add User. A pop up will come to select user. If selected user is Attendance User then it will disappear password field for attendance user only. Otherwise display all fields with password. 
It check if form is empty it display error "Fill the entire form". Otherwise send otp to email. If Otp do not matches then display error "OTP not match". If Otp matches then register user.
Admin can also update user details.
