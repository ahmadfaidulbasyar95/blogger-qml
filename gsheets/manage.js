(function() {
	window.addEventListener('load', function() {
		window.__sheetson_token = window.__sheetson_token.split('--');
		var __sheetson_manage = $('#__sheetson_manage');
		const gsheets_manage = () => {
			gapi.client.init({
				'apiKey': window.__sheetson_token[0], // {APIKEY}
				'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
			})
			.then(() => {
				const gsheets_data = (range) => {
					return gapi.client.sheets.spreadsheets.values.get({
						spreadsheetId: window.__sheetson_token[1], // {SPREADSHEET_ID}
						range: range, // for example: List 1!A1:B6
					})
				}
				gsheets_data('List!2:100')
				.then((out) => {
					var __sheetson_sheets = [];
					var html = '<form><div><select id="__sheetson_sheet">';
					for(var i = 0, length1 = out.result.values.length; i < length1; i++){
						__sheetson_sheets.push({
							name:      out.result.values[i][0],
							title:     out.result.values[i][1],
							lastIndex: out.result.values[i][2] ?? 0
						});
						html += '<option value="'+i+'">'+out.result.values[i][1]+'</option>';
					}
					html += '</select></div><div><table class="table table-striped table-bordered"><thead id="__sheetson_head"></thead><tbody id="__sheetson_body"></tbody></table></div><div><td><button type="button" id="__sheetson_more" style="display:none;">Load More</button></td></div></form>';
					__sheetson_manage.html(html);
					var __sheetson_head  = $('#__sheetson_head');
					var __sheetson_body  = $('#__sheetson_body');
					var __sheetson_more  = $('#__sheetson_more');
					var __sheetson_sheet = '';
					var __sheetson_data  = [];
					function __sheetson_data_load() {
						if (__sheetson_sheet.lastIndex > 2) {
							var limit = 100;
							var skip  = __sheetson_sheet.lastIndex - limit;
							if (skip < 2) {
								limit -= 2 - skip;
								skip = 2;
							}
							__sheetson_more.hide();
							gsheets_data(__sheetson_sheet.name+'!'+(skip+1)+':'+(skip+limit))
							.then((out) => {
								console.log(out);
								__sheetson_sheet.lastIndex = skip;
								if (skip > 2) __sheetson_more.show();
								html = '';
								for(var i = out.result.values.length -1; i >= 0; i--){
									html += '<tr data-index="'+__sheetson_data.length+'"><td class="__id">'+(skip+i+1)+'</td>';
									for(var y = 0, length1 = __sheetson_sheet.field.length; y < length1; y++){
										html += '<td class="_field">'+out.result.values[i][y]+'</td>';
									}
									html += '<td><button type="button" class="__sheetson_edit">Edit</button><button type="button" class="__sheetson_save" style="display:none;">Save</button><button type="button" class="__sheetson_cancel" style="display:none;">Cancel</button></td></tr>';
									__sheetson_data.push(out.result.values[i]);
								}
								__sheetson_body.append(html);
							}).catch((err) => {
								__sheetson_body.append('<tr id="__sheetson_body_msg"><td style="text-align:center;color:red;" colspan="'+(__sheetson_sheet.field.length+2)+'">Error !!!<br>'+err.result.error.message+'</td></tr>');
								setTimeout(function() {
									__sheetson_data_load();
									$('#__sheetson_body_msg').remove();
								}, 5000);
							});
						}
					}
					__sheetson_more.on('click', function(event) {
						event.preventDefault();
						__sheetson_data_load();
					});
					__sheetson_body.on('click', '.__sheetson_edit', function(event) {
						event.preventDefault();
						$(this).hide().siblings('.__sheetson_save,.__sheetson_cancel').show().parents('tr').children('._field').each(function(index, el) {
							$(this).html('<input type="text" name="input" value="'+$(this).html()+'" />');
						});
					});
					__sheetson_body.on('click', '.__sheetson_cancel', function(event) {
						event.preventDefault();
						$(this).hide().siblings('.__sheetson_save').hide().siblings('.__sheetson_edit').show().parents('tr').children('._field').each(function(index, el) {
							$(this).html($(this).children('input').attr('value'));
						});
					});
					$('#__sheetson_sheet').on('change', function(event) {
						__sheetson_more.hide();
						__sheetson_sheet = Object.assign({}, __sheetson_sheets[$(this).val()]);
						__sheetson_body.html('');
						if (__sheetson_sheet.name) {
							__sheetson_head.html('<tr><td style="text-align: center;">Loading...</td></tr>');
							gsheets_data(__sheetson_sheet.name+'!1:2')
							.then((out) => {
								__sheetson_sheet.field = [];
								html = ['<tr><td>ID</td>','<tr><td><input type="text" name="input" /></td>'];
								for (var i = 0; i < out.result.values[0].length; i++) {
									__sheetson_sheet.field.push(out.result.values[0][i]);
									html[0] += '<td>'+out.result.values[1][i]+'</td>';
									html[1] += '<td class="_field"><input type="text" name="input" /></td>';
								}
								html[0] += '<td></td></tr>';
								__sheetson_head.html(html[0]+html[1]+'<td><button type="button" id="__sheetson_add">Add</button></td></tr>'+html[1]+'<td><button type="button">Search</button></td></tr>');
								__sheetson_head._id_show = __sheetson_head.children('tr').eq(1).children('td').eq(0).children('input').val(parseInt(__sheetson_sheet.lastIndex)+1).attr('readonly','readonly');
								__sheetson_body.html('');
								__sheetson_data = [];
								__sheetson_data_load();
							}).catch((err) => {
								__sheetson_head.html('<tr><td style="text-align:center;color:red;">Error !!!<br>'+err.result.error.message+'</td></tr>');
								setTimeout(function() {
									$('#__sheetson_sheet').trigger('change');
								}, 5000);
							});
						}else{
							__sheetson_head.html('');
						}
					});
				}).catch((err) => {
					__sheetson_manage.html('<h3 style="margin:200px 0px; text-align:center;color:red;">Error !!!<br>'+err.result.error.message+'</h3>');
				});
			});
		};
		gapi.load('client', gsheets_manage);
	}, false);
})();