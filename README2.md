These steps should provide a quick tutorial on how this works.


1.) Create a convention
	1.1) POST a convention
	1.2) Copy the "id" from the convention

2.) Create a person
	2.1) POST a person

3) Subconvention
	3.1) Go to POST subconvention
	3.2) Where it says "conventionId" paste the id from the convetion, and submit the POST.

4) Adding a registrant to a subconvention
	4.1) Go back to person and copy the Id.
	4.2) Under subconvention go to: POST /subConventions/{id}/registrantArr 
	4.3) Paste the person id for the "personId". The "conventionId" can stay as string.
	4.4)GET the "id" from the subconvention and copy it.
	4.5)go back to POST /subConventions/{id}/registrantArr and paste the id into the (required) field
	
5) Checking it worked.
	5.1)Copy the id from the "registrantIds"
	5.2) Go under registrants and go to: GET /registrants/{id} 
	5.3)Paste the id in the required field. 
	5.4)This will return the model that has the "personId". Copy the "personId"
	5.5) Under person, go to: GET /persons/{id} 
	5.6) Paste the personId into the required field, this should return the person model.

These steps should remain the same for anything you want to do.

	Doing this will create a registrant. This registrant is now in the registrantArr in the subconvention.
	The only thing a registrant holds is the personId which links it to the person model. 
	The person model does not know how many registrants is connecting to itself (person model).	 
	The registrant only knows the person it is connecting to.
	Subconventions and conventions only know the registrantId.