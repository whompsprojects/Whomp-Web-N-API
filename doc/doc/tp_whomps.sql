--========================website section===============
--==>Whomps Gmail	whompsprojects@gmail.com	dec@2012

http://localhost:53198/
--==> System Credential
1. super admin
	whompsproject@gmail.com
	Admin@123
	encrypted pwd :- M4xad/etQhs3FcHyWYRZOtMplf+yvEEn
	
2. system used :- 
	SystemUser
	123456
	
3. Admin User :-
	http://13.234.181.100/whomps
	WhompsAdminUser@gmail.com
	admin@2019

4. valuefy windows sql cerdential:-
	whomps
	whomps

--==> sql server
	1. connect via user-name pwd :- 
		right click on server from object explorer -> properties -> security -> select sql server authentication 
		create user login -> object explorer -> security -> new login -> set user name & pwd

--==>AWS :- 
	ip:- 
		1. ec2-13-233-109-187.ap-south-1.compute.amazonaws.com
		2. 15.206.192.44
	username :- Administrator
	pwd :- ilhdgy)9w&iI83upZ2ffz;UKIW?4Bz94
	junk :-
		Whomps RDP Server	
		WhompsRDPServer	
		
	2. DB :-
		usrname :- EC2AMAZ-8G4TSKI\SQLEXPRESS
			windows auth
		with sql server auth:- 
				Whomp
				no1can@2012
				
	3. TFS Server :- 
		dev.azure.com/whompsprojects
		whompsprojects@gmail.com
		july@2012
		
--==>whomps git :- 
	to create new id :- ssh-keygen -t rsa -b 4096 -C "whompsproject@gmail.com"
	to code ssh :- clip < ~/.ssh/id_rsa.pub
	
		
--==>Godaddy configuration with AWS :-
	
		
--==>namecheap :-
	uname :- whomps
	pwd :-	12345678
	
--==>goDady :-
	uname :- whompsprojects@gmail.com
	pwd :-	n01can@2012

--==>https://www.twilio.com/
	uname :- whompsprojects@gmail.com
	pwd :- No1canVidya@2012
				
				
--========================sp to be uploaded in next deployment ===============--d
1. 

--========================Notes===============
	1 . IIS setting :- application pool identity to LocalSystem for local db connection without user name pwd
	https://www.codeproject.com/Articles/171695/Dynamic-CSS-using-Razor-Engine
	Microsoft Visual Studio Team Foundation Server 2013 Power Tools
	https://www.c-sharpcorner.com/blogs/send-email-using-gmail-smtp

	http://localhost:57704/API/Account/AuthenticateUser

	--==> iis configuration in AWS
	https://www.youtube.com/watch?v=OPHT0ozZOj4&t=353s

	3. font awesome link :- 
		1. https://fontawesome.com/icons 
		2. our code for e.g operation icon :- fa fa-check fa-3x circled bg-skin 
			font awesome :-  <i class="fa-solid fa-barcode"></i> 
			updated  :- fa fa-barcode fa-3x circled bg-skin 
		3. (note :- only check replace with barcode)

--========================Version 2===============
0. in team
	0.2 :- get data by department --V2
	0.3 :- color the Add update dep -- V2
1. creation of facilities   --- department to complete with arrow sign as down in team --v2
3. creation of Health packages -- V2
	3.1 Creation of currency master for package -- V2
5. in team
	0.2 :- get data by department --V2
	0.3 :- color the Add update dep -- V2
7. Team_Profesnal_Det

										--============Pending task ===========
1. all department issue --d
2. Mail is not sending via whomps mail id, debug & see the password
2. issue while edting information at footer level, where 2 edit icon was comming
19.3 Create whomps website from I.T company --d
19.4 Gather details for classes in common excel sheet
20. Learn photo-shop  --d
26. Under-Construction page
21. Testing of end to end module --p

--===============table==========
1. Error_Logger

--==>website
	2. 	Wmp_Web_Hdr
	3. 	Wmp_Web_Menu
	4. 	Wmp_Web_Slogan
	5. 	Wmp_Web_Lead_Fields
	6. 	Wmp_Web_Oper_Flow
	7. 	Wmp_Web_Products
	8. 	Wmp_Web_Team
	8.5 Wmp_Web_TeamDepartment
	9. 	Wmp_Web_Facility
	10. Wmp_Web_FeedBk
	11. Wmp_Web_Package
	12. Wmp_Web_Pack_Point_Det
	13. Wmp_Web_Partner
	14. Wmp_Web_Information
	15. Wmp_Web_Contact
	16. Wmp_Web_SocailNtwk
	17. Wmp_Web_Hit
	18. Wmp_Web_Lead
--===============sp==========
1. USP_Error_Logger
1.5 USP_Wmp_GetWebsiteDetail
2. USP_Wmp_AddEdit_Website
3. USP_Wmp_UpdateWebStatus
4. USP_Wmp_GetData_Website
5. USP_Wmp_GenerateLead

--===============junk==========	
	drop table Menu_Role_Relation_Master

select * into Menu_Role_Relation_Master from [BPS].[dbo].[Menu_Role_Relation_Master]

INSERT INTO [dbo].[Menu_Master]([Menu_ID],[MenuName],[ControllerName],[ActionName],[ParentID],[Sequence_No],[User_Wish_Sequence_No]
 ,[Menu_Icon_Path],[Status],[CreatedAt],[CreatedBy],[UpdatedAt],[UpdatedBy])
VALUES(14,'Update Website','Website','CreateWebsite?WebIsAdd=false',11,4,null,null,1,getdate(),1,getdate() ,1)

--===========Images===========
1. Logo :- Content/Images/CompressLogoWhomps.png
7. hdr wala bckGrd :-   Whomps\Content\Images\WebsiteCreation\dummy\bg1.jpg
8. feedbkp wala bckGrd :-    Whomps\Content\Images\WebsiteCreation\parallax\bg1.jpg
2. product :- Content/Images/WebsiteCreation/dummy/img-1.jpg
3. Team :- Content/Images/WebsiteCreation/team/1.jpg
4. Facilities :- Content/Images/WebsiteCreation/photo/1.jpg
5. FeedBk :- Content/Images/WebsiteCreation/testimonials/1.jpg
6. partner :- Content/Images/WebsiteCreation/dummy/partner-1.jpg

--==Email template :- 
http://c0185784a2b233b0db9b-d0e5e4adc266f8aacd2ff78abb166d77.r51.cf2.rackcdn.com/v1_templates/template_01.html

http://c0185784a2b233b0db9b-d0e5e4adc266f8aacd2ff78abb166d77.r51.cf2.rackcdn.com/v1_templates/template_03.html

http://localhost/WhompsApi/API/

--==> call api :- 
	1. start the api in vs code by setting it as start project 
	2. in advance rest client:- 
		http://localhost:57704/API/Account/AuthenticateUser
		header :- 
			1. Content-Type :- application/json
			2. Authorization :- Basic WhompAuthName:authValue
		body :- 
			{
			  "email_id": "WhompsAdminUser@gmail.com",
			  "pwd": "admin@2019"
			}

--==> pending points  :- 
	 --> 04 Jun 2022 :- 
	 1. handle our partner if not record there --d
	 2. remove backgorud image of no feedback is there --d
	 3. add get poc font-icon --d
	 4. handle the log error some time in file explorer -- rnd
	 5. create whomps website 
	 6. gather shivam hotel website data 
	 7. create shivam website

	 8. information two edit icon --d
	 9. remove delete confirmation --d
		

		http://localhost:53198/Website/ViewWebsite?Web_ID=30082

		--==> website maker is done <==-