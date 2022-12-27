(function() {
	window.addEventListener('load', function() {
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_manage = $('#__sheetson_manage');
		if (__sheetson_manage.length) {
			window.__sheetson.init(__urlp.get('token'));
			window.__sheetson.list('List',0,100, function(out) {
				if (out.ok) {
					var html = '<form> <select id="__sheetson_sheet">';
					var __sheetson_sheets = out.out.results;
					$.each(__sheetson_sheets, function(index, val) {
						html += '<option value="'+index+'">'+val.title+'</option>';
					});
					html += '</select> </form> <form id="__sheetson_form"></form> <div id="__sheetson_list"></div>';
					__sheetson_manage.html(html);
					var __sheetson_form = $('#__sheetson_form');
					var __sheetson_list = $('#__sheetson_list');
					var __sheetson_sheet = '';
					$('#__sheetson_sheet').on('change', function(event) {
						__sheetson_sheet = __sheetson_sheets[$(this).val()];
						__sheetson_list.html('');
						if (__sheetson_sheet.name) {
							__sheetson_form.html('<p style="text-align: center;">Loading...</p>');
							window.__sheetson.get(__sheetson_sheet.name,2,function(out) {
								if (out.ok) {
									html = '';
									$.each(out.out, function(index, val) {
										if (index != 'rowIndex') {
											html += '<div><label>'+val+'</label><input type="text" name="'+index+'" /></div>';
										}
									});
									__sheetson_form.html(html);
								}else{
									__sheetson_form.html('<p style="text-align: center;">'+out.msg+'</p>');
								}
							})
						}else{
							__sheetson_form.html('');
						}
					});
				}else{
					__sheetson_manage.html('<p style="text-align: center;">'+out.msg+'</p>');
				}
			});
		}
	}, false);
})();
