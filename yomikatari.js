// -----------------------------------------------------------------------
//	yomikatari/yomikatari.js
//
//					May/13/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** yomikatari *** start *** May/13/2016 ***");

	var data_text = "";

	var url_python = "python_proxy_get.py";

	var url_couchdb = "http://localhost:5984/yomikatari/";

	var url_in = url_couchdb + "_all_docs?include_docs=true";

	var args = {url: url_in};

	jQuery.post (url_python,args,function (res)
		{
		display_s2_proc (res);

		jQuery (".filter").change (function ()
               		{
			display_s2_proc (res);
			});
		});

	jQuery("#outarea_hh").html
		("*** yomikatari *** end *** May/13/2016 ***");

});

// -----------------------------------------------------------------------
// [2]:
function display_s2_proc (res)
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

	var str_out = display_table_gen_proc (rows_filtered);

	jQuery(".contents").html (str_out);
}

// -----------------------------------------------------------------------
