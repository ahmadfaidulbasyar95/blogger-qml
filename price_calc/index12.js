window.__price_admin = 'qwerty';
window.__price_list = {
	'paket' : {
		'title' : ['ISBN','ISBN + HAKI','ISBN + Parafrase','ISBN + HAKI + Parafrase','QRCBN','QRCBN + HAKI','QRCBN + Parafrase','QRCBN + HAKI + Parafrase','Cetak Ulang'],
		'price' : [400000,850000,500000,950000,150000,600000,250000,700000,0]
	},
	'paket_eks_min' : [30,30,30,30,1,1,1,1,1],
	'paket_disc' : {
		'eks_min' : 50,
		'price' : [300000,300000,300000,300000,150000,150000,150000,150000,0]
	},
	'book_disc' : {
		'eks_min' : [15,35,50,65,80,100,150,200],
		'price' : [
			[50,100,150,200,300,500,750,1000],
			[500,700,900,1100,1200,1300,1400,1500],
			[500,700,900,1000,1100,1200,1250,1300],
			[500,700,900,1000,1100,1200,1250,1300]
		]
	},
	'paper' : {
		'title' : ['Bookpaper','HVS','HVS Warna','Artpaper Warna'],
		'gsm'   : [57,70,80,120],
		'price' : [
			[75,150,240,220],
			[75,150,240,220],
			[600,600,1200,1200],
			[700,700,1400,1400]
		]
	},
	'finishing' : {
		'title' : ['Soft Cover','Hard Cover'],
		'gsm'   : [260,1260],
		'price' : [
			[8000,15000,19000,18000],
			[35000,35000,38000,38000]
		]
	},
	'charge' : {
		'hlm_min' : [350,350,350,350],
		'price' : [2000,3000,5000,4000]
	},
	'size' : ['A6','A5','A4','B5'],
	'sizex' : [10.5,14.8,21.0,17.6],
	'sizey' : [14.8,21.0,29.7,25.0],
	'label' : ['Paket Layanan','Ukuran Buku','Jenis Kertas','Finishing','Jumlah Halaman','Jumlah Cetak','Buku','Total Bayar','Hasil Perhitungan','Daftar Harga','Diskon','Binding >','Lengkapi formulir diatas !','Keuntungan','Pemasukan','Pengeluaran','Bagikan Hasil Perhitungan','Hasil Perhitungan Berhasil Disalin !','Tabel Harga','Sisipan','Voucher Terbit','Estimasi Berat'],
	'voucher' : [0,50,100,150,200,250,300],
	'voucher_eks_min' : 10,
	'channel' : [
		{
			'name' : 'Oase',
			'paper' : [
  			[0,55,100,100],
  			[0,55,100,100],
  			[0,0,0,0],
  			[0,0,0,0]
  		],
  		'finishing' : [
  			[0,5000,10000,10000],
  			[0,25000,30000,30000]
  		],
    	'charge' : {
    		'hlm_min' : [0,200,250,250],
    		'price' : [0,4000,4000,4000]
    	}
		},
		{
			'name' : '1Click',
			'paper' : [
  			[0,54,118,118],
  			[0,66,118,118],
  			[0,300,600,600],
  			[0,325,650,650]
  		],
  		'finishing' : [
  			[0,4650,6400,6400],
  			[0,24650,26400,26400]
  		],
    	'charge' : {
    		'hlm_min' : [0,200,600,600],
    		'price' : [0,1750,6400,6400]
    	}
		}
	]
};


$(document).ready(function(){
	var __price_calc = $("#__price_calc");
	if (__price_calc.length) {
		var __urlp = new URLSearchParams(window.location.search);
		var __price_list = window.__price_list;
		var __price_form = '';
		var __price_admin_ = (__urlp.get('admin')==window.__price_admin) ? 1 : 0;

		__price_form += '<tr><td>'+__price_list.label[0]+'</td><td><select id="__s_paket" class="__price_input" required="required">';
		$.each(__price_list.paket.title, function(index, val) {
			__price_form += '<option value="'+index+'">'+val+'</option>';
		});
		__price_form += '</select></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[1]+'</td><td><select id="__s_size" class="__price_input" required="required">';
		$.each(__price_list.size, function(index, val) {
			__price_form += '<option value="'+index+'">'+val+'</option>';
		});
		__price_form += '</select></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[3]+'</td><td><select id="__s_finishing" class="__price_input" required="required">';
		$.each(__price_list.finishing.title, function(index, val) {
			__price_form += '<option value="'+index+'">'+val+'</option>';
		});
		__price_form += '</select></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[2]+'</td><td><select id="__s_paper" class="__price_input" required="required">';
		$.each(__price_list.paper.title, function(index, val) {
			__price_form += '<option value="'+index+'">'+val+'</option>';
		});
		__price_form += '</select></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[4]+'</td><td><input id="__s_hlm" type="number" class="__price_input" placeholder="40 - 1000" min="40" max="1000" required="required"></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[2]+' '+__price_list.label[19]+'</td><td><select id="__s_paper_add" class="__price_input" required="required">';
		$.each(__price_list.paper.title, function(index, val) {
			__price_form += '<option value="'+index+'">'+val+'</option>';
		});
		__price_form += '</select></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[4]+' '+__price_list.label[19]+'</td><td><input id="__s_hlm_add" type="number" class="__price_input" placeholder="0 - 1000" min="0" max="1000" required="required"></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[5]+'</td><td><input id="__s_eks" type="number" class="__price_input" placeholder="1 - 1000" min="1" max="1000" required="required"></td></tr>';

		__price_form += '<tr><td>'+__price_list.label[20]+'<br>Min. '+__price_list.voucher_eks_min+' eks</td><td><select id="__s_voucher" class="__price_input" required="required">';
		$.each(__price_list.voucher, function(index, val) {
			__price_form += '<option value="'+index+'">Rp'+(val*1000).toLocaleString()+'.00</option>';
		});
		__price_form += '</select></td></tr>';

		var __price_calc_data = '<br><p><b>'+__price_list.label[9]+'</b></p><br><div><table class="table-hover"><tr><td colspan="2" style="text-align:center;"><b>'+__price_list.label[0]+'</b></td></tr>';
		$.each(__price_list.paket.title, function(index, val) {
			__price_calc_data += '<tr title="Min. '+__price_list.paket_eks_min[index]+' eks"><td>'+val+'</td><td>Rp'+__price_list.paket.price[index].toLocaleString()+'.00</td></tr>';
		});
		__price_calc_data += '</table></div><br><div><table class="table-hover"><tr><td><b>'+__price_list.label[2]+'</b></td>';
		$.each(__price_list.size, function(index, val) {
			__price_calc_data += '<td style="text-align:center;"><b>'+val+'</b></td>';
		});
		__price_calc_data += '</tr>';
		$.each(__price_list.paper.title, function(index, val) {
			__price_calc_data += '<tr><td>'+val+'</td>';
			$.each(__price_list.paper.price[index], function(index1, val1) {
				__price_calc_data += '<td>Rp'+val1.toLocaleString()+'.00</td>';
			});
			__price_calc_data += '</tr>';
		});
		__price_calc_data += '</table></div><br><div><table class="table-hover"><tr><td><b>'+__price_list.label[3]+'</b></td>';
		$.each(__price_list.size, function(index, val) {
			__price_calc_data += '<td style="text-align:center;"><b>'+val+'</b></td>';
		});
		__price_calc_data += '</tr>';
		$.each(__price_list.finishing.title, function(index, val) {
			__price_calc_data += '<tr><td>'+val+'</td>';
			$.each(__price_list.finishing.price[index], function(index1, val1) {
				__price_calc_data += '<td>Rp'+val1.toLocaleString()+'.00</td>';
			});
			__price_calc_data += '</tr>';
		});
		__price_calc_data += '<tr><td colspan="'+(__price_list.size.length+1)+'"></td></tr><tr><td rowspan="2">'+__price_list.label[11]+'</td>';
		$.each(__price_list.charge.hlm_min, function(index, val) {
			__price_calc_data += '<td>'+val+' hlm</td>';
		});
		__price_calc_data += '</tr><tr>';
		$.each(__price_list.charge.price, function(index, val) {
			__price_calc_data += '<td>Rp'+val.toLocaleString()+'.00</td>';
		});
		__price_calc_data += '</tr></table></div><br><div><table class="table-hover"><tr><td colspan="2" style="text-align:center;"><b>'+__price_list.label[10]+' '+__price_list.label[0]+' (Min. '+__price_list.paket_disc.eks_min+' eks)</b></td></tr>';
		$.each(__price_list.paket_disc.price, function(index, val) {
			__price_calc_data += '<tr><td>'+__price_list.paket.title[index]+'</td><td>Rp'+val.toLocaleString()+'.00</td></tr>';
		});
		__price_calc_data += '</table></div><br><div><table class="table-hover"><tr><td><b>'+__price_list.label[10]+' '+__price_list.label[6]+'</b></td>';
		$.each(__price_list.size, function(index, val) {
			__price_calc_data += '<td style="text-align:center;"><b>'+val+'</b></td>';
		});
		__price_calc_data += '</tr>';
		$.each(__price_list.book_disc.eks_min, function(index, val) {
			__price_calc_data += '<tr><td>'+val+' eks</td>';
			$.each(__price_list.size, function(index1, val1) {
				__price_calc_data += '<td>Rp'+__price_list.book_disc.price[index1][index].toLocaleString()+'.00</td>';
			});
			__price_calc_data += '</tr>';
		});
		__price_calc_data += '</table></div><br><h3 style="text-align: center;">'+__price_list.label[18]+' ('+__price_list.paper.title[0]+' '+__price_list.finishing.title[0]+')</h3>';
		$.each(__price_list.size, function(index, val) {
			__price_calc_data += '<div><table class="table-hover"><tr><td><b>'+val+'</b></td><td><b>1 eks</b></td>';
			$.each(__price_list.book_disc.eks_min, function(index2, val2) {
				__price_calc_data += '<td><b>'+val2+' eks</b></td>';
			});
			__price_calc_data += '</tr>';
			for (var i = 60; i < 310; i+=10) {
				var j = i*__price_list.paper.price[0][index]+__price_list.finishing.price[0][index];
				__price_calc_data += '<tr><td>'+i+' hlm</td><td>'+j.toLocaleString()+'</td>';
				$.each(__price_list.book_disc.eks_min, function(index2, val2) {
					var k = j - __price_list.book_disc.price[index][index2];
					__price_calc_data += '<td>'+k.toLocaleString()+'</td>';
				});
				__price_calc_data += '</tr>';
			}
			__price_calc_data += '</table></div><br>';
		});


		if (__price_admin_) {
			for(var i = 0, length1 = __price_list.channel.length; i < length1; i++){
				__price_calc_data += '<br><p><b>'+__price_list.label[9]+' '+__price_list.channel[i].name+'</b></p><br><div><table><tr><td><b>'+__price_list.label[2]+'</b></td>';
				$.each(__price_list.size, function(index, val) {
					__price_calc_data += '<td style="text-align:center;"><b>'+val+'</b></td>';
				});
				__price_calc_data += '</tr>';
				$.each(__price_list.paper.title, function(index, val) {
					__price_calc_data += '<tr><td>'+val+'</td>';
					$.each(__price_list.channel[i].paper[index], function(index1, val1) {
						__price_calc_data += '<td>Rp'+val1.toLocaleString()+'.00</td>';
					});
					__price_calc_data += '</tr>';
				});
				__price_calc_data += '</table></div><br><div><table><tr><td><b>'+__price_list.label[3]+'</b></td>';
				$.each(__price_list.size, function(index, val) {
					__price_calc_data += '<td style="text-align:center;"><b>'+val+'</b></td>';
				});
				__price_calc_data += '</tr>';
				$.each(__price_list.finishing.title, function(index, val) {
					__price_calc_data += '<tr><td>'+val+'</td>';
					$.each(__price_list.channel[i].finishing[index], function(index1, val1) {
						__price_calc_data += '<td>Rp'+val1.toLocaleString()+'.00</td>';
					});
					__price_calc_data += '</tr>';
				});
				__price_calc_data += '<tr><td colspan="'+(__price_list.size.length+1)+'"></td></tr><tr><td rowspan="2">'+__price_list.label[11]+'</td>';
				$.each(__price_list.channel[i].charge.hlm_min, function(index, val) {
					__price_calc_data += '<td>'+val+' hlm</td>';
				});
				__price_calc_data += '</tr><tr>';
				$.each(__price_list.channel[i].charge.price, function(index, val) {
					__price_calc_data += '<td>Rp'+val.toLocaleString()+'.00</td>';
				});
				__price_calc_data += '</tr></table></div>';
			}
		}

		__price_form = '<form action="" method="POST" role="form" onsubmit="return false;"><table>'+__price_form+'</table></form><div id="__price_calc_result"></div><div id="__price_calc_data">'+__price_calc_data+'</div>';
		__price_calc.html(__price_form);

		var __s_paket           = $('#__s_paket');
		var __s_size            = $('#__s_size');
		var __s_paper           = $('#__s_paper');
		var __s_finishing       = $('#__s_finishing');
		var __s_hlm             = $('#__s_hlm');
		var __s_paper_add       = $('#__s_paper_add');
		var __s_hlm_add         = $('#__s_hlm_add');
		var __s_eks             = $('#__s_eks');
		var __s_voucher         = $('#__s_voucher');
		var __price_calc_result = $('#__price_calc_result');

		__s_size.val('1');
		__s_paper_add.val('2');

		function __price_calc_f() {
			var __v_hlm = __s_hlm.val();
			var __v_eks = __s_eks.val();
			if (__v_hlm && __v_eks) {
				var __v_paket     = __s_paket.val();
				var __v_size      = __s_size.val();
				var __v_paper     = __s_paper.val();
				var __v_finishing = __s_finishing.val();
				var __v_paper_add = __s_paper_add.val();
				var __v_hlm_add   = __s_hlm_add.val();
				var __v_voucher   = __s_voucher.val();
				if (__price_list.paket_eks_min[__v_paket] > __v_eks) {
					alert(__price_list.label[0]+' '+__price_list.paket.title[__v_paket]+' '+__price_list.label[5]+' Min. '+__price_list.paket_eks_min[__v_paket]+' eks');
					__s_eks.val(__price_list.paket_eks_min[__v_paket]);
					__price_calc_f();
					return false;
				}
				var __p_paket     = __price_list.paket.price[__v_paket];
				var __p_paper     = __price_list.paper.price[__v_paper][__v_size];
				var __p_finishing = __price_list.finishing.price[__v_finishing][__v_size];
				var __p_paper_ttl = __v_hlm*__p_paper;
				var __p_book      = __p_paper_ttl+__p_finishing;
				var __p_add_label = '';
				if (__v_hlm_add > 0) {
					var __p_paper_add     = __price_list.paper.price[__v_paper_add][__v_size];
					var __p_paper_add_ttl = __v_hlm_add*__p_paper_add;
					__p_book     += __p_paper_add_ttl;
					__p_add_label = '<br>'+__price_list.label[19]+' '+__price_list.paper.title[__v_paper_add]+' Rp'+__p_paper_add.toLocaleString()+'.00 * '+__v_hlm_add+' hlm = Rp'+__p_paper_add_ttl.toLocaleString()+'.00';
				}
				var __p_book_ttl  = __p_book*__v_eks;
				var __p_total     = __p_book_ttl+__p_paket;
				var __p_result    = '<br><p><b>'+__price_list.label[8]+'</b></p><br><div><table> <tr> <td>'+__price_list.label[0]+' '+__price_list.paket.title[__v_paket]+'</td> <td>Rp'+__p_paket.toLocaleString()+'.00</td> </tr> <tr> <td>'+__price_list.label[6]+' '+__price_list.size[__v_size]+' '+__price_list.finishing.title[__v_finishing]+' = Rp'+__p_finishing.toLocaleString()+'.00<br>'+__price_list.paper.title[__v_paper]+' Rp'+__p_paper.toLocaleString()+'.00 * '+__v_hlm+' hlm = Rp'+__p_paper_ttl.toLocaleString()+'.00'+__p_add_label+'<br>Rp'+__p_book.toLocaleString()+'.00 * '+__v_eks+' eks</td> <td>Rp'+__p_book_ttl.toLocaleString()+'.00</td> </tr>';

				if (__v_hlm >= __price_list.charge.hlm_min[__v_size]) {
					var __p_charge = __price_list.charge.price[__v_size];
					__p_result += '<tr><td>'+__price_list.label[11]+' '+__price_list.charge.hlm_min[__v_size]+' hlm<br>Rp'+__p_charge.toLocaleString()+'.00 * '+__v_eks+' eks</td>';
					__p_charge = __p_charge * __v_eks;
					__p_result += '<td>Rp'+__p_charge.toLocaleString()+'.00</td></tr>';
					__p_total += __p_charge;
				}

				if (__v_voucher > 0) {
					if (__price_list.voucher_eks_min > __v_eks) {
						alert(__price_list.label[20]+' '+__price_list.label[5]+' Min. '+__price_list.voucher_eks_min+' eks');
						__s_eks.val(__price_list.voucher_eks_min);
						__price_calc_f();
						return false;
					}
					var __v_voucher_m = __price_list.paket_disc.price[__v_paket];
					var __v_voucher_n = __price_list.voucher[__v_voucher]*1000;
					__p_result += '<tr><td>'+__price_list.label[20]+' Rp'+__v_voucher_n.toLocaleString()+'.00</td>';
					if (__v_voucher_m < __v_voucher_n) __v_voucher_n = __v_voucher_m;
					if (__v_eks >= __price_list.paket_disc.eks_min) __v_voucher_n = 0;
					__p_result += '<td class="__price_disc">Rp'+__v_voucher_n.toLocaleString()+'.00</td></tr>';
					__p_total -= __v_voucher_n;
				}
				
				if (__v_eks >= __price_list.paket_disc.eks_min) {
					var __p_paket_disc = __price_list.paket_disc.price[__v_paket];
					__p_result += '<tr><td>'+__price_list.label[10]+' '+__price_list.label[0]+'</td><td class="__price_disc">Rp'+__p_paket_disc.toLocaleString()+'.00</td></tr>';
					__p_total -= __p_paket_disc;
				}

				for (var i = __price_list.book_disc.eks_min.length - 1; i >= 0; i--) {
					if (__price_list.book_disc.eks_min[i] <= __v_eks) {
						var __p_book_disc = __price_list.book_disc.price[__v_size][i];
						__p_result += '<tr><td>'+__price_list.label[10]+' '+__price_list.label[6]+'<br>Rp'+__p_book_disc.toLocaleString()+'.00 * '+__v_eks+' eks</td>';
						__p_book_disc = __p_book_disc * __v_eks;
						__p_result += '<td class="__price_disc">Rp'+__p_book_disc.toLocaleString()+'.00</td></tr>';
						__p_total -= __p_book_disc;
						i = -1;
					}
				}

				var __p_result_url = window.location.origin+window.location.pathname+'?v='+__v_paket+'|'+__v_size+'|'+__v_paper+'|'+__v_finishing+'|'+__v_hlm+'|'+__v_eks+'|'+__v_paper_add+'|'+__v_hlm_add+'|'+__v_voucher;
				window.history.replaceState({},document.title,__p_result_url);
				__p_result += '<tr> <td><b>'+__price_list.label[7]+'</b></td> <td><b>Rp'+__p_total.toLocaleString()+'.00</b></td> </tr> </table></div><br><p><a class="fa fa-share" href="'+__p_result_url+'" onclick="copyTextToClipboard(window.__p_result_cb+this.href,\''+__price_list.label[17]+'\');return false;"> '+__price_list.label[16]+'</a></p>';
				window.__p_result_cb = __p_result.replace(/<\/td>\s?<\/tr>\s?<tr>\s?<td>/g,"\n\n").replace(/<tr>\s?<td>|<\/td>\s?<\/tr>|<b>|<\/b>|^.*?<table>\s?|<\/table>.*?$/g,"").replace(/\sclass="__price_disc">/g,">-").replace(/<\/td>\s?<td>|<br>/g,"\n")+"\n\n";

				var __p_weight_h = Math.ceil(__v_hlm/2);
				var __p_weight_p = __price_list.sizex[__v_size]*__price_list.sizey[__v_size];
				var __p_weight_s = Math.ceil((__p_weight_p*__price_list.finishing.gsm[__v_finishing]/10000)*2*12.4)/10;
				var __p_weight_i = Math.ceil((__p_weight_p*__price_list.paper.gsm[__v_paper]/10000)*__p_weight_h*12.4)/10;
				var __p_weight_t = __p_weight_s+__p_weight_i;
				__p_result += '<br><div><table><tr><td colspan="2" style="text-align:center;"><b>'+__price_list.label[21]+'</b></td></tr><tr><td>'+__price_list.finishing.title[__v_finishing]+' '+__price_list.finishing.gsm[__v_finishing]+' gsm</td><td>'+__p_weight_s+' gr</td></tr><tr><td>'+__price_list.paper.title[__v_paper]+' '+__price_list.paper.gsm[__v_paper]+' gsm '+__p_weight_h+' lbr</td><td>'+__p_weight_i+' gr</td></tr>';
				if (__v_hlm_add > 0) {
					var __p_weight_hh = Math.ceil(__v_hlm_add/2);
					var __p_weight_ii = Math.ceil((__p_weight_p*__price_list.paper.gsm[__v_paper_add]/10000)*__p_weight_hh*12.4)/10;
					__p_result += '<tr><td>'+__price_list.paper.title[__v_paper_add]+' '+__price_list.paper.gsm[__v_paper_add]+' gsm '+__p_weight_hh+' lbr</td><td>'+__p_weight_ii+' gr</td></tr>';
					__p_weight_t += __p_weight_ii;
				}
				__p_weight_t = Math.ceil(__p_weight_t*10)/10;
				var __p_weight_z = Math.ceil((__p_weight_t*__v_eks/1000)*100)/100;
				__p_result += '<tr><td colspan="2"></td></tr><tr><td>'+__price_list.label[6]+' 1 eks</td><td>'+__p_weight_t+' gr</td></tr><tr><td><b>'+__price_list.label[6]+' '+__v_eks+' eks</b></td><td><b>'+__p_weight_z+' kg</b></td></tr></table></div><br>';

				if (__price_admin_) {
					for (var i = 0; i < __price_list.channel.length; i++) {
						var __p_ch_price_p = __price_list.channel[i]['paper'][__v_paper][__v_size];
						var __p_ch_price_f = __price_list.channel[i]['finishing'][__v_finishing][__v_size];
						var __p_ch_price = __v_hlm*__p_ch_price_p+__p_ch_price_f;
						var __p_ch_price_ttl = __p_ch_price*__v_eks;
						var __p_benefit = __p_total - __p_ch_price_ttl;
						__p_result += '<br><div><table><tr><td colspan="2" style="text-align:center;"><b>'+__price_list.channel[i].name+'</b></td></tr><tr><td><b>'+__price_list.label[14]+'</b></td><td><b>Rp'+__p_total.toLocaleString()+'.00</b></td></tr><tr><tr><td>'+__price_list.label[6]+'<br>('+__v_hlm+' hlm * Rp'+__p_ch_price_p.toLocaleString()+'.00 + Rp'+__p_ch_price_f.toLocaleString()+'.00) * '+__v_eks+' eks<br>Rp'+__p_ch_price.toLocaleString()+'.00 * '+__v_eks+' eks</td><td>Rp'+__p_ch_price_ttl.toLocaleString()+'.00</td></tr>';
						
						if (__v_hlm >= __price_list.channel[i].charge.hlm_min[__v_size]) {
							var __p_ch_charge = __price_list.channel[i].charge.price[__v_size];
							__p_result += '<tr><td>'+__price_list.label[11]+' '+__price_list.channel[i].charge.hlm_min[__v_size]+' hlm<br>Rp'+__p_ch_charge.toLocaleString()+'.00 * '+__v_eks+' eks</td>';
							__p_ch_charge = __p_ch_charge * __v_eks;
							__p_result += '<td>Rp'+__p_ch_charge.toLocaleString()+'.00</td></tr>';
							__p_benefit -= __p_ch_charge;
						}

						__p_result += '<tr><td><b>'+__price_list.label[15]+'</b></td><td><b>Rp'+(__p_total-__p_benefit).toLocaleString()+'.00</b></td></tr><tr> <td><b>'+__price_list.label[13]+'</b></td> <td><b>Rp'+__p_benefit.toLocaleString()+'.00</b></td> </tr></table></div>';
					}
				}

				__price_calc_result.html(__p_result);
			}else{
				__price_calc_result.html('<br><p><b>'+__price_list.label[8]+'</b></p><br><div><table><tr><td colspan="2">'+__price_list.label[12]+'</td></tr><tr> <td><b>'+__price_list.label[7]+'</b></td> <td><b>Rp0.00</b></td> </tr></table></div>');
			}
		}

		__s_paket.on('change', function(event) {
			__price_calc_f();
		});
		__s_size.on('change', function(event) {
			__price_calc_f();
		});
		__s_paper.on('change', function(event) {
			__price_calc_f();
		});
		__s_paper_add.on('change', function(event) {
			__price_calc_f();
		});
		__s_finishing.on('change', function(event) {
			__price_calc_f();
		});
		__s_hlm.on('change keyup', function(event) {
			__price_calc_f();
		});
		__s_hlm_add.on('change keyup', function(event) {
			__price_calc_f();
		});
		__s_eks.on('change keyup', function(event) {
			__price_calc_f();
		});
		__s_voucher.on('change keyup', function(event) {
			__price_calc_f();
		});

		var __price_load = __urlp.get('v');
		if (__price_load) {
			__price_load = __price_load.split('|');
			if (__price_load.length>=6) {
				__s_paket.val(__price_load[0]);
				__s_size.val(__price_load[1]);
				__s_paper.val(__price_load[2]);
				__s_finishing.val(__price_load[3]);
				__s_hlm.val(__price_load[4]);
				__s_eks.val(__price_load[5]);
				__s_paper_add.val(__price_load[6]);
				__s_hlm_add.val(__price_load[7]);
				__s_voucher.val(__price_load[8]);
				$('html, body').animate({
					scrollTop: $('#__price_calc').offset().top - 150
				}, 2000);
			}
		}
		__price_calc_f();
	}
});
function fallbackCopyTextToClipboard(text,successmsg='') {
	var textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? successmsg : 'Fallback: Copying text command was unsuccessful';
		if (msg) {
			alert(msg);
		}
	} catch (err) {
		alert('Fallback: Oops, unable to copy', err);
	}
	document.body.removeChild(textArea);
}
function copyTextToClipboard(text,successmsg='') {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text,successmsg);
		return;
	}
	navigator.clipboard.writeText(text).then(function() {
		if (successmsg) {
			alert(successmsg);
		}
	}, function(err) {
		alert('Async: Could not copy text: ', err);
	});
}
