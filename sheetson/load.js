(function() {
	window.addEventListener('load', function() { 
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_load = $('#__sheetson_load');
		var id = __urlp.get('i');
		if (__sheetson_load.length && window.__sheetson_token !== undefined && window.__sheetson_sheet !== undefined && id) {
			window.__sheetson.init(window.__sheetson_token);
			window.__sheetson.get(window.__sheetson_sheet, id, function(out) {
				if (out.ok) {
					var __sheetson_load_ = __sheetson_load.html();
					$.each(out.out, function(index, val) {
						__sheetson_load_ = __sheetson_load_.replace(new RegExp(`\\[${index}\\]`, 'g'),val);
					});
					__sheetson_load.html(__sheetson_load_);
				}else{
					alert('Data tidak ditemukan');
				}
			});
		}
	}, false);
})();