(() => {
 'use strict';
 const M=window.AgendaModel, KEY='shilis-agenda-demo-v1', $=id=>document.getElementById(id);
 let storageOK=true;
 let account='';try{account=localStorage.getItem(KEY+'-account')||'';}catch{}
 function applyAccount(){$('account-email').value=account;$('calendar-home').href='https://calendar.google.com/calendar/'+(account?'?authuser='+encodeURIComponent(account):'');}
 $('account-form').addEventListener('submit',e=>{e.preventDefault();account=$('account-email').value.trim();try{localStorage.setItem(KEY+'-account',account);}catch{}applyAccount();render();feedback('Cuenta guardada solo en este navegador. No has autorizado acceso automático a Google.');});
 applyAccount();
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const tomorrow=new Date(today+'T12:00:00-05:00');tomorrow.setUTCDate(tomorrow.getUTCDate()+1);const demoDay=tomorrow.toISOString().slice(0,10);
 const examples=()=>[
  {id:'demo-a',name:'Cliente demo A',phone:'',service:'Cepillado',professional:'p1',date:demoDay,time:'09:00',duration:60,note:'Ejemplo: primera solicitud del día.',status:'pending'},
  {id:'demo-b',name:'Cliente demo B',phone:'',service:'Manicure',professional:'p1',date:demoDay,time:'09:30',duration:45,note:'Al preparar A, este horario mostrará un cruce. Usa Revisar horario.',status:'pending'},
  {id:'demo-c',name:'Cliente demo C',phone:'',service:'Pedicure',professional:'p2',date:demoDay,time:'10:00',duration:60,note:'Otro profesional puede atender en paralelo.',status:'pending'}];
 let rows;
 try{const saved=JSON.parse(localStorage.getItem(KEY));rows=Array.isArray(saved)&&saved.every(r=>r&&typeof r.id==='string'&&['pending','prepared','confirmed'].includes(r.status)&&!M.validate(r))?saved:examples();}catch{rows=examples();}
 function feedback(message,error=false){$('feedback').hidden=false;$('feedback').classList.toggle('error',error);$('feedback').textContent=message;}
 function persist(){try{localStorage.setItem(KEY,JSON.stringify(rows));}catch{storageOK=false;feedback('No pudimos guardar en este navegador. La información se perderá al cerrar esta página.',true);}}
 function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function pro(r){return r.professional==='p1'?'Profesional 1':'Profesional 2';}
 function endTime(r){return new Intl.DateTimeFormat('es-CO',{timeZone:'America/Bogota',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(M.end(r)));}
 const statusText={pending:'Pendiente',prepared:'Por guardar en Calendar',confirmed:'Confirmada por ti'};
 function filtered(){return rows.filter(r=>r.date===$('day').value&&($('professional').value==='all'||r.professional===$('professional').value)).sort((a,b)=>M.instant(a)-M.instant(b));}
 function render(){
  const visible=filtered();for(const s of ['pending','prepared','confirmed'])$(s+'-count').textContent=visible.filter(r=>r.status===s).length;
  $('requests').innerHTML=visible.map(r=>{const clash=M.conflicts(r,rows);const wa=M.whatsappUrl(r);return `<article class="request"><div class="time">${esc(r.time)}<small>hasta ${esc(endTime(r))}</small></div><div><div class="request-head"><h3>${esc(r.name)}</h3><span class="badge ${esc(r.status)}">${statusText[r.status]}</span></div><p><strong>${esc(r.service)}</strong> · ${esc(pro(r))} · ${r.duration} min</p><p>${r.phone?'WhatsApp: '+esc(r.phone):'Sin teléfono de prueba'}</p>${r.note?'<p>'+esc(r.note)+'</p>':''}${clash.length&&r.status==='pending'?'<p class="warning">Este horario cruza con una cita preparada o confirmada de '+esc(pro(r))+'.</p>':''}<div class="actions">${r.status==='pending'?`<button data-action="prepare" data-id="${esc(r.id)}">Preparar en Google Calendar ↗</button><button class="secondary" data-action="edit" data-id="${esc(r.id)}">Revisar horario</button><button class="secondary" data-action="discard" data-id="${esc(r.id)}">Descartar prueba</button>`:''}${r.status==='prepared'&&account?`<a class="secondary" href="${esc(M.calendarUrl(r,account))}" target="_blank" rel="noopener noreferrer">Reabrir borrador de Calendar ↗</a>`:''}${r.status==='confirmed'?(wa?`<a class="secondary" href="${esc(wa)}" target="_blank" rel="noopener noreferrer">Preparar confirmación por WhatsApp ↗</a>`:'<p>Añade teléfono al registrar otra solicitud para probar la respuesta por WhatsApp.</p>'):''}</div>${r.status==='prepared'?`<label class="saved-check"><input type="checkbox" data-saved="${esc(r.id)}">Ya pulsé Guardar en Google Calendar con la cuenta indicada.</label><div class="actions"><button data-action="confirm" data-id="${esc(r.id)}">Marcar como confirmada</button></div><p class="fine">La demo no puede comprobar si guardaste el evento. Reabrir y guardarlo otra vez puede duplicarlo.</p>`:''}</div></article>`;}).join('')||'<div class="empty">No hay solicitudes para este día y profesional. Registra una prueba en Nueva solicitud.</div>';
  const booked=visible.filter(r=>r.status!=='pending');$('schedule').innerHTML=booked.map(r=>`<article class="appointment"><span class="badge ${r.status}">${statusText[r.status]}</span><h3>${esc(r.time)} – ${esc(endTime(r))} · ${esc(r.service)}</h3><p>${esc(r.name)} · ${esc(pro(r))}</p><small>${r.status==='prepared'?'Horario reservado solo dentro de esta demo. Falta guardar en Google.':'Marcada por el usuario; sin verificación automática en Google.'}</small></article>`).join('')||'<div class="empty">Todavía no hay citas preparadas ni confirmadas. Empieza en Solicitudes.</div>';
 }
 function setView(view){for(const v of ['requests','schedule','new']){$(v+'-view').hidden=v!==view;$(v+'-tab').setAttribute('aria-pressed',String(v===view));$(v+'-tab').classList.toggle('selected',v===view);}}
 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
 $('day').value=demoDay;$('day').addEventListener('change',render);$('professional').addEventListener('change',render);$('request-form').elements.date.value=demoDay;
 $('requests').addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');if(!b)return;const r=rows.find(r=>r.id===b.dataset.id);if(!r)return;
  if(b.dataset.action==='prepare'){
   if(!account){feedback('Primero escribe y guarda tu cuenta de Google Calendar en la parte superior.',true);$('account-email').focus();return;}
   const bad=M.validate(r);if(bad)return feedback(bad,true);
   if(M.instant(r)<=Date.now())return feedback('La fecha ya pasó. Usa Revisar horario para elegir una fecha futura.',true);
   const clashes=M.conflicts(r,rows);if(clashes.length)return feedback('No se abrió Calendar: este profesional tiene un cruce en la demo. Cambia la hora o el profesional.',true);
   const w=window.open(M.calendarUrl(r,account),'_blank','noopener,noreferrer');r.status='prepared';persist();render();feedback('Borrador preparado. En Google revisa la cuenta y el calendario, comprueba disponibilidad real y pulsa Guardar. Si no se abrió, usa Reabrir borrador.');
  }else if(b.dataset.action==='confirm'){
   const checked=[...document.querySelectorAll('[data-saved]')].find(c=>c.dataset.saved===r.id)?.checked;if(!checked)return feedback('Primero guarda la cita en Google Calendar y marca la casilla de confirmación.',true);
   if(M.conflicts(r,rows).length)return feedback('Hay un cruce con otro horario. Revisa la agenda antes de confirmar.',true);
   r.status='confirmed';persist();render();feedback('Cita marcada como confirmada por ti. Puedes preparar la respuesta de WhatsApp si registraste un teléfono.');
  }else if(b.dataset.action==='edit'){
   const f=$('edit-form');for(const key of ['id','date','time','duration','professional'])f.elements[key].value=r[key];$('edit-error').hidden=true;$('edit-dialog').showModal();
  }else if(b.dataset.action==='discard'){
   rows=rows.filter(x=>x.id!==r.id);persist();render();feedback('Solicitud de prueba descartada. No se modificó Google Calendar.');
  }
 });
 $('close-edit').addEventListener('click',()=>$('edit-dialog').close());
 $('edit-form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const r=rows.find(x=>x.id===f.elements.id.value);if(!r||r.status!=='pending')return;const next={...r,date:f.elements.date.value,time:f.elements.time.value,duration:Number(f.elements.duration.value),professional:f.elements.professional.value};const bad=M.validate(next);if(bad){$('edit-error').textContent=bad;$('edit-error').hidden=false;return;}Object.assign(r,next);$('day').value=r.date;persist();render();$('edit-dialog').close();feedback('Horario de prueba ajustado. Aún no se ha creado una cita en Google.');});
 $('request-form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const r=Object.fromEntries(new FormData(f));r.id=crypto.randomUUID();r.name=r.name.trim();r.duration=Number(r.duration);r.status='pending';const bad=M.validate(r);if(bad)return feedback(bad,true);if(M.instant(r)<=Date.now())return feedback('Elige una fecha y hora futuras.',true);rows.push(r);$('day').value=r.date;$('professional').value='all';persist();render();setView('requests');f.reset();f.elements.date.value=demoDay;feedback('Solicitud de prueba registrada como pendiente. No se envió ningún mensaje ni se creó una cita.');});
 $('service').addEventListener('change',e=>{$('request-form').elements.duration.value=({'Cepillado':60,'Manicure':45,'Pedicure':60,'Corte':45,'Queratina':180,'Peinado especial':90})[e.target.value];});
 $('examples').addEventListener('click',()=>{if(!window.confirm('¿Restablecer los ejemplos de este navegador? Esto NO elimina eventos que hayas guardado en Google Calendar.'))return;rows=examples();$('day').value=demoDay;$('professional').value='all';persist();render();setView('requests');feedback('Ejemplos restablecidos. Los eventos de Google no se han modificado.');});
 window.addEventListener('storage',e=>{if(e.key===KEY){try{const next=JSON.parse(e.newValue);if(Array.isArray(next)&&next.every(r=>r&&['pending','prepared','confirmed'].includes(r.status)&&!M.validate(r))){rows=next;render();}}catch{}}});
 persist();render();
})();
