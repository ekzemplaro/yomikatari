#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#	data_input/couchdb_update.py
#
#					Apr/30/2016
#
# ----------------------------------------------------------------
import os
import sys
import pycurl
import json
import cgi
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
form = cgi.FieldStorage()
url_key = form["url_key"].value
my_data = form["my_data"].value
#
message.append (url_key)
message.append (my_data)
#
#
message_aa = couchdb_update_exec (url_key,my_data)
#
message.append ("*** couchdb_update.py *** end ***")
#
rvalue = {}
rvalue["message"] = message
rvalue["my_data"] = my_data
str_json = json.dumps (rvalue)
print (str_json)
#
# ----------------------------------------------------------------
