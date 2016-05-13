# -*- coding: utf-8 -*-
#
#	data_delete/couchdb_delete_exec.py
#
#					May/13/2016
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
from curl_get import curl_delete_proc
#
# ----------------------------------------------------------------
def couchdb_delete_exec (url_del):
	message = []
	message.append ("*** couchdb_delete_exec *** start ***")
#
	try:
		curl_delete_proc (url_del)
	except Exception as ee:
		sys.stderr.write ("*** error *** from curl_delete_proc ***\n")
		message.append ("*** error *** curl_delete_proc ***")
		message.append (str (ee))
#
	message.append ("*** couchdb_delete_exec *** end ***")
#
	return	message
# ----------------------------------------------------------------
