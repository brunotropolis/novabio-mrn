// Proposta da bio: repassa a rede (?rede / subdominio / utm_source) entre as paginas
// e grava utm_source nos links de curso/ebook/aula. Default instagram.
(function(){
  var NET={fb:'facebook',ig:'instagram',yt:'youtube',tk:'tiktok'};
  var sub=(location.hostname.split('.')[0]||'').toLowerCase();
  var net=NET[sub], med=null, qs;
  try{
    qs=new URLSearchParams(location.search);
    var r=(qs.get('rede')||'').toLowerCase();
    if(NET[r]) net=NET[r];
    if(qs.get('utm_source')) net=qs.get('utm_source');
    if(qs.get('utm_medium')) med=qs.get('utm_medium');
    else if(qs.get('fluxo')) med='fluxo-'+qs.get('fluxo').toLowerCase();
  }catch(e){}
  if(!net) net='instagram';
  // links internos (fases e voltar) carregam a mesma query string
  if(location.search){
    document.querySelectorAll('a[data-keep]').forEach(function(a){
      a.href=a.getAttribute('href').split('?')[0]+location.search;
    });
  }
  // voltar: se veio da home da proposta, volta no historico (mantem a rolagem)
  var back=document.querySelector('.back');
  if(back){
    back.addEventListener('click',function(e){
      try{
        if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){
          e.preventDefault(); history.back();
        }
      }catch(_){}
    });
  }
  var HOSTS=['perfis.','tdapocket.','dbpocket.','db.','td.','mr.','fraldas.','ebookenxoval.','ebookama.','ebooksono.','brunotropolis.github.io','black.','clube.','asofertasmaternas.'];
  document.querySelectorAll('.wrap a[href^="http"]').forEach(function(a){
    var h; try{ h=new URL(a.href).hostname; }catch(e){ return; }
    if(!HOSTS.some(function(p){ return h.indexOf(p)===0; })) return;
    try{
      var u=new URL(a.href);
      u.searchParams.set('utm_source', net);
      if(med){
        u.searchParams.set('utm_medium', med);
        var src=u.searchParams.get('src');
        if(src){ var p=src.split('|'); if(p.length>=2){ p[1]=med; u.searchParams.set('src', p.join('|')); } }
      }
      a.href=u.toString();
    }catch(e){}
  });

  // Coletor de cliques -> Worker bio-tracker (/__ev) -> Supabase bio_events (Dash Link Bio, filtro por rede).
  // page = proposta/<fase>. Nada de dado pessoal: so rede, aparelho, botao e destino.
  var ua=navigator.userAgent||'';
  var device=/Mobi|Android|iPhone|iPod/i.test(ua)?'mobile':(/iPad|Tablet/i.test(ua)?'tablet':'desktop');
  var os=/iPhone|iPad|iPod/i.test(ua)?'iOS':/Android/i.test(ua)?'Android':/Windows/i.test(ua)?'Windows':(/Mac OS X|Macintosh/i.test(ua)?'macOS':(/Linux/i.test(ua)?'Linux':'outro'));
  var sid='',uid='';
  try{ sid=sessionStorage.getItem('bio_sid'); if(!sid){ sid=Date.now().toString(36)+Math.random().toString(36).slice(2,8); sessionStorage.setItem('bio_sid',sid);} }catch(e){}
  try{ uid=localStorage.getItem('bio_uid'); if(!uid){ uid=Date.now().toString(36)+Math.random().toString(36).slice(2,10); localStorage.setItem('bio_uid',uid);} }catch(e){}
  var fase=location.pathname.replace(/\/+$/,'').split('/').pop();
  var page=fase&&fase!=='proposta'?'proposta/'+fase:'proposta';
  function ev(o){
    o.sid=sid; o.uid=uid; o.rede=net; o.device=device; o.os=os; o.page=page; o.ref=document.referrer||'';
    try{ navigator.sendBeacon('/__ev', new Blob([JSON.stringify(o)],{type:'application/json'})); }catch(e){}
  }
  ev({type:'pageview'});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href]'); if(!a) return;
    var cat=a.classList.contains('wafloat')?'whatsapp':a.classList.contains('sp-black')?'black':a.classList.contains('sp-ofertas')?'ofertas':
      /sp-aula/.test(a.className)?'aula':/sp-ebook/.test(a.className)?'ebook':/sp-quiz/.test(a.className)?'quiz':
      a.classList.contains('cat')?'fase':a.closest('footer')?'rodape':a.closest('.simple-parc')?'parceria':(fase||'home');
    var t=a.querySelector('.rtitle,.stitle,.pt');
    var label=t?t.textContent.trim():(a.getAttribute('aria-label')||(a.textContent||'').trim().slice(0,80));
    var dest=''; try{ dest=new URL(a.href).hostname+new URL(a.href).pathname.replace(/\/$/,''); }catch(_){}
    ev({type:'click', label:'proposta · '+label, category:cat, dest:dest.slice(0,120)});
  },true);
})();
