// -----------------------------------------------------------------------
//	yomikatari/data_delete/data_delete.js
//
//					May/13/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** data_delete *** start *** May/13/2016 ***");

	var data_text = "";

	var url_python = "python_proxy_get.py";

	var url_couchdb = "http://localhost:5984/yomikatari/";

	var url_in = url_couchdb + "_all_docs?include_docs=true";

	var args = {url: url_in};

	jQuery.post (url_python,args,function (res)
		{
		display_delete_proc (res);

		jQuery (".filter").change (function ()
               		{
			display_delete_proc (res);
			});
		});

	jQuery("#outarea_hh").html
		("*** data_delete *** end *** May/13/2016 ***");

});

// -----------------------------------------------------------------------
// [2]:
function display_delete_proc (res)
{
	var school_selected = jQuery ("#school").val ();
	var gakunen_selected = jQuery ("#gakunen").val ();
	var month_selected = jQuery ("#month").val ();

	var str_tmp = "school = " + school_selected + "<br />";
	str_tmp += "gakunen = " + gakunen_selected + "<br />";
	str_tmp += "month = " + month_selected + "<br />";

	jQuery("#outarea_bb").html (str_tmp);

	var rows_filtered = filter_proc
		(school_selected,gakunen_selected,month_selected,res.rows);

	var str_out = delete_table_gen_proc (rows_filtered);

	jQuery(".contents").html (str_out);

	click_monitor (rows_filtered);
}

// -----------------------------------------------------------------------
function click_monitor (rows_filtered)
{

	jQuery ("button.execute").on ('click', function ()
		{
		var id_rev_delete = [];

		for (var it in rows_filtered)
			{
			var id_aa = rows_filtered[it].key;
			var rev_aa = rows_filtered[it].value.rev;
			var status = jQuery ('#' + id_aa).prop ('checked');

			if (status)
				{
				id_rev_delete.push ([id_aa,rev_aa]);
				}
			}

		couchdb_delete_proc (id_rev_delete);

		});
}

// -----------------------------------------------------------------------
function couchdb_delete_proc (id_rev_delete)
{
	var str_tmp = "";

	for (var it in id_rev_delete)
		{
		str_tmp += "it = " + it + " : ";
		str_tmp += "key = " + id_rev_delete[it][0] + " : ";
		str_tmp += "rev = " + id_rev_delete[it][1] + "<br />";
		}


	var url_post = "./couchdb_update.py";

	var url_couchdb="http://localhost:5984";

	for (var it in id_rev_delete)
		{
		var key = id_rev_delete[it][0];
		var rev = id_rev_delete[it][1];

	var url_del = url_couchdb + "/yomikatari/" + key + "?rev=" + rev;
		str_tmp += url_del + "<br />";

		var args = {url_del: url_del};

		var url_post = "./couchdb_delete.py";

		jQuery.post (url_post,args,function (res)
			{
			var out_str =  "*** outarea_gg <br />";
			});
		}

	jQuery("#outarea_cc").html (str_tmp);
}

// -----------------------------------------------------------------------
