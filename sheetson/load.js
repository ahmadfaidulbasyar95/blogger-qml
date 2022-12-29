(function() {
	window.addEventListener('load', function() { 
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_load = $('#__sheetson_load');
		var id = __urlp.get('i');
		if (__sheetson_load.length && window.__sheetson_token !== undefined && window.__sheetson_sheet !== undefined && id) {
			window.__sheetson.init(window.__sheetson_token);
			window.__sheetson.get(window.__sheetson_sheet, id, function(out) {
				if (out.ok) {
					out.out.qrcode = '<div id="__sheetson_qrcode"></div>';
					var __sheetson_load_ = __sheetson_load.html();
					$.each(out.out, function(index, val) {
						__sheetson_load_ = __sheetson_load_.replace(new RegExp(`\\[${index}\\]`, 'g'),val);
					});
					__sheetson_load.html(__sheetson_load_);
					new QRCodeStyling({
						width: 200,
						height: 200,
						type: "svg",
						data: window.location.origin+window.location.pathname+window.location.search,
						image: $('link[rel*=icon]').attr('href'),
						imageOptions: {
							crossOrigin: "anonymous",
							imageSize:0.3,
							margin: 5
						}
					}).append(document.getElementById('__sheetson_qrcode'));
				}else{
					alert('Data tidak ditemukan');
				}
			});
		}
	}, false);
})();