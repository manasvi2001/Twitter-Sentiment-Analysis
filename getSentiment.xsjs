var body = "error";
var data = {
	result : 0
};

try {

	var conn = $.db.getConnection();
	var query = 'select Count(*) from \"workshop.sessiona.00.data::tweets\", \"workshop.sessiona.00.data::positive\"	where LOCATE(\"TweetText\",\"Words\")>0';
	var cst = conn.prepareStatement(query);
	cst.execute();
	var rs = cst.getResultSet();

	while (rs.next()) {
		data.result = rs.getInteger(1);
	}
	body = JSON.stringify(data.result);

	rs.close();
	cst.close();
	conn.close();
} catch (e) {

	body = e.stack + e.message;

	$.response.status = $.net.http.BAD_REQUEST;
	conn.close();
}
$.response.contentType = "text/plain";
$.response.setBody(body);