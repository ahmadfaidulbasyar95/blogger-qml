(function() {
	window.addEventListener('load', function() { 
		var __urlp          = new URLSearchParams(window.location.search); 
		var __sheetson_load = $('#__sheetson_load');
		var id              = __urlp.get('i');
		if (__sheetson_load.length && window.__sheetson_token !== undefined && window.__sheetson_sheet !== undefined && id) {
			window.__sheetson.init(window.__sheetson_token);
			var __sheetson_load_ = __sheetson_load.html();
			__sheetson_load.html('<h2 style="margin:200px 0px; text-align:center;">Memuat Data ...<br>Mohon tunggu sebentar !!</h2>');
			function __sheetson_load_f() {
				window.__sheetson.get(window.__sheetson_sheet, id, function(out) {
					if (out.ok) {
						var page_sizes  = { 'A4':[210,297], 'A5':[148,210], 'A6':[105,148], 'A7':[74,105] };
						var orientation = __sheetson_load.data('orientation') ?? 'P';
						var page_size   = __sheetson_load.data('size') ?? 'A4';
						var page_p      = __sheetson_load.data('margin') ?? 20;
						var qrsize      = __sheetson_load.data('qrsize') ?? 200;
						var qrimg       = __sheetson_load.data('qrimg') ?? $('link[rel*=icon]').attr('href');
						var page_mw     = orientation == 'P' ? page_sizes[page_size][0] : page_sizes[page_size][1];
						var page_mh     = orientation == 'P' ? page_sizes[page_size][1] : page_sizes[page_size][0];
						var page_w      = page_mw-page_p*2;
						var page_o      = orientation == 'P' ? 'portrait' : 'landscape';
						out.out.qrcode  = '<span id="__sheetson_qrcode"></span>';
						page_mh         = __sheetson_load.data('height') ?? page_mh;
						$.each(out.out, function(index, val) {
							__sheetson_load_ = __sheetson_load_.replace(new RegExp(`\\[${index}\\]`, 'g'),val);
						});
						__sheetson_load_ = __sheetson_load_.replace(/(https:\/\/blogger\.googleusercontent\.com\/img.*?)"/gm, function (match, capture) { 
							return 'https://testing-faid.000webhostapp.com?url='+encodeURIComponent(capture)+'"';
						}); 
						__sheetson_load_ = '<style type="text/css"> @page {size: '+page_size+' '+page_o+'; margin: 0cm;} body {margin:0px;width: '+page_mw+'mm;height: '+page_mh+'mm;} p {margin: 0px;line-height: 1.5em;} td {line-height: 1.5em;vertical-align: top;}</style><div style="width: '+page_w+'mm; padding: '+page_p+'mm; ">'+__sheetson_load_+'</div>';
						__sheetson_load.html('<div style="margin-bottom:5px;"><button id="__sheetson_print" type="button">&#128424 Print</button><button id="__sheetson_dl_img" type="button">&#128247 Download</button></div><style type="text/css"> #__sheetson_load {max-width: '+page_mw+'mm; margin: 0px 5px 50px 5px;} #__sheetson_print, #__sheetson_dl_img {margin-right: 4px;font-size: x-large; padding: 5px 10px; background-color: white; border: 1px solid #bdbdbd;}#__sheetson_print:hover {background-color: #e7e6e6;}</style><iframe id="__sheetson_iframe" style="border:0px;width:100%;height:'+(page_mh+5)+'mm;box-shadow: rgb(0 0 0 / 35%) 0px 0px 4px;"></iframe>');
						var iframe = document.getElementById('__sheetson_iframe');
						iframe     = iframe.contentWindow || ( iframe.contentDocument.document || iframe.contentDocument);
						iframe.document.open();
						iframe.document.write(__sheetson_load_ );
						iframe.document.close();
						new QRCodeStyling({
							width : qrsize,
							height: qrsize,
							type  : "svg",
							data  : window.location.origin+window.location.pathname+'?i='+id,
							image : qrimg,
							imageOptions: {
								crossOrigin: "anonymous",
								imageSize:0.4,
								margin: 1
							}
						}).append(iframe.document.getElementById('__sheetson_qrcode'));
						$('#__sheetson_print').on('click', function(event) {
							event.preventDefault();
							iframe.focus();
							iframe.print();
						});
						var __sheetson_dl_img  = $('#__sheetson_dl_img');
						var __sheetson_dl_img_ = __sheetson_dl_img.html();
						__sheetson_dl_img.on('click', function(event) {
							event.preventDefault();
							__sheetson_dl_img.html(__sheetson_dl_img_+' <i class="fa fa-spin fa-spinner"></i>');
							modernScreenshot.domToPng(iframe.document.body).then(function (dataUrl) {
								const link = document.createElement('a');
								link.download = document.title+'.png';
								link.href = dataUrl;
								link.click();
								__sheetson_dl_img.html(__sheetson_dl_img_);
							});
						});
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
