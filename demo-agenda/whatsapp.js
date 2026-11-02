(function(root){
 'use strict';
 function createMessage(data){
  const name=String(data.nombre||'').trim().replace(/\s+/g,' '), service=String(data.servicio||'').trim(), date=String(data.fecha||''), time=String(data.hora||'');
  if(name.length<3||name.length>100||!service||service.length>100)throw new Error('Completa tu nombre y el servicio reservado.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Revisa la fecha y la hora de tu cita.');
  const parsed=new Date(date+'T12:00:00Z');if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)throw new Error('La fecha no es válida.');
  if(!data.confirmada)throw new Error('Primero completa la reserva en Google y marca que está confirmada.');
  const [y,m,d]=date.split('-');
  return ["Hola, Shili's. Ya completé mi reserva en Google Calendar.",`Nombre completo: ${name}.`,`Servicio: ${service}.`,`Fecha de la cita: ${d}/${m}/${y}.`,`Hora de la cita: ${time} (Colombia).`,data.mensaje?'Detalles: '+String(data.mensaje).trim().slice(0,500):'', 'Les comparto este aviso de mi reserva.'].filter(Boolean).join('\n');
 }
 function buildLink(data){return 'https://wa.me/573187862277?text='+encodeURIComponent(createMessage(data));}
 const api={createMessage,buildLink};if(typeof module!=='undefined')module.exports=api;
 if(!root.document)return;
 const form=document.getElementById('whatsapp-notice-form');if(!form)return;
 const preview=document.getElementById('notice-preview'),result=document.getElementById('notice-result');
 function values(){const d=Object.fromEntries(new FormData(form));d.confirmada=form.elements.confirmada.checked;return d;}
 function update(){result.textContent='';try{preview.textContent=createMessage(values());}catch(error){preview.textContent=error.message;}}
 form.addEventListener('input',update);form.addEventListener('change',update);
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;try{const url=buildLink(values());window.open(url,'_blank','noopener,noreferrer');result.textContent='Se abrió el aviso. Revisa los datos y pulsa Enviar en WhatsApp para que el salón lo reciba.';}catch(error){result.textContent=error.message;}});
})(typeof window!=='undefined'?window:globalThis);
