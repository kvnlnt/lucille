var Pickl=function(a){var b={};b.form={width:320,height:520},b.config=this.Config,b.theme="zen",b.svg=null,b.callback=function(a){console.log(a)},_.extend(this,b,a),this.themeLoad(),this.render()};Pickl.prototype.Config=function(){var a={title:"Options",fields:{remove:{type:"button",text:"Remove",callback:function(){alert("delete")}},order_test:{name:"order",value:"two",enabled:!0,options:{two:{name:"two",value:"two"},1:{name:"1",value:"1"}}},orientation:{name:"orientation",value:"righty",enabled:!0,callback:null,options:{righty:{name:"righty",value:"RIGHTY"},lefty:{name:"lefty",value:"LEFTY"}}},root:{name:"root",value:"c_n",enabled:!0,options:{c_n:{name:"C",value:"C"},c_s:{name:"C#",value:"C#"},d_f:{name:"Db",value:"Db"},d_n:{name:"D",value:"D"},d_s:{name:"D#",value:"D#"},e_f:{name:"Eb",value:"Eb"},e_n:{name:"E",value:"E"},f_n:{name:"F",value:"F"},f_s:{name:"F#",value:"F#"},g_b:{name:"Gb",value:"Gb"},g_n:{name:"G",value:"G"},g_s:{name:"G#",value:"G#"},a_f:{name:"Ab",value:"Ab"},a_n:{name:"A",value:"A"},a_s:{name:"A#",value:"A#"},b_b:{name:"Bb",value:"Bb"},b_n:{name:"B",value:"B"}}},instrument:{name:"instrument",value:"guitar",enabled:!0,callback:null,options:{guitar:{name:"guitar",value:"GUITAR",enable:"tuning_guitar",disable:"tuning_banjo"},banjo:{name:"banjo",value:"BANJO",disable:"tuning_guitar",enable:"tuning_banjo"}}},tuning_guitar:{name:"tuning",value:"standard",enabled:!0,options:{standard:{name:"standard",value:"EADGBE"},drop_d:{name:"drop d",value:"DADGBE"}}},tuning_banjo:{name:"tuning",value:"standard",enabled:!1,options:{standard:{name:"standard",value:"EADG"},drop_d:{name:"drop d",value:"DADG"}}}}};return a}(),Pickl.prototype.render=function(){this.pickl=this.pickl||this.renderForm(),this.pickl.clear(),this.pickl.background=this.renderBackground(),this.pickl.title=this.renderTitle(),this.pickl.close=this.renderClose(),this.pickl.fields=this.renderFields()},Pickl.prototype.renderForm=function(){var a=null===this.svg?Snap(this.form.width,this.form.height):this.svg,b=a.attr("class")+" pickl";return a.attr({"class":b,transform:"translate("+this.form.width+",0)"}),a},Pickl.prototype.renderBackground=function(){var a=this.pickl.rect(0,0,this.form.width,this.form.height);return a.attr({"class":"background"}),a},Pickl.prototype.renderTitle=function(){var a=this.pickl.text(this.form.width/2,50,this.config.title);return a.attr({"class":"title"}),a},Pickl.prototype.renderClose=function(){{var a=this.pickl.g().attr("class","button close"),b=.15*this.form.width/2,c=this.form.height-70,d=.85*this.form.width,e=50;a.rect(b,c,d,e).attr({"class":"touchTarget"}),a.text(this.form.width/2,c+25,"close")}return a.click(this.save,this),a},Pickl.prototype.renderFields=function(){var a=this,b=this.calcLayout().fields,c=this.pickl.g().attr("class","fields"),d=90;return _.each(this.config.fields,function(e){if(e.enabled){{var f=c.g().attr({"class":"field button",transform:"translate("+b.x+","+d+")"});f.rect(0,0,b.width,40).attr({"class":"touchTarget"}),f.text(b.x+70,20,e.name).attr({"class":"title"}),f.text(b.x+80,20,e.options[e.value].name).attr("class","value")}d+=41;var g=void 0===e.callback||null===e.callback?function(){a.displayOptions(e)}:e.callback;f.click(g,a)}if("button"===e.type){{var f=c.g().attr({"class":"field button",transform:"translate("+b.x+","+d+")"});f.rect(0,0,b.width,40).attr({"class":"touchTarget"}),f.text(b.width/2,20,e.text).attr({"class":"text"})}d+=41,f.click(e.callback,a)}}),c.selectAll(".field")},Pickl.prototype.renderOptions=function(a){var b=this,c=b.calcLayout().fields,d=this.pickl.g().attr({"class":"options"}),e=(d.rect(0,0,b.form.width,b.form.height).attr("class","background"),d.text(b.form.width/2,27,a.name).attr("class","title options"),b.form.height-140),f=40*_.size(a.options)>e,g=Math.floor(e/40),h=f?e/g:40,i=d.rect(c.x,50,c.width,e+g).attr({fill:"#FFFFFF"}),j=d.mask().add(i).attr({"class":"mask"}),k=d.g().attr({"class":"fields",mask:j}),l=k.g().data("y",0),m=a.options[a.value].value,n=0,o=50,p=c.x-1,q=this.form.height-70,r=!0===f?"":"hide",s=d.g().attr({"class":"field button scroll "+r,transform:"translate("+this.form.width/2+","+q+")"}),t=!0,u=(s.rect(0,0,c.width/2-2,h).attr({"class":"touchTarget"}),s.text(c.width/4,h/2,"").attr({"class":"value"}),d.g().attr({"class":"field button scroll "+r,transform:"translate("+c.x+","+q+")"})),v=(u.rect(0,0,c.width/2-2,h).attr({"class":"touchTarget"}),u.text(c.width/4,h/2,"").attr({"class":"value"}),function(){t=!0,x()}),w=function(){t=!1},x=function(){var b=l.data("y")-(h+1),c=-(_.size(a.options)-g)*(h+1);Math.ceil(b)>=c&&(l.animate({transform:"translate(0,"+b+")"},100,mina.easeout,function(){t&&x()}),l.data("y",b))},y=function(){t=!0,z()},z=function(){var a=l.data("y")+(h+1);Math.floor(a)<=0&&(l.animate({transform:"translate(0,"+a+")"},100,mina.easeout,function(){t&&z()}),l.data("y",a))};s.mousedown(v),s.mouseup(w),u.mousedown(y),u.mouseup(w),d.attr({transform:"translate("+this.form.width+",0)"});var A=1;if(_.each(a.options,function(e,f){{var g=l.g().attr({"class":"field button",transform:"translate("+p+","+o+")"}),i=(g.rect(0,0,c.width,h).attr({"class":"touchTarget"}),g.text(h,h/2,e.name).attr({"class":"value"}),e.value===m?"check selected":"check"),j=g.g().attr({"class":i});j.rect(0,0,h,h).attr({"class":"touchTarget"}),j.text(h/4,h/2,"").attr({"class":"value"})}e.value===m&&(n=A),A+=1,o+=h+1,g.click(function(){a.value=f,d.animate({transform:"translate("+this.form.width+",0)"},200,mina.easeout,function(){this.remove()}),b.displayField(e.disable,!1),b.displayField(e.enable,!0),b.render()},b)}),n>g){var o=-(n-g)*(h+1);l.attr({transform:"translate(0,"+o+")"}),l.data("y",o)}return d},Pickl.prototype.calcLayout=function(){var a={};return a.fields=this.calcFields(),a},Pickl.prototype.calcFields=function(){var a=40,b=.85*this.form.width,c=.15*this.form.width/2;return{height:a,width:b,x:c}},Pickl.prototype.display=function(){this.pickl.animate({transform:"translate(0,0)"},200,mina.easein)},Pickl.prototype.displayOptions=function(a){var b=this.renderOptions(a);b.animate({transform:"translate(0,0)"},200,mina.easin)},Pickl.prototype.displayField=function(a,b){var c=this,a="string"==typeof a?[a]:a;_.each(a,function(a){void 0!==c.config.fields[a]&&(c.config.fields[a].enabled=b)})},Pickl.prototype.save=function(){var a={};_.each(this.config.fields,function(b){b.enabled&&(a[b.name]=b.options[b.value])}),this.callback(a),this.pickl.animate({transform:"translate("+this.form.width+",0)"},200,mina.easein)},Pickl.prototype.themes=function(){var a={};return a.plain={},a.plain.background="#e2e2e2",a.plain.fieldset="#666666",a.plain.touchTarget="#f2f2f2",a.plain.touchTargetOver="#000000",a.plain.buttonTextColor="#999999",a.plain.buttonTextColorOver="#e2e2e2",a.plain.buttonStroke="#e2e2e2",a.plain.modalBackground="#f2f2f2",a.zen={},a.zen.background="#000000",a.zen.fieldset="#666666",a.zen.touchTarget="#222222",a.zen.touchTargetOver="#444444",a.zen.titleColor="#FFFFFF",a.zen.buttonTextColor="#999999",a.zen.buttonTextColorOver="#FFFFFF",a.zen.buttonStroke="",a.zen.modalBackground="#000000",a}(),Pickl.prototype.themeLoad=function(){var a=this.themes[this.theme];$(".picklTheme").remove();var b="",c=$("<style>");return c.attr("type","text/css"),c.attr("class","picklTheme"),b+="@font-face {",b+="font-family: 'VarelaRound';",b+="font-style: normal;",b+="font-weight: 400;",b+="src: local('VarelaRound'), local('VarelaRound-Regular'), url(fonts/Varela_Round/VarelaRound-Regular.woff) format('woff');",b+="}",b+=".pickl { font-family:'VarelaRound'; font-size: 1rem; }",b+=".pickl .title { text-transform: uppercase; font-size: 1.5rem; }",b+=".pickl .title.options { font-size: .7rem; opacity: 0.5; }",b+=".pickl .hide { display: none; }",b+=".pickl text { alignment-baseline:central; text-anchor:middle; pointer-events:none; }",b+=".pickl .button { cursor: pointer; font-size: 0.85rem; }",b+=".pickl .button.close { text-transform: uppercase; }",b+=".pickl .button.arrow .touchTarget { stroke:none; }",b+=".pickl .field { font-size: 0.85rem; }",b+=".pickl .field .title { font-size: .7rem; opacity: 0.5; text-anchor: end; }",b+=".pickl .field .value { text-anchor:start; }",b+=".pickl .field .check { font-family:'FontAwesome'; font-size: 1.25rem; text-anchor:middle; opacity: .2; cursor: pointer; }",b+=".pickl .scroll { font-family:'FontAwesome'; font-size: 1.25rem; text-anchor:middle; opacity: .8; cursor: pointer; }",b+=".pickl .scroll .value { text-anchor:middle; }",b+=".pickl .field .check.selected, .pickl .field:hover .check, .pickl .scroll:hover { opacity: 1; }",b+=".pickl .background { fill: "+a.background+"; } ",b+=".pickl .fieldset { fill: "+a.fieldset+"; } ",b+=".pickl .title { fill: "+a.titleColor+";} ",b+=".pickl .field text, .close text { fill:"+a.buttonTextColor+"} ",b+=".pickl .button > .touchTarget, .pickl .field .touchTarget { fill: "+a.touchTarget+"; } ",b+=".pickl .button > .touchTarget { stroke: "+a.buttonStroke+"; } ",b+=".pickl .button:hover .touchTarget { fill: "+a.touchTargetOver+"; cursor:pointer; } ",b+=".pickl .button:hover text { fill: "+a.buttonTextColorOver+"; } ",b+=".pickl .button > .arrow > .touchTarget { fill: "+a.touchTarget+" } ",c.append(b),$("head").append(c),c};