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
  var HOSTS=['perfis.','tdapocket.','dbpocket.','db.','td.','mr.','fraldas.','ebookenxoval.','ebookama.','ebooksono.','brunotropolis.github.io'];
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
})();
