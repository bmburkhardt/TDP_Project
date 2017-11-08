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
