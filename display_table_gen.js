// -----------------------------------------------------------------------
//	yomikatari/display_table_gen.js
//
//					May/01/2016
//
// -----------------------------------------------------------------------
// [8]:
function display_table_gen_proc (rows)
{
	var str_out = "<table>";
	str_out += "<tr>";
	str_out += "<th>no</th>";
	str_out += "<th>学校</th>";
	str_out += "<th>日付</th>";
	str_out += "<th>学年組</th>";
	str_out += "<th>題名</th>";
	str_out += "<th colspan='3'>作者</th>";
	str_out += "</tr>";

	for (var count in rows)
		{
		str_out += row_process (count,rows[count]);
		}
	str_out += "</table>";

	return	str_out;
}

// -----------------------------------------------------------------------
// [8-4]:
function row_process (count,row_in)
{
	var str_out = "";

	var key = row_in.key;
	var doc = row_in.doc;
	var school = doc.school;
	var hizuke = doc.date;
	var kumi = doc.kumi;
	var books = doc.books;

	var nn_rowspan = 1;
	if ((1 < books.length) && (books[1].title))
		{
		nn_rowspan = 2;
		}

	var str_td = "<td rowspan=" + nn_rowspan + ">";

	str_out += "<tr>";
	str_out += str_td + count + "</td>";
//	str_out += str_td + key + "</td>";
	str_out += str_td + school + "</td>";
	str_out += str_td + hizuke + "</td>";
	str_out += str_td + kumi + "</td>";

	str_out += "<td>" + books[0].title + "</td>";
	str_out += author_gen_proc (books[0].authors);
	str_out += "</tr>";

	if ((1 < books.length) && (books[1].title))
		{
	str_out += "<tr>";
	str_out += "<td>" + books[1].title + "</td>";
	str_out += author_gen_proc (books[1].authors);
	str_out += "</tr>";
		}

	return	str_out;
}

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
