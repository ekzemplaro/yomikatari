// -----------------------------------------------------------------------
//	yomikatari/data_input/table_gen.js
//
//					May/06/2016
//
// -----------------------------------------------------------------------
// [6]:
function table_gen_proc (number_of_classes,rows)
{
var str_tmp = "";

	var str_out = "<table>";
	str_out += "<tr>";
	str_out += "<th>学年組</th>";
	str_out += "<th>題名</th>";
	str_out += "<th colspan=3>作者</th>";
	str_out += "</tr>";

var school_selected = jQuery ("#school").val ();
var date_selected = selected_date_proc ();

	var str_tmp = "*** ccc ***<br />";

	var key_school = school_to_key_proc (school_selected);

	str_tmp += key_school + "<br />";

	for (var it=0; it< 6; it++)
		{

		var gakunen = it + 1;

		var kumisu = parseInt (number_of_classes[key_school][it]);
		str_tmp += "kumisu = " + kumisu + "<br />";

		for (var kumi=1; kumi <= kumisu; kumi += 1)
			{
		str_out += gakunen_proc (gakunen,kumi,school_selected,date_selected,rows);
			}
		} 

	str_out += "</table>";

	str_tmp += "*** ccc ***<br />";

jQuery("#outarea_cc").html (str_tmp);

	return	str_out;
}

// -----------------------------------------------------------------------
function gakunen_proc (gakunen,kumi,school_selected,date_selected,rows)
{
	var str_out = "<tr>";

	var nen_kumi = "" + gakunen + "-" + kumi;

	var key_aa = key_define_proc (school_selected,date_selected,nen_kumi);
	var doc = key_exist_check (rows,key_aa);

//	str_tmp += key_aa + "<br />";
//	str_tmp += doc + "<br />";

	var title_in = "";
	var authors_in = ["","",""];

	if (doc != null)
		{
		title_in = doc.books[0].title;
		authors_in = doc.books[0].authors;
		}

	str_out += "<td rowspan=2>" + nen_kumi + "</td>";
	str_out += row_gen_proc (nen_kumi+"-a",title_in,authors_in);
	str_out += "<td rowspan=2>";
	str_out += "<button class='execute'  id=" + nen_kumi + ">";
	str_out += "更新</button>";
	str_out += "</td>";
	str_out += "</tr>";
	str_out += "<tr>";
	if (doc != null)
		{
		title_in = doc.books[1].title;
		authors_in = doc.books[1].authors;
		}
	str_out += row_gen_proc (nen_kumi+"-b",title_in,authors_in);
	str_out += "</tr>";
//
	return	str_out
}

// -----------------------------------------------------------------------
// [6-4]:
function row_gen_proc (kumi_ab,title_in,authors_in)
{
	var str_out = "";
	var str_title = "";


	if (title_in == "")
		{
	str_title = "<input size='30' type='text' id=" +kumi_ab + "  />";
		}
	else
		{

	str_title = "<input size='30' type='text' id=" +kumi_ab + " value=" + title_in + " />";
		}

	str_out += "<td>" + str_title + "</td>";

	for (var it=0; it<3; it++)
		{
	var str_author = "<input size='15' type='text' id=" +kumi_ab + "-" + it;

		if (authors_in[it] == "")
			{
			str_author += " />";
			}
		else
			{
			str_author += " value=" + authors_in[it] +" />";
			}

		str_out += "<td>" + str_author + "</td>";
		}

	return	str_out;
}

// -----------------------------------------------------------------------
function key_exist_check (rows,key_aa)
{
	var doc = null;

	for (var it in rows)
		{
		if (rows[it].key == key_aa)
			{
			doc = rows[it].doc;
			break;
			}
		}

	return	doc;
}

// -----------------------------------------------------------------------
