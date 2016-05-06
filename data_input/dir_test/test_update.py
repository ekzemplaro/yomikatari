#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#	data_input/dir_test/test_update.py
#
#					Apr/30/2016
#
# ----------------------------------------------------------------
import os
import sys
import pycurl
import json
#
sys.path.append ('/var/www/data_base/common/python_common')
#
from couchdb_update_exec import couchdb_update_exec
# ----------------------------------------------------------------
print ("Content-type: text/json; charset=UTF-8\n\n")

message = []
message.append ("*** couchdb_update.py *** start ***")
#
#
os.environ["http_proxy"]=''
#
# print (os.environ['REQUEST_METHOD'])
#
#
url_couchdb="http://localhost:5984/yomikatari/"
#
# key="ye2016040251"
key="ye2016040261"
#
url_key= url_couchdb + key
#
my_data="{\"school\":\"吉田東小\",\"kumi\":\"5-1\",\"date\":\"2016-4-2\",\"books\":[{\"title\":\"草枕\",\"authors\":[\"夏目漱石\",\"bbbb\",\"\"]},{\"title\":\"oooo\",\"authors\":[\"\",\"\",\"\"]}]}"
#
message.append (url_key)
message.append (my_data)
#
#
message_aa = couchdb_update_exec (url_key,my_data)
message += message_aa
#
message.append ("*** couchdb_update.py *** end ***")
#
for line in message:
	print (line)
#
# ----------------------------------------------------------------
