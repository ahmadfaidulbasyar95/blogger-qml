window.__sheetson = {
	'token': '',
	'init' : function(token) {
		this.token = token.split('--');
	},
	'ajax' : function(url,type,dt,cb) {
		$.ajax({
			url: url,
			type: type,
			headers: {
				'Authorization': 'Bearer '+this.token[0],
				'X-Spreadsheet-Id': this.token[1],
				'Content-Type': 'application/json'
			},
			data: dt,
		})
		.done(function(out,status,xhr) {
			cb(out,status,xhr);
		})
		.fail(function(out,status,xhr) {
			cb(out,status,xhr);
		});
	},
	'create': function(sheet,dt,cb) {
		this.ajax('https://api.sheetson.com/v2/sheets/'+sheet,'POST',JSON.stringify(dt), function(out) {
			if (out.rowIndex !== undefined)
				out = {'ok':1,'out':out};
			else
				out = {'ok':0,'msg':'error'};
			cb(out);
		});
	},
	'update': function(sheet,dt,idx,cb) {
		this.ajax('https://api.sheetson.com/v2/sheets/'+sheet+'/'+idx,'PUT',JSON.stringify(dt), function(out) {
			if (out.rowIndex !== undefined)
				out = {'ok':1,'out':out};
			else
				out = {'ok':0,'msg':'error'};
			cb(out);
		});
	},
	'delete': function(sheet,idx,cb) {
		this.ajax('https://api.sheetson.com/v2/sheets/'+sheet+'/'+idx,'DELETE',{}, function(out,status,xhr) {
			if (xhr.status == 204)
				out = {'ok':1,'out':{'rowIndex':idx}};
			else
				out = {'ok':0,'msg':'error'};
			cb(out);
		});
	},
	'get': function(sheet,idx,cb) {
		this.ajax('https://api.sheetson.com/v2/sheets/'+sheet+'/'+idx,'GET',{}, function(out) {
			if (out.rowIndex !== undefined)
				out = {'ok':1,'out':out};
			else
				out = {'ok':0,'msg':'error'};
			cb(out);
		});
	},
	'list': function(sheet,skip,limit,cb) {
		this.ajax('https://api.sheetson.com/v2/sheets/'+sheet,'GET',{'skip':skip,'limit':limit}, function(out) {
			if (out.results !== undefined)
				out = {'ok':1,'out':out};
			else
				out = {'ok':0,'msg':'error'};
			cb(out);
		});
	}
};