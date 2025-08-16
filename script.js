// 🔒 Digital Watermark — Mazudiary by Premii & Idiot (c) 2025
// For personal, romantic use only. Unauthorized use prohibited.

// bWF6dWRpYXJ5IHwgcHJpdmF0ZSBnaWZ0IC0gMjAyNSBQcmVtaWkgJiBJZGlvdA==


const config = {
    start: new Date(2025, 5, 17, 0, 48), // months are 0-based: 5 = June (17 June 2025 00:48)
    milestones: [
      {title: "First meet", date: new Date(2020,1,14), note: "Omor Ekhushe Boi Mela (14 Feb 2020)"},
      {title: "Our 1st adda", date: new Date(2020,1,21), note: "21 February 2020 — lots of talk & laughs"},
      {title: "First \"I love you\"", date: new Date(2025,5,17), note: "17 June 2025 — the heart said it first"},
      {title: "First call you \"Premii\"", date: new Date(2025,5,19), note: "19 June 2025 — the cutest nickname appears"},
      {title: "First \"Date\"", date: new Date(2025,6,1), note: "01 July 2025 — the first official date"}
    ],
    displayNames: [
      "Premii","Shokher Nari","Partner","Dreamy Sweetest Gifty Queen","Wiffeey",
      "Idiot","Jamai","Husband","Jamai"
    ]
  };

  // ====== UTIL: friendly date formatting ======
  function fmtDate(d){
    return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
  }

  // ====== calculate months/days properly ======
  function monthsAndDaysBetween(start, end){
    // count full months difference using year/month arithmetic, then remainder days
    let yearDiff = end.getFullYear() - start.getFullYear();
    let monthDiff = end.getMonth() - start.getMonth();
    let months = yearDiff*12 + monthDiff;

    // adjust down if end day/time is before start day/time in the month
    const startDay = start.getDate();
    const nowDay = end.getDate();
    const startTime = start.getHours()*60 + start.getMinutes();
    const endTime = end.getHours()*60 + end.getMinutes();

    // create a candidate date = start + months months
    function addMonths(d, m){
      let y = d.getFullYear();
      let mo = d.getMonth() + m;
      let day = d.getDate();
      const res = new Date(y, mo, 1, d.getHours(), d.getMinutes(), d.getSeconds());
      const daysInMonth = new Date(res.getFullYear(), res.getMonth()+1, 0).getDate();
      res.setDate(Math.min(day, daysInMonth));
      return res;
    }

    let candidate = addMonths(start, months);
    if (end < candidate){
      months -= 1;
      candidate = addMonths(start, months);
    }

    // remainder days
    const msPerDay = 1000*60*60*24;
    const days = Math.floor((end - candidate)/msPerDay);

    return {months, days};
  }

  function daysBetween(a,b){
    const msPerDay=1000*60*60*24;
    return Math.floor((b-a)/msPerDay);
  }

  // ====== RENDER timeline & stats ======
  function render(){
    const now = new Date();
    const md = monthsAndDaysBetween(config.start, now);
    document.getElementById('monthsText').textContent = md.months + (md.months === 1 ? ' month' : ' months');
    document.getElementById('daysText').textContent = md.days + (md.days === 1 ? ' day' : ' days') + ' more';

    // timeline
    const tl = document.getElementById('timeline');
    tl.innerHTML = '';
    config.milestones.forEach(m=>{
      const el = document.createElement('div');
      el.className = 'event';
      el.innerHTML = `
        <div class="dot"></div>
        <div>
          <div class="ev-text">${m.title} · <span style="font-weight:800">${fmtDate(m.date)}</span></div>
          <div class="ev-sub">${m.note}</div>
        </div>
      `;
      tl.appendChild(el);
    });

    // message
    const daysTotal = daysBetween(config.start, now);
    const messageEl = document.getElementById('message');
    if (md.months >= 2){
      messageEl.innerHTML = `Happy <strong>${md.months} months</strong> my Premii! 🎉 We've crossed <strong>${daysTotal}</strong> days together since 17 Jun 2025. I'm dreaming of our wedding and future — Jamai ♥️`;
    } else {
      messageEl.innerHTML = `Beautiful Dreamy Sweet Premii, we're <strong>${md.months} months</strong> and <strong>${md.days} days</strong> into this beautiful start. Every day with you feels like a page from a novel.`;
    }
  }

  render();
  setInterval(render, 1000*30); // refresh every 30s for subtle live feel

  // ====== Toggle name pills ======
  let namesVisible = true;
  document.getElementById('toggleNames').addEventListener('click', ()=>{
    const nwrap = document.querySelector('.names');
    namesVisible = !namesVisible;
    nwrap.style.display = namesVisible ? 'flex' : 'none';
  });

  // ====== Cute floating hearts (canvas) ======
  const heartLayer = document.getElementById('heartLayer');
  const CV = document.createElement('canvas');
  heartLayer.appendChild(CV);
  const ctx1 = CV.getContext('2d');

  function resizeHeartLayerCanvas(){
    CV.width = heartLayer.clientWidth;
    CV.height = heartLayer.clientHeight;
  }
  window.addEventListener('resize', resizeHeartLayerCanvas);
  resizeHeartLayerCanvas();

  // generate heart shapes
  function heartPath(x,y,s){
    const r = s;
    ctx1.beginPath();
    ctx1.moveTo(x, y + r/4);
    ctx1.bezierCurveTo(x, y - r/2, x - r, y - r/2, x - r, y + r/4);
    ctx1.bezierCurveTo(x - r, y + r, x - r/2, y + r*1.6, x, y + r*2);
    ctx1.bezierCurveTo(x + r/2, y + r*1.6, x + r, y + r, x + r, y + r/4);
    ctx1.bezierCurveTo(x + r, y - r/2, x, y - r/2, x, y + r/4);
    ctx1.closePath();
  }

  const hearts1 = [];
  function spawnFloatingHeart(x=null){
    const size = 6 + Math.random()*28;
    hearts1.push({
      x: x===null ? Math.random()*CV.width : x,
      y: CV.height + 10,
      vx: (Math.random()-0.5)*1.2,
      vy: -1.2 - Math.random()*2.2,
      size,
      hue: 320 - Math.random()*40,
      alpha: 0.85
    });
    if (hearts1.length > 140) hearts1.splice(0, hearts1.length-120);
  }

  // spawn some initially
  for(let i=0;i<20;i++) spawnFloatingHeart();

  function animate(){
    ctx1.clearRect(0,0,CV.width,CV.height);
    for(let i=hearts1.length-1;i>=0;i--){
      const h=hearts1[i];
      h.x += h.vx;
      h.y += h.vy;
      h.vx *= 0.995;
      h.vy += 0.015; // gravity
      h.alpha *= 0.999;

      ctx1.save();
      ctx1.globalAlpha = Math.max(0,h.alpha);
      ctx1.fillStyle = `hsl(${h.hue} 90% 65%)`;
      ctx1.strokeStyle = `rgba(255,255,255,0.08)`;
      ctx1.lineWidth = 1;
      heartPath(h.x, h.y, h.size/8 + h.size/12);
      ctx1.fill();
      ctx1.stroke();
      ctx1.restore();

      if (h.y < -30 || h.alpha < 0.02 || h.x < -100 || h.x > CV.width + 100){
        hearts1.splice(i,1);
      }
    }

    // occasional spawn
    if (Math.random()<0.25) spawnFloatingHeart();
    requestAnimationFrame(animate);
  }
  animate();

  // clicking celebrate spawns many hearts + confetti
  document.getElementById('celebrateBtn').addEventListener('click', ()=>{
    // spawn hearts from center, adjust for mobile/desktop
    const card = document.getElementById('card');
    const rect = card.getBoundingClientRect();
    let centerX = rect.width / 2;
    let offsetX = rect.left;
    let spawnX;
    if (window.innerWidth <= 600) {
      // For mobile, spawn hearts more centered to viewport
      spawnX = window.innerWidth / 2;
      for(let i=0;i<40;i++){
        spawnFloatingHeart(spawnX + (Math.random()-0.5)*80);
      }
    } else {
      for(let i=0;i<40;i++){
        spawnFloatingHeart(centerX + (Math.random()-0.5)*rect.width*0.5);
      }
    }
    launchConfetti();
  });

  // ====== Simple confetti using small rectangles ======
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.left = 0;
  confettiCanvas.style.top = 0;
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = 9999;
  document.body.appendChild(confettiCanvas);
  const confCtx = confettiCanvas.getContext('2d');
  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
  }
  window.addEventListener('resize', resizeConfettiCanvas);
  window.addEventListener('orientationchange', resizeConfettiCanvas);
  resizeConfettiCanvas();

  const confettiPieces = [];
  function launchConfetti(){
    for(let i=0;i<120;i++){
      confettiPieces.push({
        x: window.innerWidth/2 + (Math.random()-0.5)*300,
        y: window.innerHeight/2 + (Math.random()-0.5)*100,
        vx: (Math.random()-0.5)*8,
        vy: -6 - Math.random()*6,
        size: 6 + Math.random()*10,
        rot: Math.random()*Math.PI*2,
        vr: (Math.random()-0.5)*0.3,
        hue: 320 - Math.random()*80,
        life: 80 + Math.random()*40
      });
    }
    if(!confettiLoopRunning) confettiLoop();
  }

  let confettiLoopRunning = false;
  function confettiLoop(){
    confettiLoopRunning = true;
    function step(){
      confCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
      for(let i=confettiPieces.length-1;i>=0;i--){
        const p = confettiPieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.vr += 0;
        p.rot += p.vr;
        p.life--;
        confCtx.save();
        confCtx.translate(p.x, p.y);
        confCtx.rotate(p.rot);
        confCtx.fillStyle = `hsl(${p.hue} 88% 58%)`;
        confCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        confCtx.restore();
        if(p.life <= 0 || p.y > confettiCanvas.height + 50) confettiPieces.splice(i,1);
      }
      if(confettiPieces.length>0) requestAnimationFrame(step);
      else confettiLoopRunning = false;
    }
    requestAnimationFrame(step);
  }

  // ====== Download as PNG (screenshot of card) using html2canvas ======
  document.getElementById('downloadPNG').addEventListener('click', async ()=>{
    try {
      const el = document.getElementById('card');
      showCustomPopup({
        icon: '⏳',
        message: 'Preparing your image... Please wait a moment.',
      });
      html2canvas(el, {backgroundColor: null, scale: 2}).then(canvas => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'Premii_and_Jamai_2months.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showCustomPopup({
          icon: '💖',
          message: 'Image saved! Check your downloads.',
        });
      }).catch(e => {
        showCustomPopup({
          icon: '😢',
          message: 'Could not save image. Error: ' + e.message,
        });
      });
    } catch(e) {
      showCustomPopup({
        icon: '😢',
        message: 'Could not save image. Error: ' + e.message,
      });
    }
  });

  // ====== Copy message action ======

// Custom Popup Modal Logic
function showCustomPopup({icon='💖',message='',input=null,okText='OK',cancelText=null,onOk=null,onCancel=null}){
  const popup = document.getElementById('customPopup');
  const box = document.getElementById('customPopupBox');
  const iconEl = document.getElementById('customPopupIcon');
  const msgEl = document.getElementById('customPopupMsg');
  const inputWrap = document.getElementById('customPopupInputWrap');
  const inputEl = document.getElementById('customPopupInput');
  const okBtn = document.getElementById('customPopupOk');
  const cancelBtn = document.getElementById('customPopupCancel');
  iconEl.textContent = icon;
  msgEl.textContent = message;
  if(input!==null){
    inputWrap.style.display='block';
    inputEl.value = input;
    setTimeout(()=>inputEl.focus(),100);
  }else{
    inputWrap.style.display='none';
    inputEl.value = '';
  }
  okBtn.textContent = okText||'OK';
  if(cancelText){
    cancelBtn.style.display='';
    cancelBtn.textContent = cancelText;
  }else{
    cancelBtn.style.display='none';
  }
  popup.style.display='flex';
  function close(){
    popup.style.display='none';
  }
  okBtn.onclick = ()=>{
    close();
    if(onOk) onOk(input!==null ? inputEl.value : undefined);
  };
  cancelBtn.onclick = ()=>{
    close();
    if(onCancel) onCancel();
  };
  document.getElementById('customPopupClose').onclick = close;
  popup.onclick = (e)=>{ if(e.target===popup) close(); };
  inputEl.onkeydown = (e)=>{ if(e.key==='Enter'){ okBtn.click(); } };
}

document.getElementById('shareBtn').addEventListener('click', ()=>{
  const msg = `My Premii 💖\n\nHappy 2 months since 17 June 2025. From Omor Ekhushe Boi Mela (14 Feb 2020) to our first adda and today — I want to marry you and make every day our little forever. Yours, Jamai (idiot 😄)`;
  navigator.clipboard?.writeText(msg).then(()=> {
    showCustomPopup({
      icon: '💌',
      message: 'Sweet message copied! Paste it to Premii 💌',
    });
  }).catch(()=> {
    showCustomPopup({
      icon: '📋',
      message: 'Copy this message to Premii:',
      input: msg,
      okText: 'Copy',
      cancelText: 'Cancel',
      onOk: (val) => {
        navigator.clipboard?.writeText(val);
      }
    });
  });
});


 /* Lightbox logic */
// Lightbox logic with arrow navigation
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const memoryItems = Array.from(document.querySelectorAll(".memory-item"));
let currentMemoryIndex = -1;

function showMemoryAt(idx) {
  if (idx < 0 || idx >= memoryItems.length) return;
  currentMemoryIndex = idx;
  const item = memoryItems[idx];
  const type = item.dataset.type;
  const src = item.dataset.src;
  lightboxContent.innerHTML = "";
  let mediaEl;
  if (type === "image") {
    mediaEl = document.createElement("img");
    mediaEl.src = src;
    lightboxContent.appendChild(mediaEl);
  } else {
    mediaEl = document.createElement("video");
    mediaEl.src = src;
    mediaEl.controls = true;
    mediaEl.autoplay = true;
    lightboxContent.appendChild(mediaEl);
  }
  // Add left/right arrow buttons
  const leftBtn = document.createElement('button');
  leftBtn.innerHTML = '⟵';
  leftBtn.className = 'lightbox-arrow left';
  leftBtn.tabIndex = 0;
  leftBtn.title = 'Previous memory';
  leftBtn.onclick = (e) => { e.stopPropagation(); showPrevMemory(); };
  const rightBtn = document.createElement('button');
  rightBtn.innerHTML = '⟶';
  rightBtn.className = 'lightbox-arrow right';
  rightBtn.tabIndex = 0;
  rightBtn.title = 'Next memory';
  rightBtn.onclick = (e) => { e.stopPropagation(); showNextMemory(); };
  // Responsive: wrap arrows below on mobile
  if (window.innerWidth <= 600) {
    const arrowWrap = document.createElement('div');
    arrowWrap.className = 'lightbox-arrow-wrap';
    if (idx > 0) arrowWrap.appendChild(leftBtn);
    if (idx < memoryItems.length - 1) arrowWrap.appendChild(rightBtn);
    lightboxContent.appendChild(arrowWrap);
  } else {
    if (idx > 0) lightboxContent.appendChild(leftBtn);
    if (idx < memoryItems.length - 1) lightboxContent.appendChild(rightBtn);
  }
  lightbox.classList.add("active");
  startHearts();
}

function showPrevMemory() {
  if (currentMemoryIndex > 0) {
    showMemoryAt(currentMemoryIndex - 1);
  }
}
function showNextMemory() {
  if (currentMemoryIndex < memoryItems.length - 1) {
    showMemoryAt(currentMemoryIndex + 1);
  }
}

memoryItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    showMemoryAt(idx);
  });
});

document.getElementById("lightboxClose").addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxContent.innerHTML = "";
  stopHearts();
  currentMemoryIndex = -1;
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') {
    showPrevMemory();
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    showNextMemory();
    e.preventDefault();
  } else if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    lightboxContent.innerHTML = "";
    stopHearts();
    currentMemoryIndex = -1;
  }
});

/* Heart animation in lightbox */
const heartCanvas=document.getElementById("heartCanvas");
const ctx=heartCanvas.getContext("2d");
let hearts=[];
let heartAnim;
function resizeLightboxCanvas(){
  heartCanvas.width=window.innerWidth;
  heartCanvas.height=window.innerHeight;
}
window.addEventListener("resize",resizeLightboxCanvas);
resizeLightboxCanvas();
function spawnHeart(){
  hearts.push({
    x:Math.random()*heartCanvas.width,
    y:heartCanvas.height+20,
    size:8+Math.random()*20,
    vy:-1-Math.random()*2,
    alpha:1
  });
}
function drawHeart(h){
  ctx.beginPath();
  const s=h.size;
  ctx.moveTo(h.x,h.y+s/4);
  ctx.bezierCurveTo(h.x,h.y-s/2,h.x-s,h.y-s/2,h.x-s,h.y+s/4);
  ctx.bezierCurveTo(h.x-s,h.y+s,h.x-s/2,h.y+s*1.5,h.x,h.y+s*1.8);
  ctx.bezierCurveTo(h.x+s/2,h.y+s*1.5,h.x+s,h.y+s,h.x+s,h.y+s/4);
  ctx.bezierCurveTo(h.x+s,h.y-s/2,h.x,h.y-s/2,h.x,h.y+s/4);
  ctx.closePath();
  ctx.fillStyle=`rgba(255,107,203,${h.alpha})`;
  ctx.fill();
}
function animateHearts(){
  ctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
  if(Math.random()<0.2) spawnHeart();
  hearts.forEach(h=>{
    h.y+=h.vy;
    h.alpha-=0.005;
  });
  hearts=hearts.filter(h=>h.alpha>0);
  hearts.forEach(drawHeart);
  heartAnim=requestAnimationFrame(animateHearts);
}
function startHearts(){
  hearts=[];
  cancelAnimationFrame(heartAnim);
  animateHearts();
}
function stopHearts(){
  cancelAnimationFrame(heartAnim);
  hearts=[];
  ctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
}

/* Love Poem Popup logic */
const lovePopup = document.getElementById('lovePopup');
const lovePopupClose = document.getElementById('lovePopupClose');
document.getElementById('showLovePoem').addEventListener('click', ()=>{
  lovePopup.style.display = 'flex';
});
lovePopupClose.addEventListener('click', ()=>{
  lovePopup.style.display = 'none';
});
lovePopup.addEventListener('click', (e)=>{
  if(e.target === lovePopup) lovePopup.style.display = 'none';
});

// Access control logic
// Access control logic with live countdown update
(function(){
  const unlockDate = new Date(2025,7,17,0,48,0); // 17 Aug 2025 (month is 0-based)
  const overlay = document.getElementById('accessOverlay');
  const mainContent = document.getElementById('card');
  function pad(n){ return n<10?'0'+n:n; }

  function updateCountdown(){
    const now = new Date();
    const diff = unlockDate - now;
    if(diff > 0){
      const d = Math.floor(diff/(1000*60*60*24));
      const h = Math.floor((diff/(1000*60*60))%24);
      const m = Math.floor((diff/(1000*60))%60);
      const s = Math.floor((diff/1000)%60);
      // Only update the text content of the countdown elements
      const timerEl = document.getElementById('countdownTimer');
  // Format with leading zeros and spaced colons
  function pad2(n) { return n<10 ? '0'+n : n; }
  if (timerEl) timerEl.textContent = `${pad2(d)}  days  :  ${pad2(h)}  hours  :  ${pad2(m)}  min  :  ${pad2(s)}  sec`;
    } else {
      clearInterval(timer);
      showPasswordPrompt();
    }
  }

  function showPasswordPrompt(){
    overlay.innerHTML = `<form class='pw-box' id='pwForm' autocomplete='off'>
      <div class='pw-heart'>💌</div>
      <div class='pw-title'>A secret for my Premii</div>
      <div class='pw-desc'>Whisper the magic word to open our world of love.<br><span style='color:#ff6bcb;font-size:20px;'>♥</span><br><span style='color:#b82e7c;font-size:15px;display:block;margin-top:8px;'>Hint: Our love starting date in 8 digits <br/>(Format: DDMMYYYY)</span></div>
      <div style='position:relative;display:inline-block;'>
        <input class='pw-input' id='pwInput' type='password' placeholder='Type the secret...' autocomplete='new-password' style='padding-right:38px;' />
        <button type='button' id='pwToggle' tabindex='-1' aria-label='Show/Hide password' style='position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;outline:none;cursor:pointer;font-size:20px;color:#e14fa1;opacity:0.85;'>
          <span id='pwEye'>👁️</span>
        </button>
      </div><br>
      <button class='pw-btn' type='submit'>Unlock Love</button>
      <div class='pw-err' id='pwErr'></div>
    </form>`;
    const pwInput = document.getElementById('pwInput');
    const pwToggle = document.getElementById('pwToggle');
    const pwEye = document.getElementById('pwEye');
    pwToggle.addEventListener('click', function(){
      if(pwInput.type === 'password'){
        pwInput.type = 'text';
        pwEye.textContent = '🙈';
      } else {
        pwInput.type = 'password';
        pwEye.textContent = '👁️';
      }
    });
    let wrongCount = 0;
    document.getElementById('pwForm').onsubmit = function(e){
      e.preventDefault();
      const pwRaw = pwInput.value;
      const pw = pwRaw.trim();
      const err = document.getElementById('pwErr');
      if (!pw || pw.length === 0) {
        err.textContent = 'Please enter the magic word.';
      } 
      else if (pw === '17062025') {
        overlay.style.display = 'none';
        // Show unlock animation
        const unlockAnim = document.getElementById('unlockAnimation');
        const glowNames = document.getElementById('glowNames');
        unlockAnim.style.display = 'flex';
        glowNames.textContent = 'Premii 💖 Idiot';
        glowNames.style.display = 'block';
        const unlockPoem = document.getElementById('unlockPoem');
        unlockPoem.innerHTML = '';
        unlockPoem.style.display = 'none';
        // Floating hearts & sparkles animation
        const heartCanvas = document.getElementById('unlockHearts');
        const ctx = heartCanvas.getContext('2d');
        function resizeUnlockHearts() {
          heartCanvas.width = window.innerWidth;
          heartCanvas.height = window.innerHeight;
        }
        resizeUnlockHearts();
        window.addEventListener('resize', resizeUnlockHearts);
        let hearts = [], sparkles = [];
        function spawnHeart() {
          hearts.push({
            x: Math.random()*heartCanvas.width,
            y: heartCanvas.height+20,
            size: 16+Math.random()*36,
            vy: -1.2-Math.random()*2.2,
            alpha: 1,
            hue: 320-Math.random()*60
          });
        }
        function spawnSparkle() {
          sparkles.push({
            x: Math.random()*heartCanvas.width,
            y: Math.random()*heartCanvas.height*0.7,
            r: 1+Math.random()*2.5,
            alpha: 0.7+Math.random()*0.3,
            t: 0,
            color: `hsl(${320-Math.random()*60},90%,90%)`
          });
        }
        function drawHeart(h) {
          ctx.save();
          ctx.beginPath();
          const s=h.size;
          ctx.moveTo(h.x,h.y+s/4);
          ctx.bezierCurveTo(h.x,h.y-s/2,h.x-s,h.y-s/2,h.x-s,h.y+s/4);
          ctx.bezierCurveTo(h.x-s,h.y+s,h.x-s/2,h.y+s*1.5,h.x,h.y+s*1.8);
          ctx.bezierCurveTo(h.x+s/2,h.y+s*1.5,h.x+s,h.y+s,h.x+s,h.y+s/4);
          ctx.bezierCurveTo(h.x+s,h.y-s/2,h.x,h.y-s/2,h.x,h.y+s/4);
          ctx.closePath();
          ctx.globalAlpha = h.alpha;
          ctx.fillStyle=`hsl(${h.hue},90%,70%)`;
          ctx.shadowColor = `hsl(${h.hue},90%,80%)`;
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.restore();
        }
        function drawSparkle(s) {
          ctx.save();
          ctx.globalAlpha = s.alpha * (0.7+0.3*Math.sin(s.t*2));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
        let animFrame;
        function animateHearts() {
          ctx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
          if(Math.random()<0.5) spawnHeart();
          if(Math.random()<0.18) spawnSparkle();
          hearts.forEach(h=>{
            h.y+=h.vy;
            h.alpha-=0.006;
          });
          hearts=hearts.filter(h=>h.alpha>0);
          sparkles.forEach(s=>{ s.t+=0.04; });
          sparkles= sparkles.filter(s=>s.t<2.5);
          hearts.forEach(drawHeart);
          sparkles.forEach(drawSparkle);
          animFrame=requestAnimationFrame(animateHearts);
        }
        animateHearts();
        // Glowing text reveal animation
        glowNames.style.opacity = 0;
        glowNames.style.transform = 'scale(0.85)';
        setTimeout(()=>{
          glowNames.style.transition = 'opacity 1.2s cubic-bezier(.7,-0.2,.3,1.4), transform 1.2s cubic-bezier(.7,-0.2,.3,1.4)';
          glowNames.style.opacity = 1;
          glowNames.style.transform = 'scale(1)';
        }, 400);
        // Poetic message reveal
        const poem = `In this moment, two hearts beat as one.<br>Every memory, every dream, every "I love you"<br>is a promise to forever.<br><span style='font-size:1.5em;color:#fffbe6;text-shadow:0 0 18px #e14fa1;'>💖</span>`;
        setTimeout(()=>{
          unlockPoem.innerHTML = '';
          unlockPoem.style.display = 'block';
          let i = 0;
          function revealChar() {
            unlockPoem.innerHTML = poem.slice(0, i) + '<span style="opacity:0.5;">|</span>';
            i++;
            if (i <= poem.length) setTimeout(revealChar, 18);
            else unlockPoem.innerHTML = poem;
          }
          revealChar();
        }, 1200);
        // Fade in main content after animation (5s)
        setTimeout(()=>{
          unlockAnim.style.transition = 'opacity 1.1s';
          unlockAnim.style.opacity = 0;
          setTimeout(()=>{
            unlockAnim.style.display = 'none';
            mainContent.style.opacity = 0;
            mainContent.style.display = '';
            setTimeout(()=>{
              mainContent.style.transition = 'opacity 1.1s';
              mainContent.style.opacity = 1;
            }, 30);
            cancelAnimationFrame(animFrame);
          }, 1100);
        }, 5000);
      } else {
        wrongCount++;
        let msg = 'Oops! That’s not the magic word, my love.';
        if (wrongCount >= 3 && wrongCount < 5) {
          msg = 'Still not right! Take a deep breath and remember our special date.';
        } else if (wrongCount >= 5 && wrongCount < 10) {
          msg = 'Premii, are you teasing me? Hint: DDMMYYYY, our love start.';
        } else if (wrongCount >= 10) {
          msg = 'Let me help: 17062025. Because I want you to see our love story!';
        }
        err.textContent = msg;
        err.style.animation = 'none';
        void err.offsetWidth; // trigger reflow for animation
        err.style.animation = null;
      }
    };
  }
  // Initial check
  if(new Date() < unlockDate){
    mainContent.style.display = 'none';
    // Render static HTML for countdown overlay if not present
    if (!document.getElementById('countdownTimer')) {
      overlay.innerHTML = `<div class='countdown-box'>
        <div class='countdown-heart'>💖</div>
        <div class='countdown-title'>Counting Down To Our Special Day...</div>
        <div class='countdown-timer' id='countdownTimer'></div>
        <div class='countdown-msg'>Our love story unlocks on <b>17 August 2025, 00:48:00</b>.<br>Until then, let your heart beat with mine!</div>
        <div class='countdown-love'>MADE WITH ALL MY LOVE FOR YOU...😘💖</div>
      </div>`;
    }
    updateCountdown();
    var timer = setInterval(updateCountdown, 1000);
  } else {
    showPasswordPrompt();
  }
})();






// Get elements
const mainLoveImage = document.getElementById("mainLoveImage");
const loveModal = document.getElementById("loveModal");
const closeLoveModal = document.getElementById("closeLoveModal");
const loveText = document.getElementById("loveText");
const heartsContainer = document.querySelector(".hearts-container");

let autoCloseTimer;

// Romantic message
const romanticMessage = "I Love You Premii 💖 Forever & Always";

// Open modal on image click
mainLoveImage.addEventListener("click", () => {
  loveModal.style.display = "flex";
  playLoveAnimation();

  // Auto-close after 5 sec
  autoCloseTimer = setTimeout(() => {
    closeLove();
  }, 5000);
});

// Close modal function
function closeLove() {
  loveModal.style.display = "none";
  loveText.textContent = "";
  heartsContainer.innerHTML = "";
  clearTimeout(autoCloseTimer);
}

// Close events
closeLoveModal.addEventListener("click", closeLove);
loveModal.addEventListener("click", (e) => {
  if (e.target === loveModal) closeLove();
});

// Animation function
function playLoveAnimation() {
  // Typewriter romantic text
  let i = 0;
  loveText.textContent = "";
  const typer = setInterval(() => {
    loveText.textContent += romanticMessage.charAt(i);
    i++;
    if (i >= romanticMessage.length) clearInterval(typer);
  }, 100);

  // Floating hearts generator
  const heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 300);

  // Stop generating hearts after 5 sec
  setTimeout(() => clearInterval(heartInterval), 5000);
}





function playLoveAnimation() {


  // Typewriter romantic text
  let i = 0;
  loveText.textContent = "";
  const typer = setInterval(() => {
    loveText.textContent += romanticMessage.charAt(i);
    i++;
    if (i >= romanticMessage.length) {
      clearInterval(typer);
      document.querySelector(".love-caption").classList.add("pulse");
    }
  }, 100);

  // Floating hearts
  const heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 300);

  // Show proposal text after rings appear
  setTimeout(() => {
    const proposal = document.getElementById("proposalText");
    proposal.textContent = "Will you be mine forever, Premii? 💍❤️";
    proposal.style.opacity = 1;
  }, 5000);

  // Stop hearts + confetti + close popup
  setTimeout(() => {
    clearInterval(heartInterval);
    closeLove();
  }, 7000);
}

