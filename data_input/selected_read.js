// -----------------------------------------------------------------------
//	yomikatari/data_input/selected_read.js
//
//					Apr/22/2016
//
// -----------------------------------------------------------------------
// [8-4]:
function selected_read_proc ()
{
	var school_selected = jQuery ("#school").val ();
	var month_selected = jQuery ("#month").val ();
	var day_selected = jQuery ("#day").val ();

	var str_out = "school = " + school_selected + "<br />";
	str_out += "month = " + month_selected + "<br />";
	str_out += "day = " + day_selected + "<br />";
	jQuery("#outarea_bb").html (str_out);

	var data_out = new Object;

	data_out["school"] = school_selected;
	data_out["kumi"] = this.id;

//	var date_aa = month_selected.replace ("年","-");
//	date_aa = date_aa.replace ("月","-");
//	var date_selected = date_aa + day_selected.replace ("日","") ;
	var date_selected = selected_date_proc ();

	data_out["date"] = date_selected;

	return	data_out;
}

// -----------------------------------------------------------------------
function selected_date_proc ()
{
	var month_selected = jQuery ("#month").val ();
	var day_selected = jQuery ("#day").val ();

	var date_selected = "";

	var date_aa = month_selected.replace ("年","-");
	date_aa = date_aa.replace ("月","-");

	date_selected = date_aa + day_selected.replace ("日","") ;

	return	date_selected;
}

// -----------------------------------------------------------------------
// [8-6]:
function title_authors_read_proc (id_button)
{
	var books = new Object ();
	var book_a = new Object ();
	var book_b = new Object ();

	var id_title_a = id_button + "-a";
	var id_title_b = id_button + "-b";

	var id_authors_a = new Array(3);
	var id_authors_b = new Array(3);

	for (var it=0; it<=2; it++)
		{
		id_authors_a[it] = id_button + "-a-" + it;
		id_authors_b[it] = id_button + "-b-" + it;
		}

	book_a["title"]=jQuery('#' + id_title_a).val ();
	book_b["title"]=jQuery('#' + id_title_b).val ();

	book_a["authors"] = new Array(3);
	book_b["authors"] = new Array(3);
	for (var it=0; it<=2; it++)
		{
		book_a["authors"][it]=jQuery('#' + id_authors_a[it]).val ();
		book_b["authors"][it]=jQuery('#' + id_authors_b[it]).val ();
		}

	return	[book_a,book_b];
}

// -----------------------------------------------------------------------
// [8-8]:
function key_define_proc (school_in,date_in,kumi_in)
{
	var key = "";
	var str_out = "*** key_define_proc *** start ***<br />";
	str_out += "school_in = " + school_in + "<br />";
	str_out += "date_in = " + date_in + "<br />";
	str_out += "kumi_in = " + kumi_in + "<br />";

	key += school_to_key_proc (school_in);

	var arry = date_in.split ("-");

	key += arry[0];

	if (arry[1].length < 2)
		{
		key += "0";
		}
	key += arry[1];

	if (arry[2].length < 2)
		{
		key += "0";
		}
	key += arry[2];

	var kumi = kumi_in.replace ("-","");

	key += kumi;

	str_out += "key = " + key + "<br />";
 
	jQuery("#outarea_ff").html (str_out);

	return	key;
}

// -----------------------------------------------------------------------
// [8-8]:
function school_to_key_proc (school_in)
{
	var key = "";

	switch (school_in)
		{
		case "吉田東小":
			key = "ye";
			break;

		case "吉田西小":
			key = "yw";
			break;

		case "薬師寺小":
			key = "ya";
			break;

		case "祇園小":
			key = "gi";
			break;

		default:
			key = "xx";
			break;
		}

	return	key;
}

// -----------------------------------------------------------------------
