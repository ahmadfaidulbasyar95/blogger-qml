const toDataURL = url => fetch(url)
	.then(response => response.blob())
	.then(blob => new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.onerror = reject
		reader.readAsDataURL(blob)
	}));
window.__sheetson_token = window.__sheetson_token.split('--');
(function() {
	window.addEventListener('load', function() { 
		$('html, body').animate({
			scrollTop: $('#__sheetson_load').offset().top - 150
		}, 2000);
		function gsheets_load_(out) {
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
			page_mh         = __sheetson_load.data('height') ?? page_mh;
			out.result.valueRanges[0].values[0].push('qrcode');
			out.result.valueRanges[1].values[0].push('<span id="__sheetson_qrcode" style="display: block;"></span>');
			for (var i = 0; i < out.result.valueRanges[0].values[0].length; i++) {
				__sheetson_load_ = __sheetson_load_.replace(new RegExp(`\\[${out.result.valueRanges[0].values[0][i]}\\]`, 'g'),out.result.valueRanges[1].values[0][i]);
			}
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
			$(iframe.document.body).find('[data-img64]').each(function(el) {
				var el = $(this);
				toDataURL('https://wsrv.nl/?url='+encodeURIComponent(el.data('img64'))+'&w=1350&h=1350').then(dataUrl => {
					el.attr('src', dataUrl).removeAttr('data-img64');
				});
			});
			$('#__sheetson_print').on('click', function(event) {
				event.preventDefault();
				iframe.focus();
				iframe.print();
			});
			var __sheetson_dl_img  = $('#__sheetson_dl_img');
			var __sheetson_dl_img_ = __sheetson_dl_img.html();
			__sheetson_dl_img.on('click', function(event) {
				event.preventDefault();
				__sheetson_dl_img.html(__sheetson_dl_img_+' <i class="fa fa-spin fa-spinner"></i>').attr('disabled','disabled');
				iframe.document.body.style.width  = (page_mw + 4) + 'mm';
				iframe.document.body.style.height = (page_mh + 4) + 'mm';
				modernScreenshot.domToPng(iframe.document.body, {scale:2}).then(function (dataUrl) {
					const link = document.createElement('a');
					link.download = document.title+'.png';
					link.href = dataUrl;
					link.click();
					iframe.document.body.style.width  = '';
					iframe.document.body.style.height = '';
					__sheetson_dl_img.html(__sheetson_dl_img_).removeAttr('disabled');
				});
			});
		}
		var __sheetson_load = $('#__sheetson_load');
		var __sheetson_load_ = __sheetson_load.html();
		__sheetson_load.html('<h3 style="margin:200px 0px; text-align:center;">Memuat Data ...<br>Mohon tunggu sebentar !!</h3>');
		var id = new URLSearchParams(window.location.search).get('i');
		if (id > 1) {
			var gsheets_load_dt = localStorage.getItem('gsheets_load_dt');
			gsheets_load_dt = gsheets_load_dt ? JSON.parse(gsheets_load_dt) : [[],[]];
			var id_ = gsheets_load_dt[0].indexOf(window.__sheetson_sheet+id);
			if (id_ != -1) {
				gsheets_load_(gsheets_load_dt[1][id_]);
			}else{
				const gsheets_load = () => {
					gapi.client.init({
						'apiKey': window.__sheetson_token[0], // {APIKEY}
						'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
					})
					.then(() => {
						return gapi.client.sheets.spreadsheets.values.batchGet({
							spreadsheetId: window.__sheetson_token[1], // {SPREADSHEET_ID}
							ranges: [window.__sheetson_sheet+'!1:1',window.__sheetson_sheet+'!'+id+':'+id], // for example: List 1!A1:B6
						})
					})
					.then((out) => {
						if (out.result.valueRanges[1].values != undefined) {
							gsheets_load_(out);
							gsheets_load_dt[0].push(window.__sheetson_sheet+id);
							gsheets_load_dt[1].push(out);
							if (gsheets_load_dt[0].length > 10) {
								gsheets_load_dt[0].shift();
								gsheets_load_dt[1].shift();
							}
							localStorage.setItem('gsheets_load_dt', JSON.stringify(gsheets_load_dt));
						}else{
							__sheetson_load.html('<h3 style="margin:200px 0px; text-align:center;color:red;">Error !!!<br>Data Tidak Ditemukan.</h3>');
						}
					}).catch((err) => {
						__sheetson_load.html('<h3 style="margin:200px 0px; text-align:center;color:red;">Error !!!<br>'+err.result.error.message+'</h3>');
					});
				};
				gapi.load('client', gsheets_load);
			}
		}else{
			__sheetson_load.html('<h3 style="margin:200px 0px; text-align:center;color:red;">Error !!!<br>ID Tidak Boleh Kosong.</h3>');
		}		
	}, false);
})();