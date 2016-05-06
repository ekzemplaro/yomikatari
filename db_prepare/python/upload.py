#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#	upload.py
#
#						Apr/20/2016
# ------------------------------------------------------------------
#
import	sys
import	json
#
sys.path.append ('/var/www/data_base/common/python_common')
#
from file_io import file_to_str_proc
from curl_get import curl_put_proc
#
# ------------------------------------------------------------------
sys.stderr.write ("*** start ***\n")
file_list = sys.argv[1]
fp_in = open (file_list,encoding='utf-8')
lines = fp_in.readlines ()
fp_in.close ()
#
#
#
url_yomikatari = "http://localhost:5984/yomikatari/"
curl_put_proc (url_yomikatari,"")
#
for line in lines:
	key = line[:-1]
	file_in = key + ".json"
	print (key)
	print	(file_in)
	json_str = file_to_str_proc (file_in)
	curl_put_proc (url_yomikatari + key,json_str.encode('utf-8'))
#
sys.stderr.write ("*** end ***\n")
# ------------------------------------------------------------------
