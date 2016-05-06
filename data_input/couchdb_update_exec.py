# -*- coding: utf-8 -*-
#
#	data_input/couchdb_update_exec.py
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
from curl_get import curl_get_proc
from curl_get import curl_put_proc
#
# ----------------------------------------------------------------
def couchdb_update_exec (url_key,my_data):
	message = []
	message.append ("*** couchdb_update_exec *** start ***")
#
	rev = ""
	try:
		str_json = curl_get_proc (url_key)
		message.append (str_json)
		data_aa = json.loads (str (str_json,'UTF-8'))
		message.append (data_aa["_rev"])
		rev = data_aa["_rev"]
	except Exception as ee:
		sys.stderr.write ("*** error *** from curl_get_proc ***\n")
		message.append ("*** error *** curl_get_proc ***")
		message.append (str (ee))
#
	message.append ("*** couchdb_update_exec *** ccc ***")
#
	data_bb = json.loads (my_data)
	if (rev != ""):
		data_bb["_rev"] = rev
	out_str = json.dumps (data_bb)
#
	try:
		curl_put_proc (url_key,out_str.encode ('utf-8'))
	except Exception as ee:
		sys.stderr.write ("*** error *** from curl_put_proc ***\n")
		message.append ("*** error *** curl_put_proc ***")
		message.append (str (ee))
#
	message.append ("*** couchdb_update_exec *** end ***")
#
	return	message
# ----------------------------------------------------------------
