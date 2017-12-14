mongodump -d tdpDB 
find dump/tdpDB -type f -name \*.bson | while read line; do
	echo "Processing file '$line'"
	bsondump $line  >> report.csv
done
cat report.csv
