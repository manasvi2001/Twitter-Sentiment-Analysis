var body = "error";
var data = {
	result : 0
};


var id = Number($.request.parameters.get("id"));
var word = $.request.parameters.get("word");

if(word.length!==0) {
	try {
		var conn = $.db.getConnection("workshop.sessiona.00::Anonymous_Access");
		var query = 'call \"workshop.sessiona.00.data::update\"(?,?)';
		var cst = conn.prepareCall(query);
		cst.setString(1, word);
		cst.setInteger(2, id);
		var rs = cst.execute();
		conn.commit();
		
		rs = cst.getResultSet();
	
		while(rs.next()) {
			data.result = rs.getInteger(1);
		}
		
		body = JSON.stringify(data);
		
		rs.close();
		cst.close();
		conn.close();
	} catch (e) {
	
		body = e.stack + e.message;
	
		$.response.status = $.net.http.BAD_REQUEST;
		conn.close();
	}
}
try {

	var conn = $.db.getConnection();
	if(id === 1) {
		var query = 'select Count(*) from \"workshop.sessiona.00.data::tweets\", \"workshop.sessiona.00.data::positive\"	where LOCATE(\"TweetText\",\"Words\")>0';
	} else {
		var query = 'select Count(*) from \"workshop.sessiona.00.data::tweets\", \"workshop.sessiona.00.data::negative\"	where LOCATE(\"TweetText\",\"Words\")>0';
	}
	var cst = conn.prepareStatement(query);
	cst.execute();
	var rs = cst.getResultSet();

	while (rs.next()) {
		data.result = rs.getInteger(1);
	}
	body = JSON.stringify(data);

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
