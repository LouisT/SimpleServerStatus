window.onload = function () {
         request("./server.php?list&callback=runner","ServerList");
};
function display (obj) {
         if (!("__requestid__" in obj)) {
            return false;
         };
         var id = obj["__requestid__"];
         if (!$(id)) {
            var content = '<td><span class="tooltip"><span style="font-size: 16px;" class="icon-switch" id="st_'+id+'"></span></span></td>'+
                          '<td><span class="tooltip"><span style="font-size: 16px;" id="os_'+id+'"></span></span></td>'+
                          '<td class="center"><span id="hn_'+id+'">N/A</span></td>'+
                          '<td rowspan="2"><span class="info" id="ram_'+id+'"></span></td>'+
                          '<td rowspan="2"><span class="info" id="hdd_'+id+'"></span></td>'+
                          '<td rowspan="2"><span class="info" id="net_'+id+'"></span></td>'+
                          '<td rowspan="2"><span class="info" id="load_'+id+'"></span></td>'+
                          '<td rowspan="2"><span class="info" id="up_'+id+'"></span></td>'+
                          '<td rowspan="2"><span class="info" id="svs_'+id+'"></span></td>';
            var serv = $("tr",1);
            serv.setAttribute("id",id);
            serv.setAttribute("class","sLi");
            serv.innerHTML = content;
            document.getElementById("servers").appendChild(serv);
            var lwrap = $("tr",1);
            lwrap.setAttribute("id","lwarp_"+id);
            lwrap.setAttribute("class","sLi");
            lwrap.innerHTML = '<td colspan="3" style="padding: 0;"><span class="info" id="loc_'+id+'">Unknown!</span></td>';
            document.getElementById("servers").appendChild(lwrap);
         };
         if ((hn = $("hn_"+id))) {
            hn.innerHTML = obj.hostname||obj["__requestid__"];
         };
         if (('error' in obj)) {
            var infos = $(id).querySelectorAll('span.info');
            Object.keys(infos).forEach(function (info) {
                infos[info].innerHTML = "";
            });
            var st = $("st_"+id);
            st.style.color = "red";
            st.parentNode.dataset.tip = "Offline";
          } else {
            var st = $("st_"+id);
            st.style.color = "green";
            st.parentNode.dataset.tip = "Online";
         };
         if ((os = $("os_"+id))) {
            obj.platform = (("platform" in obj)?obj.platform:"unknown!");
            switch (obj.platform) {
                   case "linux":
                        var icon = "tux";
                        break;
                   case "windows":
                        var icon = "windows";
                        break;
                   case "darwin":
                        var icon = "apple";
                        break;
                   case "freebsd":
                        var icon = "freebsd",
                            osname = "FreeBSD";
                        break;
                   default:
                        var icon = "sad";
            };
            os.setAttribute("class","icon-"+icon);
            os.parentNode.dataset.tip = (osname?osname:obj.platform.ucfirst());
         };
         if ((loc = $("loc_"+id))) {
            if (('provider' in obj)) {
               var prov = ("url" in obj.provider?'<a href="'+obj.provider.url+'" target="_blank">'+obj.provider.name+'</a>':obj.provider.name);
               loc.innerHTML = prov+" ("+obj.provider.location+")";
             } else {
               loc.innerHTML = "Unknown!";
            };
         };
         if ((ram = $("ram_"+id))) {
            if (('memory' in obj)) {
               var free = ("actualFree" in obj.memory?obj.memory.actualFree:obj.memory.free),
                   total = obj.memory.total,
                   used = total-free,
                   txt = used.BytesToSize()+'/'+obj.memory.total.BytesToSize(),
                   per = ("percentUsed" in obj.memory?obj.memory.percentUsed:Math.floor(((total-free)/total)*100));
               ram.innerHTML = '<div class="pbar"><div class="label">'+txt+'</div><div class="fill" style="width:'+per+'%"><div class="label">'+txt+'</div></div></div>';
             } else {
               ram.innerHTML = "Unavailable!";
            };
         };
         if ((hdd = $("hdd_"+id))) {
            if (("disk" in obj)) {
               var free = obj.disk.free,
                   total = obj.disk.total,
                   used = obj.disk.used,
                   txt = used.BytesToSize()+'/'+obj.disk.total.BytesToSize(),
                   per = obj.disk.per;
               hdd.innerHTML = '<div class="pbar"><div class="label">'+txt+'</div><div class="fill" style="width:'+per+'"><div class="label">'+txt+'</div></div></div>';
             } else {
               hdd.innerHTML = 'Unavailable!';
            };
         };
         if ((net = $("net_"+id))) {
            if (('network' in obj)) {
               var tx = Sparkline(obj.network.tx).map(function (spark,idx) {
                        return '<span data-tip="TX: '+obj.network.tx[idx].BytesToSize()+'/s" class="tooltip index"><span class="count" style="height: '+spark+'%;">'+spark+'</span> </span>';
                   }).join(""),
                   rx = Sparkline(obj.network.rx).map(function (spark,idx) {
                        return '<span data-tip="RX: '+obj.network.rx[idx].BytesToSize()+'/s" class="tooltip index"><span class="count" style="height: '+spark+'%;">'+spark+'</span> </span>';
                   }).join("");
               net.innerHTML = '<span class="sparkline">'+tx+'</span><br /><span class="sparkline">'+rx+'</span>';
             } else {
               net.innerHTML = 'Unavailable!';
            };
         };
         if ((load = $("load_"+id))) {
            if (('loadavg' in obj)) {
               var m1 = Sparkline(obj.loadavg[0],null,obj.loadavg[3]).map(function (spark,idx) {
                        var ext = (obj.loadavg[0][idx] >= obj.loadavg[3]?'background-color:red':'');
                        return '<span data-tip="1 Minute: '+obj.loadavg[0][idx]+'" class="tooltip index"><span class="count" style="height: '+spark+'%;'+ext+'">'+spark+'</span> </span>';
                   }).join(""),
                   m5 = Sparkline(obj.loadavg[1],null,obj.loadavg[3]).map(function (spark,idx) {
                        var ext = (obj.loadavg[1][idx] >= obj.loadavg[3]?'background-color:red':'');
                        return '<span data-tip="5 Minutes: '+obj.loadavg[1][idx]+'" class="tooltip index"><span class="count" style="height: '+spark+'%;'+ext+'">'+spark+'</span> </span>';
                   }).join(""),
                   m15 = Sparkline(obj.loadavg[2],null,obj.loadavg[3]).map(function (spark,idx) {
                        var ext = (obj.loadavg[2][idx] >= obj.loadavg[3]?'background-color:red':'');
                        return '<span data-tip="15 Minutes: '+obj.loadavg[2][idx]+'" class="tooltip index"><span class="count" style="height: '+spark+'%;'+ext+'">'+spark+'</span> </span>';
                   }).join("");
               load.innerHTML = '<span class="sparkline">'+m1+'</span><br /><span class="sparkline">'+m5+'</span><br /><span class="sparkline">'+m15+'</span>';
             } else {
               load.innerHTML = "Unavailable!";   
            };
         };
         if ((uptime = $("up_"+id))) {
            if (('uptime' in obj)) {
               uptime.innerHTML = duration(obj.uptime);
             } else {
               uptime.innerHTML = "Unavailable!";
            };
         };
         if ((svs = $("svs_"+id))) {
            if (('information' in obj)) {
               svs.innerHTML = obj.information.services.join(', ');
             } else {
               svs.innerHTML = "Unavailable!";
            };
         };
};
function runner (obj) {
         var update = (obj.update||60)*1000;
         var fn = (function (obj) {
             return function () {
                   obj.ids.forEach(function (id) {
                       request("./server.php?id="+id+"&callback=display","s_"+id);
                   });
             };
         })(obj);
         fn();
         setInterval(fn,update);
};
function request (url,id) {
         var old = null;
         if ((old = $(id))) {
            old.parentNode.removeChild(old);
         };
         var script = $("script",1);
         script.setAttribute("id",id);
         script.setAttribute("src",url);
         document.getElementsByTagName('head')[0].appendChild(script);
};
Number.prototype.BytesToSize = function () {
         var base = Math.log(this)/Math.log(1024);
         var suffixes = ['B','KB','MB','GB','TB','PB','EB'];
         var ret = Math.round(100*Math.pow(1024,base-Math.floor(base)))/100+suffixes[Math.floor(base)];
         return (ret?ret:"0B");
};
function $ (id,create) {
         return (!create?document.getElementById(id):document.createElement(id));
};
function duration (t) {
        return parseInt(t/86400)+'d '+(new Date(t%86400*1000)).toUTCString().replace(/.*(\d{2}):(\d{2}):(\d{2}).*/, "$1h $2m $3s");
};
function Sparkline (nums,fmin,fmax) {
         var max = Math.max.apply(null,nums),
             min = Math.min.apply(null,nums),
             ticks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
                      26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,
                      48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,
                      70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,
                      92,93,94,95,96,97,98,99,100];
         max = (fmax&&max<fmax?fmax:max);
         min = (fmin&&min>fmin?fmin:min);
         return nums.map(function(num){ return ticks[Math.round((num-min)*(ticks.length-1)/(max-min))]||ticks[ticks.length-1]; });
};
String.prototype.ucfirst = function() {
         return this.charAt(0).toUpperCase() + this.slice(1);
};
