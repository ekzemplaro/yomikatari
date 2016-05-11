#
#
#
for key in ye2016051111 ye2016051121 ye2016051131 \
	ye2016051141 ye2016051151 ye2016051161
do
	curl -X PUT "http://localhost:5984/yomikatari/"$key -d@$key".json"
done
#
