# TDP_Project

Accessing Public Website
========================

	API url : ec2-18-216-8-189.us-east-2.compute.amazonaws.com/explorer

	Website url : ec2-18-216-8-189.us-east-2.compute.amazonaws.com

Installation and Usage on Local Machine
=======================================

Requirements:

	1. Linux based OS (preferably Ubuntu)
	2. Clone repository
		2.1 https://github.com/bmburkhardt/TDP_Project.git
	3. NodeJS and npm
		3.1 sudo apt-get update
		3.2 sudo apt install nodejs npm
	4. MongoDB
		4.1 Install using this tutorial:
			https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/
	5. Loopback
		5.1 cd to TDP_Project
		5.2 sudo npm install loopback
		5.3 sudo npm install
		5.4 sudo service mongod start
		5.5 sudo npm install --save loopback-connector-mongodb
	6. Angular
		6.1 sudo npm install --save angular

Starting the service:

	1. cd to TDP_Project
	2. npm start

Accessing the service:

	1. API - open a web browser and enter the following url:
		http://localhost:8080/explorer
	2. Website - opena  web browser and enter the following url:
		http://localhost:8080

Scanner Application:
	
	1. Download android studio
	2. Open project in scannerTest folder

	
Model overview
==============

For the plural of a model add an 's' to the end of the word.
	
	person
	registrant(work in progress)
	convention
	subConvention
	


Model Relationships
===================

subconvention belongs to convention
convention has many subConventions


person has a one-to-one relationship with registrant


convention has many registrants
registrant has one convention


subConvention has many registrants
registrant has many subConventions