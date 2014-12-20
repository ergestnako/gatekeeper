Ext.define("Site.page.Endpoints",{singleton:true,constructor:function(){var a=this;a.endpoints=new Ext.util.Collection();a.requestsRenderer=Ext.util.Format.numberRenderer("0,000");Ext.onReady(a.onDocReady,a)},onDocReady:function(){var b=this,a=b.endpoints,c=b.endpointsCt=Ext.getBody().down(".endpoints");Ext.getBody().on("click",function(e,d){var f=e.getTarget(".endpoint",null,true);f.toggleCls("expanded")},null,{delegate:".endpoint"});c.select(".endpoint",true).each(function(h){var g=h.down("header"),e=g.insertFirst({cls:"metric-primary-value",cn:[{tag:"span",cls:"number",html:"&mdash;"},{tag:"span",cls:"unit",html:"requests"}]}),d=g.insertFirst({cls:"metric-secondary-ct",cn:[{cls:"metric-secondary-bar"},{cls:"metric-secondary-value",cn:[{tag:"span",cls:"number",html:"&mdash;"},{tag:"span",cls:"unit",html:"ms"}]}]}),f=g.insertFirst({cls:"metric-secondary-ct",cn:[{cls:"metric-secondary-bar"},{cls:"metric-secondary-value",cn:[{tag:"span",cls:"number",html:"&mdash;"},{tag:"span",cls:"unit",html:"%"}]}]});a.add({id:parseInt(h.getAttribute("data-id"),10),el:h,responseTimeBarEl:d.down(".metric-secondary-bar"),responseTimeValueEl:d.down(".metric-secondary-value .number"),cacheHitRatioBarEl:f.down(".metric-secondary-bar"),cacheHitRatioValueEl:f.down(".metric-secondary-value .number"),requestsBarEl:g.insertFirst({cls:"metric-primary-bar"}),requestsValueEl:e.down(".number")})});b.loadMetrics()},loadMetrics:function(){var c=this,b=c.requestsRenderer,a=c.endpoints,d=a.getCount(),e=c.endpointsCt;Ext.Ajax.request({url:"/metrics/endpoints-current",headers:{Accept:"application/json"},success:function(g){var f=Ext.decode(g.responseText,true),m=f&&f.data,k=m&&m.length,h,o,n,j=0,l=0;if(!m){console.error("Failed to load endpoints");return}for(h=0;h<k;h++){o=m[h];j+=o.requests;l=Math.max(l,o.responseTime);a.getByKey(o.EndpointID).lastMetrics=o}a.sortItems(function(p,i){if(p.lastMetrics.requests==i.lastMetrics.requests){return 0}return p.lastMetrics.requests>i.lastMetrics.requests?-1:1});for(h=0;h<d;h++){e.appendChild(a.getAt(h).el)}Ext.defer(function(){var p=0,t,r,s,u,q;for(;p<d;p++){t=a.getAt(p);r=t.lastMetrics;u=r.requests;t.requestsBarEl.setStyle("width",Math.round(u/j*100)+"%");t.requestsValueEl.update(b(u));s=r.responseTime;t.responseTimeBarEl.setStyle("height",Math.round(s/l*100)+"%");t.responseTimeValueEl.update(s);q=u?Math.round(r.responsesCached/u*100):0;t.cacheHitRatioBarEl.setStyle("height",q+"%");t.cacheHitRatioValueEl.update(q.toString())}},1);if(!c.updatesPaused){Ext.defer(c.loadMetrics,2000,c)}}})}});