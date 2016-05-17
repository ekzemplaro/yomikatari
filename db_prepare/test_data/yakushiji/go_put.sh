#
#
#
for key in  ya2016040111 ya2016040112 ya2016040121 ya2016040122 \
	ya2016040131 ya2016040141 ya2016040151 ya2016040161
do
	curl -X PUT "http://localhost:5984/yomikatari/"$key -d@$key".json"
done
#
