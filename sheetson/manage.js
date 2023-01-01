(function() {
	window.addEventListener('load', function() {
		var __urlp = new URLSearchParams(window.location.search); 
		var __sheetson_manage = $('#__sheetson_manage');
		if (__sheetson_manage.length) {
			window.__sheetson.init(__urlp.get('token'));
			window.__sheetson.list('List',0,100, function(out) {
				if (out.ok) {
					var html = '<form><div><select id="__sheetson_sheet">';
					var __sheetson_sheets = out.out;
					for(var i = 0, length1 = __sheetson_sheets.length; i < length1; i++){
						__sheetson_sheets[i]
						html += '<option value="'+i+'">'+__sheetson_sheets[i].title+'</option>';
					}
					html += '</select></div><div><table><thead id="__sheetson_head"></thead><tbody id="__sheetson_body"></tbody></table></div><div><td><button type="button" id="__sheetson_more" style="display:none;">Load More</button></td></div></form>';
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
							window.__sheetson.list(__sheetson_sheet.name, skip, limit, function(out) {
								if (out.ok) {
									__sheetson_sheet.lastIndex = skip;
									if (skip > 2) __sheetson_more.show();
									html = '';
									for(var i = out.out.length -1; i >= 0; i--){
										html += '<tr data-index="'+__sheetson_data.length+'"><td class="__id">'+out.out[i].rowIndex+'</td>';
										for(var y = 0, length1 = __sheetson_sheet.field.length; y < length1; y++){
											html += '<td class="_field">'+out.out[i][__sheetson_sheet.field[y]]+'</td>';
										}
										html += '<td><button type="button" class="__sheetson_edit">Edit</button><button type="button" class="__sheetson_save" style="display:none;">Save</button><button type="button" class="__sheetson_cancel" style="display:none;">Cancel</button></td></tr>';
										__sheetson_data.push(out.out[i]);
									}
									__sheetson_body.append(html);
								}else{
									__sheetson_data_load();
								}
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
					__sheetson_body.on('click', '.__sheetson_save', function(event) {
						event.preventDefault();
						if (confirm('Simpan ?')) {
							var el = $(this);
							var dt = {};
							var par = el.hide().siblings('.__sheetson_cancel').hide().parents('tr');
							var id = par.children('.__id').text();
							par.find('._field input').attr('readonly','readonly').each(function(index, el) {
								var v = $(this).val();
								dt[__sheetson_sheet.field[index]] = v ? v : '-';
							});
							window.__sheetson.update(__sheetson_sheet.name, dt, id, function(out) {
								if (out.ok) {
									par.children('._field').each(function(index, el) {
										$(this).html(dt[__sheetson_sheet.field[index]]);
									});
									par.find('.__sheetson_edit').show();
									__sheetson_data[par.data('index')] = out.out;
								}else{
									par.find('.__sheetson_save,.__sheetson_cancel').show();
									par.find('._field input').removeAttr('readonly');
								}
							});
						}
					});
					__sheetson_head.on('click', '#__sheetson_add', function(event) {
						event.preventDefault();
						if (confirm('Tambah')) {
							var el = $(this);
							var dt = {};
							var par = el.hide().parents('tr');
							par.find('input').attr('readonly','readonly').each(function(index, el) {
								var v = $(this).val();
								dt[__sheetson_sheet.field[index]] = v ? v : '-';
							});
							window.__sheetson.insert(__sheetson_sheet.name, dt, function(out) {
								if (out.ok) {
									window.__sheetson.update('List', {'lastIndex':out.out.rowIndex}, __sheetson_sheet.rowIndex, function(out) {
										if (out.ok) {
											__sheetson_sheets[$('#__sheetson_sheet').val()].lastIndex = out.out.lastIndex;
										}
									});
									html = '<tr data-index="'+__sheetson_data.length+'"><td class="__id">'+out.out.rowIndex+'</td>';
									for(var y = 0, length1 = __sheetson_sheet.field.length; y < length1; y++){
										html += '<td class="_field">'+out.out[__sheetson_sheet.field[y]]+'</td>';
									}
									html += '<td><button type="button" class="__sheetson_edit">Edit</button><button type="button" class="__sheetson_save" style="display:none;">Save</button><button type="button" class="__sheetson_cancel" style="display:none;">Cancel</button></td></tr>';
									__sheetson_data.push(out.out);
									__sheetson_body.prepend(html);
									par.find('input').removeAttr('readonly').val('');
								}else{
									par.find('input').removeAttr('readonly');
								}
								el.show();
							});
						}
					});
					$('#__sheetson_sheet').on('change', function(event) {
							__sheetson_more.hide();
						__sheetson_sheet = Object.assign({}, __sheetson_sheets[$(this).val()]);
						__sheetson_body.html('');
						if (__sheetson_sheet.name) {
							__sheetson_head.html('<tr><td style="text-align: center;">Loading...</td></tr>');
							window.__sheetson.get(__sheetson_sheet.name,2,function(out) {
								if (out.ok) {
									__sheetson_sheet.field = [];
									html = ['<tr><td>ID</td>','<tr><td></td>'];
									$.each(out.out, function(index, val) {
										if (index != 'rowIndex') {
											__sheetson_sheet.field.push(index);
											html[0] += '<td>'+val+'</td>';
											html[1] += '<td><input type="text" name="'+index+'" /></td>';
										}
									});
									html[0] += '<td></td></tr>';
									__sheetson_head.html(html[0]+html[1]+'<td><button type="button" id="__sheetson_add">Add</button></td></tr>'+html[1]+'<td><button type="button">Search</button></td></tr>');
									__sheetson_body.html('');
									__sheetson_data = [];
									__sheetson_data_load();
								}else{
									__sheetson_head.html('<tr><td style="text-align: center;">'+out.msg+'</td></tr>');
								}
							})
						}else{
							__sheetson_head.html('');
						}
					});
				}else{
					__sheetson_manage.html('<p style="text-align: center;">'+out.msg+'</p>');
				}
			});
		}
	}, false);
})();
