#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#	delete.py
#
#						May/02/2016
# ------------------------------------------------------------------
#
import	sys
import	json
#
sys.path.append ('/var/www/data_base/common/python_common')
#
from curl_get import curl_get_proc
from curl_get import curl_delete_proc
#
# ------------------------------------------------------------------
sys.stderr.write ("*** start ***\n")
key_in = sys.argv[1]
#
#
#
url_yomikatari = "http://localhost:5984/yomikatari/"
#
url_key = url_yomikatari + key_in
#
str_buf_aa = curl_get_proc (url_key)
#
unit_aa = json.loads (str (str_buf_aa,'UTF-8'))
#
if ('_rev' in unit_aa):
	print (unit_aa['_rev'])
	url_del = url_key + '?rev=' + unit_aa['_rev']
	curl_delete_proc (url_del)
else:
	print ("*** not exist ***")
	print (unit_aa)
#
sys.stderr.write ("*** end ***\n")
# ------------------------------------------------------------------
