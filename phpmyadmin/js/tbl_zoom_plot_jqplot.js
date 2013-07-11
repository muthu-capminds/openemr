function displayHelp(){PMA_ajaxShowMessage(PMA_messages.strDisplayHelp,10000)}Array.max=function(a){return Math.max.apply(Math,a)};Array.min=function(a){return Math.min.apply(Math,a)};function isNumeric(a){return !isNaN(parseFloat(a))&&isFinite(a)}function isEmpty(b){var a;for(a in b){return false}return true}function getTimeStamp(b,a){if(a.toString().search(/datetime/i)!=-1||a.toString().search(/timestamp/i)!=-1){return getDateFromFormat(b,"yyyy-MM-dd HH:mm:ss")}else{if(a.toString().search(/time/i)!=-1){return getDateFromFormat("1970-01-01 "+b,"yyyy-MM-dd HH:mm:ss")}else{if(a.toString().search(/date/i)!=-1){return getDateFromFormat(b,"yyyy-MM-dd")}}}}function getType(a){if(a.toString().search(/int/i)!=-1||a.toString().search(/decimal/i)!=-1||a.toString().search(/year/i)!=-1){return"numeric"}else{if(a.toString().search(/time/i)!=-1||a.toString().search(/date/i)!=-1){return"time"}else{return"text"}}}function getCord(b){var a=[];var c=$.extend(true,[],b);var b=jQuery.unique(b).sort();$.each(c,function(d,e){a.push(jQuery.inArray(e,b))});return[a,b,c]}function scrollToChart(){var a=$("#dataDisplay").offset().top-100;$("html,body").animate({scrollTop:a},500)}AJAX.registerTeardown("tbl_zoom_plot_jqplot.js",function(){$("#tableid_0").unbind("change");$("#tableid_1").unbind("change");$("#tableid_2").unbind("change");$("#tableid_3").unbind("change");$("#inputFormSubmitId").unbind("click");$("#togglesearchformlink").unbind("click");$("#dataDisplay").find(":input").die("keydown");$("button.button-reset").unbind("click");$("div#resizer").unbind("resizestop");$("div#querychart").unbind("jqplotDataClick")});AJAX.registerOnload("tbl_zoom_plot_jqplot.js",function(){var C=($("input[name='mode']:checked").val()=="edit")?"crosshair":"pointer";var m=null;var e=null;var p=$("#tableid_0").val();var s=$("#tableid_1").val();var r=$("#types_0").val();var d=$("#types_1").val();var b=$("#dataLabel").val();var n;var l;var A=1;var t=jQuery.parseJSON($("#querydata").html());$("#tableid_0").change(function(){$.post("tbl_zoom_select.php",{ajax_request:true,change_tbl_info:true,db:PMA_commonParams.get("db"),table:PMA_commonParams.get("table"),field:$("#tableid_0").val(),it:0,token:PMA_commonParams.get("token")},function(D){$("#tableFieldsId tr:eq(1) td:eq(0)").html(D.field_type);$("#tableFieldsId tr:eq(1) td:eq(1)").html(D.field_collation);$("#tableFieldsId tr:eq(1) td:eq(2)").html(D.field_operators);$("#tableFieldsId tr:eq(1) td:eq(3)").html(D.field_value);p=$("#tableid_0").val();$("#types_0").val(D.field_type);r=D.field_type;$("#collations_0").val(D.field_collations);addDateTimePicker()})});$("#tableid_1").change(function(){$.post("tbl_zoom_select.php",{ajax_request:true,change_tbl_info:true,db:PMA_commonParams.get("db"),table:PMA_commonParams.get("table"),field:$("#tableid_1").val(),it:1,token:PMA_commonParams.get("token")},function(D){$("#tableFieldsId tr:eq(3) td:eq(0)").html(D.field_type);$("#tableFieldsId tr:eq(3) td:eq(1)").html(D.field_collation);$("#tableFieldsId tr:eq(3) td:eq(2)").html(D.field_operators);$("#tableFieldsId tr:eq(3) td:eq(3)").html(D.field_value);s=$("#tableid_1").val();$("#types_1").val(D.field_type);d=D.field_type;$("#collations_1").val(D.field_collations);addDateTimePicker()})});$("#tableid_2").change(function(){$.post("tbl_zoom_select.php",{ajax_request:true,change_tbl_info:true,db:PMA_commonParams.get("db"),table:PMA_commonParams.get("table"),field:$("#tableid_2").val(),it:2,token:PMA_commonParams.get("token")},function(D){$("#tableFieldsId tr:eq(6) td:eq(0)").html(D.field_type);$("#tableFieldsId tr:eq(6) td:eq(1)").html(D.field_collation);$("#tableFieldsId tr:eq(6) td:eq(2)").html(D.field_operators);$("#tableFieldsId tr:eq(6) td:eq(3)").html(D.field_value);$("#types_2").val(D.field_type);$("#collations_2").val(D.field_collations);addDateTimePicker()})});$("#tableid_3").change(function(){$.post("tbl_zoom_select.php",{ajax_request:true,change_tbl_info:true,db:PMA_commonParams.get("db"),table:PMA_commonParams.get("table"),field:$("#tableid_3").val(),it:3,token:PMA_commonParams.get("token")},function(D){$("#tableFieldsId tr:eq(8) td:eq(0)").html(D.field_type);$("#tableFieldsId tr:eq(8) td:eq(1)").html(D.field_collation);$("#tableFieldsId tr:eq(8) td:eq(2)").html(D.field_operators);$("#tableFieldsId tr:eq(8) td:eq(3)").html(D.field_value);$("#types_3").val(D.field_type);$("#collations_3").val(D.field_collations);addDateTimePicker()})});$("#inputFormSubmitId").click(function(){if($("#tableid_0").get(0).selectedIndex==0||$("#tableid_1").get(0).selectedIndex==0){PMA_ajaxShowMessage(PMA_messages.strInputNull)}else{if(p==s){PMA_ajaxShowMessage(PMA_messages.strSameInputs)}}});$('<div id="togglesearchformdiv"><a id="togglesearchformlink"></a></div>').insertAfter("#zoom_search_form").hide();$("#togglesearchformlink").html(PMA_messages.strShowSearchCriteria).bind("click",function(){var D=$(this);$("#zoom_search_form").slideToggle();if(D.text()==PMA_messages.strHideSearchCriteria){D.text(PMA_messages.strShowSearchCriteria)}else{D.text(PMA_messages.strHideSearchCriteria)}return false});var h={};h[PMA_messages.strSave]=function(){var N={};var D={};var G=0;var M=false;var F=false;var L;for(L in z){var K=z[L];var E=($("#edit_fields_null_id_"+G).prop("checked"))?null:$("#edit_fieldID_"+G).val();if(E instanceof Array){E=$("#edit_fieldID_"+G).map(function(){return $(this).val()}).get().join(",")}if(K!=E){z[L]=E;N[L]=E;if(L==p){M=true;t[e][p]=E}else{if(L==s){F=true;t[e][s]=E}}}var H=$("#edit_fieldID_"+G);if(H.hasClass("bit")){D[L]="bit"}G++}if(M||F){if(M){f[e]=z[p];if(r=="numeric"){q[0][e][0]=z[p]}else{if(r=="time"){q[0][e][0]=getTimeStamp(z[p],$("#types_0").val())}else{}}m.series[0].data=q[0];m.replot()}if(F){v[e]=z[s];if(d=="numeric"){q[0][e][1]=z[s]}else{if(d=="time"){q[0][e][1]=getTimeStamp(z[s],$("#types_1").val())}else{}}m.series[0].data=q[0];m.replot()}}if(!isEmpty(N)){var I="UPDATE `"+PMA_commonParams.get("table")+"` SET ";for(L in N){I+="`"+L+"`=";var J=N[L];if(J==null){I+="NULL, "}else{if($.trim(J)==""){I+="'', "}else{if(D[L]!=null){if(D[L]=="bit"){I+="b'"+J+"', "}}else{if(!isNumeric(J)){I+="'"+J+"', "}else{I+=J+", "}}}}}I=I.substring(0,I.length-2);I+=" WHERE "+PMA_urldecode(t[e]["where_clause"]);$.post("sql.php",{token:PMA_commonParams.get("token"),db:PMA_commonParams.get("db"),ajax_request:true,sql_query:I,inline_edit:false},function(O){if(O.success==true){$("#sqlqueryresults").html(O.sql_query);$("#sqlqueryresults").trigger("appendAnchor")}else{PMA_ajaxShowMessage(O.error,false)}})}$("#dataDisplay").dialog("close")};h[PMA_messages.strCancel]=function(){$(this).dialog("close")};$("#dataDisplay").dialog({autoOpen:false,title:PMA_messages.strDataPointContent,modal:true,buttons:h,width:$("#dataDisplay").width()+80,open:function(){$(this).find("input[type=checkbox]").css("margin","0.5em")}});$("#dataDisplay").find(":input").live("keydown",function(D){if(D.which===13){D.preventDefault();if(typeof h[PMA_messages.strSave]==="function"){h[PMA_messages.strSave].call()}}});if(t!=null){$("#zoom_search_form").slideToggle().hide();$("#togglesearchformlink").text(PMA_messages.strShowSearchCriteria);$("#togglesearchformdiv").show();var z;var x=["#FF0000","#00FFFF","#0000FF","#0000A0","#FF0080","#800080","#FFFF00","#00FF00","#FF00FF"];var q=[];var f=[];var v=[];var i,g;var k=0;var B;var y;var c;var a;var j={series:[{showLine:false}],grid:{drawBorder:false,shadow:false,background:"rgba(0,0,0,0)"},axes:{xaxis:{label:$("#tableid_0").val(),labelRenderer:$.jqplot.CanvasAxisLabelRenderer},yaxis:{label:$("#tableid_1").val(),labelRenderer:$.jqplot.CanvasAxisLabelRenderer}},highlighter:{show:true,tooltipAxes:"y",yvalues:2,formatString:'<span class="hide">%s</span>%s'},cursor:{show:true,zoom:true,showTooltip:false}};if(b==""){j.highlighter.show=false}r=getType(r);d=getType(d);q[0]=[];if(r=="time"){var u=$("#types_0").val();var w;if(u=="date"){w="%Y-%m-%d"}$.extend(j.axes.xaxis,{renderer:$.jqplot.DateAxisRenderer,tickOptions:{formatString:w}})}if(d=="time"){var o=$("#types_1").val();var w;if(o=="date"){w="%Y-%m-%d"}$.extend(j.axes.yaxis,{renderer:$.jqplot.DateAxisRenderer,tickOptions:{formatString:w}})}$.each(t,function(D,F){if(r=="numeric"){var G=parseFloat(F[p])}if(r=="time"){var G=getTimeStamp(F[p],u)}if(d=="numeric"){var E=parseFloat(F[s])}if(d=="time"){var E=getTimeStamp(F[s],o)}q[0].push([G,E,F[b],F.where_clause,D])});m=$.jqplot("querychart",q,j);m.resetZoom();$("button.button-reset").click(function(D){D.preventDefault();m.resetZoom()});$("div#resizer").resizable();$("div#resizer").bind("resizestop",function(D,E){$("div#querychart").height($("div#resizer").height()*0.96);$("div#querychart").width($("div#resizer").width()*0.96);m.replot({resetAxes:true})});$("div#querychart").bind("jqplotDataClick",function(H,D,G,I){e=I[4];var F=0;var E={ajax_request:true,get_data_row:true,db:PMA_commonParams.get("db"),table:PMA_commonParams.get("table"),where_clause:I[3],token:PMA_commonParams.get("token")};$.post("tbl_zoom_select.php",E,function(K){var J;for(J in K.row_info){$field=$("#edit_fieldID_"+F);$field_null=$("#edit_fields_null_id_"+F);if(K.row_info[J]==null){$field_null.prop("checked",true);$field.val("")}else{$field_null.prop("checked",false);if($field.attr("multiple")){$field.val(K.row_info[J].split(","))}else{$field.val(K.row_info[J])}}F++}z={};z=K.row_info});$("#dataDisplay").dialog("open")})}});