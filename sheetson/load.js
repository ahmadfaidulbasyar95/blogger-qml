(function() {
	window.addEventListener('load', function() { 
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_load = $('#__sheetson_load');
		var id = __urlp.get('i');
		if (__sheetson_load.length && window.__sheetson_token !== undefined && window.__sheetson_sheet !== undefined && id) {
			window.__sheetson.init(window.__sheetson_token);
			window.__sheetson.get(window.__sheetson_sheet, id, function(out) {
				if (out.ok) {
					out.out.qrcode = '<span id="__sheetson_qrcode"></span>';
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
					var orientation = __sheetson_load.data('orientation') ?? 'P';
					var margin      = __sheetson_load.data('margin') ?? '2.5';
					var cmtopx      = 28;
					var html_w      = orientation == 'P' ? 21*cmtopx : 29.7*cmtopx;
					var html_p      = margin*cmtopx;
					var page_o      = orientation == 'P' ? 'portrait' : 'landscape';
					__sheetson_load.append('<style type="text/css"> @page {size: A4 '+page_o+'; margin: '+margin+'cm;} </style>');
					$('<div style="text-align:center;"><button id="__sheetson_print" type="button" onclick="printJS(\'__sheetson_load\', \'html\')">&#128424 Print</button></div><style type="text/css"> #__sheetson_load {max-width: '+html_w+'px; margin: 5px; padding: '+html_p+'px; box-shadow: rgb(0 0 0 / 35%) 0px 0px 4px; } #__sheetson_load:before {content: ""; float: right; border-width: 0 40px 40px 0; border-style: solid; border-color: white white #dfdfdf #dfdfdf; margin: -48px; } #__sheetson_print {font-size: large; margin: 15px auto 30px auto; padding: 5px 10px; background-color: white; border: 1px solid #bdbdbd;}#__sheetson_print:hover {background-color: #e7e6e6;}</style>').insertAfter(__sheetson_load);
				}else{
					alert('Data tidak ditemukan');
				}
			});
		}
	}, false);
})();