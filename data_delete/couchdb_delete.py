#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#	data_delete/couchdb_delete.py
#
#					May/13/2016
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
from couchdb_delete_exec import couchdb_delete_exec
# ----------------------------------------------------------------
print ("Content-type: text/json; charset=UTF-8\n\n")

message = []
message.append ("*** couchdb_delete.py *** start ***")
#
#
os.environ["http_proxy"]=''
#
# print (os.environ['REQUEST_METHOD'])
#
form = cgi.FieldStorage()
url_del = form["url_del"].value
#
message.append (url_del)
#
#
message_aa = couchdb_delete_exec (url_del)
#
message.append ("*** couchdb_delete.py *** end ***")
#
rvalue = {}
rvalue["message"] = message
str_json = json.dumps (rvalue)
print (str_json)
#
# ----------------------------------------------------------------
