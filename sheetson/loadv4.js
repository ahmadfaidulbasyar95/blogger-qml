(function() {
	window.addEventListener('load', function() { 
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_load = $('#__sheetson_load');
		var id = __urlp.get('i');
		if (__sheetson_load.length && window.__sheetson_token !== undefined && window.__sheetson_sheet !== undefined && id) {
			window.__sheetson.init(window.__sheetson_token);
			var __sheetson_load_ = __sheetson_load.html();
			__sheetson_load.html('<h2 style="margin:200px 0px; text-align:center;">Memuat Data ...<br>Mohon tunggu sebentar !!</h2>');
			function __sheetson_load_f() {
				window.__sheetson.get(window.__sheetson_sheet, id, function(out) {
					if (out.ok) {
						var orientation = __sheetson_load.data('orientation') ?? 'P';
						var page_p      = __sheetson_load.data('margin') ?? 20;
						var page_mw     = orientation == 'P' ? 210 : 297;
						var page_w      = page_mw-page_p*2;
						var page_o      = orientation == 'P' ? 'portrait' : 'landscape';
						out.out.qrcode = '<span id="__sheetson_qrcode"></span>';
						$.each(out.out, function(index, val) {
							__sheetson_load_ = __sheetson_load_.replace(new RegExp(`\\[${index}\\]`, 'g'),val);
						});
						__sheetson_load.html('<div style="width: '+page_w+'mm; padding: '+page_p+'mm; ">'+__sheetson_load_+'</div>');
						new QRCodeStyling({
							width: 200,
							height: 200,
							type: "svg",
							data: window.location.origin+window.location.pathname+'?i='+id,
							image: $('link[rel*=icon]').attr('href'),
							imageOptions: {
								crossOrigin: "anonymous",
								imageSize:0.2,
								margin: 3
							}
						}).append(document.getElementById('__sheetson_qrcode'));
						__sheetson_load.append('<style type="text/css"> @page {size: A4 '+page_o+'; margin: 0cm;} </style>');
						$('<div style="max-width: '+page_mw+'mm;margin:5px;"><button id="__sheetson_print" type="button" onclick="printJS(\'__sheetson_load\', \'html\')">&#128424 Print</button><span style="position: relative;bottom: -42px;right: -3px;border-width: 0 25px 40px 0; border-style: solid; border-color: white white #dfdfdf #dfdfdf;float:right;"></span></div><style type="text/css"> #__sheetson_load {max-width: '+page_mw+'mm; margin: 0px 5px 50px 5px; box-shadow: rgb(0 0 0 / 35%) 0px 0px 4px; overflow: auto;} #__sheetson_print {font-size: x-large; padding: 5px 10px; background-color: white; border: 1px solid #bdbdbd;}#__sheetson_print:hover {background-color: #e7e6e6;}</style>').insertBefore(__sheetson_load);
					}else{
						__sheetson_load.html('<h2 style="margin:200px 0px; text-align:center;">Gagal Memuat Data !!</h2>');
						setTimeout(function() {
							__sheetson_load.html('<h2 style="margin:200px 0px; text-align:center;">Memuat Data ...<br>Mohon tunggu sebentar !!</h2>');
							__sheetson_load_f();
						}, 1000);
					}
				});
			}
			__sheetson_load_f();
		}
	}, false);
})();