#
for id in  yw2016040111 yw2016040121 yw2016040131 \
	yw2016040141 yw2016040151 yw2016040161
do
	curl "http://localhost:5984/yomikatari/"$id > $id".json"
done
#
