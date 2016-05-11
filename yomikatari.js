// -----------------------------------------------------------------------
//	yomikatari/yomikatari.js
//
//					May/11/2016
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** yomikatari *** start *** May/11/2016 ***");

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
		("*** yomikatari *** end *** May/11/2016 ***");

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
// [2-4]:
function filter_proc (school_selected,gakunen_selected,month_selected,rows_in)
{
	var rows_filtered = [];

	if (school_selected === "学校　総て")
		{
		for (var it in rows_in)
			{
			rows_filtered.push (rows_in[it]);
			}
		}
	else
		{
		rows_filtered = filter_school_proc (school_selected,rows_in);
		}

	if (gakunen_selected !== "学年　総て")
		{
		rows_filtered = filter_gakunen_proc (gakunen_selected,rows_filtered);
		}

	if (month_selected !== "月　総て")
		{
		rows_filtered = filter_month_proc (month_selected,rows_filtered);
		}

	return	rows_filtered;
}

// -----------------------------------------------------------------------
// [2-4-4]:
function filter_school_proc (school_selected,rows_in)
{
	var rows_filtered = [];

	for (var it in rows_in)
		{
		var doc = rows_in[it].doc;
		var school = doc.school;
		if (school === school_selected)
			{
			rows_filtered.push (rows_in[it]);
			}
		}

	return	rows_filtered;
}

// -----------------------------------------------------------------------
// [2-4-6]:
function filter_gakunen_proc (gakunen_selected,rows_in)
{
	var rows_filtered = [];

	var gakunen_target = gakunen_selected.substring (0,1);

	for (var it in rows_in)
		{
		var doc = rows_in[it].doc;
		var kumi = doc.kumi;
		if (kumi.substring (0,1) === gakunen_target)
			{
			rows_filtered.push (rows_in[it]);
			}
		}

	return	rows_filtered;
}

// -----------------------------------------------------------------------
// [2-4-8]:
function filter_month_proc (month_selected,rows_in)
{
	var rows_filtered = [];

	var year_target = month_selected.substring (0,4);
	var llx = month_selected.length;
	var month_target = month_selected.substring (5,llx-1);

	var target = year_target + "-" + month_target;

	var lly = target.length;

	for (var it in rows_in)
		{
		var doc = rows_in[it].doc;
		var datex = doc.date;
		if (datex.substring (0,lly) === target)
			{
			rows_filtered.push (rows_in[it]);
			}
		}

	var str_tmp = "";

	str_tmp += "month_selected = " + month_selected + "<br />";
	str_tmp += "year_target = " + year_target + "<br />";
	str_tmp += "month_target = " + month_target + "<br />";
	str_tmp += "target = " + target + "<br />";

	jQuery("#outarea_cc").html (str_tmp);

	return	rows_filtered;
}

// -----------------------------------------------------------------------
