/* Google hosts the picker and requires a Google account. No cross-origin credential requests. */
(function(root){
 'use strict';
 function create({element,endpoint,onReserved}){
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint))throw new Error('Conexión de agenda inválida.');
  const frame=element.querySelector('[data-picker-frame]'),link=element.querySelector('[data-picker-link]'),status=element.querySelector('[data-picker-status]');
  let nonce='',customer=null,completed=false;
  root.addEventListener('message',event=>{
   if(!/^https:\/\/(?:[a-z0-9-]+\.)?script\.googleusercontent\.com$/.test(event.origin)&&!/^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/.test(event.origin))return;
   const data=event.data;
   if(!data||data.source!=='shilis-booking'||data.nonce!==nonce||completed)return;
   if(data.type==='height'&&Number.isFinite(data.height)){frame.style.height=Math.max(400,Math.min(1100,data.height))+'px';return;}
   if(data.type!=='reserved'||!data.reservation)return;
   const receipt=data.reservation;
   if(receipt.nombre!==customer.nombre||receipt.servicio!==customer.servicio||!/^\d{4}-\d{2}-\d{2}$/.test(receipt.fecha)||!/^(09|1[0-6]):00$/.test(receipt.hora))return;
   completed=true;status.textContent='Cita registrada en Google Calendar.';onReserved(receipt);
  });
  return {open(data){
   customer={nombre:data.nombre,servicio:data.servicio};nonce=crypto.randomUUID();completed=false;
   const payload={...customer,fecha:data.fecha||'',mensaje:data.mensaje||'',nonce:nonce};
   const url=endpoint+'#'+new URLSearchParams({booking:JSON.stringify(payload)}).toString();
   frame.src=url;link.href=url;status.textContent='Inicia sesión en Google para seleccionar el horario. No se te pedirán datos de contacto.';
  }};
 }
 root.ShilisCalendarPicker={create};
})(window);
