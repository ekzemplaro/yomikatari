// -----------------------------------------------------------------------
//	yomikatari/data_input/data_input.js
//
//					May/11/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** data_input *** start *** May/11/2016 ***");

	var json_in = "../conf/number_of_classes.json";


	jQuery.get (json_in,function (res)
		{
		var str_tmp = "*** ddd ***<br />";

		for (var it in res)
			{
			str_tmp += it + " ";
			str_tmp += res[it] + "<br />";
			}

		jQuery("#outarea_dd").html (str_tmp);

		display_main_proc (res);
		});

	jQuery("#outarea_hh").html
		("*** data_input *** end *** May/11/2016 ***");

});

// -----------------------------------------------------------------------
// [4]:
function display_main_proc (number_of_classes)
{
	var url_python = "python_proxy_get.py";

	var url_couchdb = "http://localhost:5984/yomikatari/";

	var url_in = url_couchdb + "_all_docs?include_docs=true";

	var args = {url: url_in};

	jQuery.post (url_python,args,function (res)
		{
		display_s2_proc (number_of_classes,res.rows);

		jQuery (".filter").change (function ()
               		{
			display_s2_proc (number_of_classes,res.rows);
			});
		});
}

// -----------------------------------------------------------------------
// [4-2]:
function display_s2_proc (number_of_classes,rows_in)
{
	var str_out = table_gen_proc (number_of_classes,rows_in);

	jQuery(".contents").html (str_out);

	click_monitor (rows_in);
}

// -----------------------------------------------------------------------
// [8]:
function click_monitor (rows_in)
{
	jQuery ("button.execute").on ('click', function ()
		{
		jQuery ("button.execute").css ("color","black");
		jQuery ("button#" + this.id).css ("color","blue");

		var data_out = selected_read_proc ();
		data_out["kumi"] = this.id;
		data_out["books"] = title_authors_read_proc (this.id);

		var key = key_define_proc (data_out["school"],data_out["date"],data_out["kumi"]);


		var str_json = JSON.stringify (data_out);
		jQuery("#outarea_dd").text (str_json);

		couchdb_update_proc (key,data_out);

		rows_update_proc (rows_in,key,data_out);
		});
}

// -----------------------------------------------------------------------
// [8-10]:
function couchdb_update_proc (key,data_out)
{
	var str_tmp = "*** couchdb_update_proc *** start ***<br />";

	str_tmp += "key = " + key;

	jQuery("#outarea_gg").html (str_tmp);

	var url_post = "./couchdb_update.py";

	var url_couchdb="http://localhost:5984";

	var url_key = url_couchdb + "/yomikatari/" + key;

	var str_json = JSON.stringify (data_out);

	var args = {url_key: url_key,my_data: str_json};

	jQuery.post (url_post,args,function (res)
		{
		var out_str =  "*** outarea_gg <br />";

	jQuery("#outarea_gg").html (out_str);

		for (var it in res.message)
			{ 
		out_str += "message: " + res.message[it] + "<br />";
			}
	jQuery("#message").html (out_str);
		});
}

// -----------------------------------------------------------------------
function rows_update_proc (rows_in,key,data_out)
{
	var out_str =  "*** outarea_cc ***<br />";
	out_str +=  "*** rows_update_proc *** start ***<br />";

	out_str +=  "key = " + key + "<br />";
	out_str +=  "rows_in.length = " + rows_in.length + "<br />";

	for (var it in rows_in)
		{
		if (rows_in[it].key === key)
			{
			out_str += "it = " + it + "<br />";
			var doc = rows_in[it].doc;
			out_str += "title[0] = " + doc.books[0].title + "<br />";
			out_str += "title[1] = " + doc.books[1].title + "<br />";
			out_str += "new title[0] = " + data_out.books[0].title + "<br />";
			out_str += "new title[1] = " + data_out.books[1].title + "<br />";

			doc.books[0].title = data_out.books[0].title;
			doc.books[1].title = data_out.books[1].title;

			for (var jt=0; jt<3; jt+= 1)
				{
				doc.books[0].authors[jt] = data_out.books[0].authors[jt];
				doc.books[1].authors[jt] = data_out.books[1].authors[jt];
				}
			}
		}

	out_str +=  "*** rows_update_proc *** end ***<br />";

	jQuery("#outarea_cc").html (out_str);
}

// -----------------------------------------------------------------------
