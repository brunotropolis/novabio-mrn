// Gera as paginas da proposta (home + 3 fases). Rodar: node proposta/_build.js
const fs=require('fs'), path=require('path');
const D=__dirname;
const V=Date.now().toString(36);
const UTM='utm_source=instagram&utm_campaign=organico&utm_medium=publico-q&utm_id=clicou-link&utm_content=link-da-bio&src=organico%7Cpublico-q%7Cclicou-link%7Clink-da-bio';
// aulas de 10/11 = paginas da Black 2026 (ainda so em previa; trocar quando tiver dominio definitivo)
const CHEV='<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
const WCHEV='<span class="dchev"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>';
const ICON={
  book:'<path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/>',
  heart:'<path d="M12 20S3.8 15 3.8 9.2A3.9 3.9 0 0 1 12 6.8a3.9 3.9 0 0 1 8.2 2.4C20.2 15 12 20 12 20z"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  video:'<path d="M15 10l5-3v10l-5-3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>',
};

function head(title, depth, bc=''){
  const up=depth?'../':'';
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<link rel="icon" href="https://manualdorecemnascido.com.br/wp-content/uploads/2023/03/MRN-logo-site-1024x1024.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}bio.css?v=${V}">
</head>
<body${bc?` class="${bc}"`:''}>
<div class="wrap">
`;
}

function foot(depth){
  const up=depth?'../':'';
  return `
  <footer>
    <div class="fsoc">
      <a href="https://instagram.com/manualdorecemnascido" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="#C13584" stroke-width="1.9"><rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.7" cy="6.3" r="1.1" fill="#C13584" stroke="none"/></svg></a>
      <a href="https://youtube.com/manualdorecemnascido" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg></a>
      <a href="https://tiktok.com/@manualdorecemnascido" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="#010101"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.01-2.82h-3.09v12.4a2.43 2.43 0 1 1-2.43-2.43c.25 0 .5.04.74.12V9.96a5.54 5.54 0 0 0-.74-.05 5.52 5.52 0 1 0 5.52 5.52V9.13a7.34 7.34 0 0 0 4.3 1.38V7.42a4.28 4.28 0 0 1-3.29-1.6z"/></svg></a>
    </div>
    <img class="footlogo" src="https://manualdorecemnascido.com.br/wp-content/uploads/2023/03/MRN-logo-site-1024x1024.png" alt="">
    <div class="cp">© Manual do Recém-Nascido · Todos os direitos reservados</div>
  </footer>

</div>

<a class="wafloat" href="https://api.whatsapp.com/send?phone=554184144810&text=Oi,%20eu%20estava%20no%20Instagram%20e%20quero%20saber%20mais%20sobre%20os%20Cursos%20%26%20Consultas%20da%20Day.." target="_blank" rel="noopener" aria-label="Fale com a Carol no WhatsApp">
  <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c1.6.7 1.9.6 2.3.5a2.3 2.3 0 0 0 1.5-1.1c.2-.4.2-.8.1-.9z"/></svg>
</a>
<script src="${up}bio.js?v=${V}"></script>
</body>
</html>
`;
}

// card escuro (aula / ebook): o que é + chamada
function special(cls, href, tile, kick, title, cta){
  return `
    <a class="special ${cls}" href="${href}">
      ${tile}
      <span class="stxt">
        <span class="skick">${kick}</span>
        <div class="stitle">${title}</div>
        <span class="scta">${cta}</span>
      </span>
      ${WCHEV}
    </a>`;
}
// miniatura de aula: foto com botão de play por cima
const vid = img => `<span class="stile svid"><img src="${img}" alt=""><span class="play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span></span>`;
// miniatura de ebook: capa em pé, com cara de livro
const book = img => `<span class="sbook"><img src="${img}" alt=""></span>`;
const aula = (cls, href, img, title) => special(cls, href, vid(img), 'Aula gratuita', title, 'Quero assistir &gt;');
const ebook = (cls, href, img, title) => special(cls, href, book(img), 'Ebook gratuito', title, 'Baixar grátis &gt;');
const SECT = t => `
    <div class="sect">${t}</div>`;

// botão claro (curso / consulta)
function row(href, img, icon, tag, title, sub){
  return `
    <a class="row" href="${href}">
      <span class="tw"><img class="thumb" src="${img}" alt=""><span class="vec"><svg viewBox="0 0 24 24">${ICON[icon]}</svg></span></span>
      <span class="rtxt"><span class="tag">${tag}</span><div class="rtitle">${title}</div><div class="rsub">${sub}</div></span>
      <span class="chev">${CHEV}</span>
    </a>`;
}

const A='../../assets/day';
const PHASES={
  gestante:{
    cls:'p-gestantes', title:'Gestante', desc:'Prepare tudo antes do bebê chegar', pic:'th-gestante.jpg',
    body:()=>
      aula('sp-aula-g', `https://black.manualdorecemnascido.com.br/aula`, `${A}/tecnica-anjos.jpg`, 'Os desafios da maternidade') +
      ebook('sp-ebook-g', `https://ebookenxoval.manualdorecemnascido.com.br/?${UTM}`, `${A}/capa-ebook-enxoval.jpg`, 'Enxoval Descomplicado') +
      SECT('Curso completo') +
      row(`https://mr.manualdorecemnascido.com.br/?${UTM}`, `${A}/manual.jpg`, 'book',
        'Tudo em um só lugar', 'Manual do Recém-Nascido', 'Amamentação, sono e cuidados do zero, antes e depois do parto'),
  },
  amamentacao:{
    cls:'p-amam', title:'Amamentação', desc:'Amamente sem dor, do começo ao fim', pic:'th-amam-1.jpg',
    body:()=>
      aula('sp-aula-a', `https://clube.manualdorecemnascido.com.br/amamentacao`, `${A}/th-amam-2.jpg`, 'Mamando ou chupetando?') +
      ebook('sp-ebook-a', `https://ebookama.manualdorecemnascido.com.br/?${UTM}`, `${A}/capa-ebook-ama.jpg`, 'Por que meu bebê parece não saciar no seio?') +
      SECT('Pra começar hoje') +
      row(`https://tdapocket.manualdorecemnascido.com.br/?${UTM}`, `${A}/guia-pega.jpg`, 'heart',
        'Curso em vídeo', 'Guia da Pega', 'Amamente sem dor e com o bebê saciado') +
      row(`https://td.manualdorecemnascido.com.br/consulta-de-amamentacao?${UTM}`, `${A}/consulta-amam.jpg`, 'video',
        'Consulta individual', 'Consulta de Amamentação', 'Videochamada com a Day pra parar a dor e ver seu bebê mamando bem'),
  },
  sono:{
    cls:'p-sono', title:'Sono do Bebê', desc:'Faça seu bebê dormir bem e no berço', pic:'th-sono-1.jpg',
    body:()=>
      aula('sp-aula-s', `https://clube.manualdorecemnascido.com.br/sono`, `${A}/th-sono-2.jpg`, 'Autonomia de sono') +
      ebook('sp-ebook-s', `https://ebooksono.manualdorecemnascido.com.br/?${UTM}`, `${A}/capa-ebook-sono.jpg`, 'Os 5 motivos do bebê não dormir no berço') +
      special('sp-quiz-s', `https://perfis.manualdorecemnascido.com.br/?${UTM}`,
        `<span class="stile squiz"><img src="${A}/sono-pocket.jpg" alt="" style="transform:scaleX(-1)"><span class="qbadge"><svg viewBox="0 0 24 24">${ICON.moon}</svg></span></span>`,
        'Quiz gratuito', 'Descubra o perfil de sono do seu bebê', 'Fazer o quiz &gt;') +
      SECT('Pra começar hoje') +
      row(`https://dbpocket.manualdorecemnascido.com.br/?${UTM}`, `${A}/metodo-sono.jpg`, 'moon',
        'Curso em vídeo', 'Dream Baby Pocket', 'Em 30 minutos você aplica a técnica para fazer seu bebê dormir bem e sem choro') +
      row(`https://db.manualdorecemnascido.com.br/consulta-do-sono-com-day?${UTM}`, `${A}/consulta-sono.jpg`, 'video',
        'Consulta individual', 'Consulta de Sono', 'Videochamada com a Day pro seu bebê dormir no berço em poucos dias'),
  },
};

// ---- páginas das fases
for(const [slug,p] of Object.entries(PHASES)){
  const html = head(`${p.title} · Dayane Dos Anjos`, 1, `bg-${slug}`) + `
  <div class="topbar">
    <a class="back" href="../" data-keep><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>Voltar</a>
  </div>

  <header class="phasehero ${p.cls}">
    <div class="phimg" style="background-image:url('${A}/hero-${slug}.jpg')"></div>
    <div class="phtxt"><span class="phkick">Você está em</span><h1>${p.title}</h1></div>
  </header>

  <div class="phasebody">${SECT('Gratuito pra você')}${p.body()}
  </div>
` + foot(1);
  fs.writeFileSync(path.join(D,slug,'index.html'), html);
}

// ---- home
const H='../assets/day';
const phaseLink=(slug,p)=>`
  <a class="cat ${p.cls}" href="${slug}/" data-keep>
    <div class="phead">
      <span class="pic"><img src="${H}/${p.pic}" alt=""></span>
      <div class="ptwrap"><span class="pt">${p.title}</span></div>
      <span class="catchev">${CHEV}</span>
    </div>
  </a>`;
const home = head('Dayane Dos Anjos · Manual do Recém-Nascido', 0) + `
  <h1 class="askphase">Em que fase você está?</h1>
${Object.entries(PHASES).map(([s,p])=>phaseLink(s,p)).join('')}

  <a class="special sp-ofertas" href="https://asofertasmaternas.com.br/?${UTM}">
    <span class="stile"><img src="${H}/ofertas-whats-day.jpg" alt=""></span>
    <span class="stxt">
      <span class="skick">As Ofertas Maternas</span>
      <div class="stitle">Procurando as melhores ofertas de produtos para bebês?</div>
      <div class="ssub">Clique aqui 💚</div>
    </span>
    ${WCHEV}
  </a>

  <div class="simple-parc">
    <div class="sp-title">parceria &amp; publicidade</div>
    <a href="mailto:assessoria@manualdorecemnascido.com.br">assessoria@manualdorecemnascido.com.br</a>
  </div>
` + foot(0);
fs.writeFileSync(path.join(D,'index.html'), home);
console.log('ok');
