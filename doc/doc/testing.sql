delete  from 	Wmp_Web_Hdr
 delete from 	Wmp_Web_Menu
 delete from 	Wmp_Web_Slogan
 delete from 	Wmp_Web_Lead_Fields
 delete from 	Wmp_Web_Oper_Flow
 delete from 	Wmp_Web_Products
 delete from 	Wmp_Web_Team
 delete from 	Wmp_Web_Facility
 delete from  Wmp_Web_FeedBk
 delete from  Wmp_Web_Package
 delete from  Wmp_Web_Pack_Point_Det
 delete from  Wmp_Web_Partner
 delete from  Wmp_Web_Information
 delete from  Wmp_Web_Contact
 delete from  Wmp_Web_SocailNtwk
 DBCC CHECKIDENT ('Wmp_Web_Hdr', RESEED, 0)	 
 DBCC CHECKIDENT ('Wmp_Web_Package', RESEED, 0) 

select top 100 status,* from 	Wmp_Web_Hdr		;		  where web_id=7
select * from general_master
select top 100 * from 	Wmp_Web_Menu			  where webid=7
select top 100 * from 	Wmp_Web_Slogan			  where webid=7
select top 100 * from 	Wmp_Web_Lead_Fields		  where webid=7
select top 100 * from 	Wmp_Web_Oper_Flow		  where webid=7
select top 100 * from 	Wmp_Web_Products		  where webid=7
select top 100 * from 	Wmp_Web_Team  			  where webid=7
select top 100 * from 	Wmp_Web_TeamDepartment	  where webid=7
select top 100 * from 	Wmp_Web_Facility		  where webid=7
select top 100 * from  Wmp_Web_FeedBk			  where webid=7
select top 100 * from  Wmp_Web_Package			  where webid=7
select top 100 * from  Wmp_Web_Pack_Point_Det	  where webid=7
select top 100 * from  Wmp_Web_Partner			  where webid=7
select top 100 * from  Wmp_Web_Information		  where webid=7
select top 100 * from  Wmp_Web_Contact			  where webid=7
select top 100 * from  Wmp_Web_SocailNtwk		  where webid=7

