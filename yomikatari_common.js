// -----------------------------------------------------------------------
//	yomikatari/yomikatari_common.js
//
//					May/13/2016
//
// -----------------------------------------------------------------------
// [8-4-6]:
function author_gen_proc (authors)
{
	var str_out = "";

	str_out += "<td>" + authors[0] + "</td>";

	if (1 < authors.length)
		{
		str_out += "<td>" + authors[1] + "</td>";
		}
	else
		{
		str_out += "<td></td>";
		}

	if (2 < authors.length)
		{
		str_out += "<td>" + authors[2] + "</td>";
		}
	else
		{
		str_out += "<td></td>";
		}


	return	str_out;
}

// -----------------------------------------------------------------------
