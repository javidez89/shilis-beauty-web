/* Prepare a WhatsApp enquiry; the salon confirms availability directly. */
(function(root){
 'use strict';
 function formatDate(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw new Error('Revisa la fecha preferida.');
  const parsed=new Date(value+'T12:00:00Z');
  if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==value)throw new Error('La fecha no es válida.');
  const [y,m,d]=value.split('-');return `${d}/${m}/${y}`;
 }
 function createMessage(data){
  const name=String(data.nombre||'').trim().replace(/\s+/g,' '),service=String(data.servicio||'').trim(),date=String(data.fecha||''),time=String(data.hora||'');
  if(name.length<3||name.length>100||!service||service.length>100)throw new Error('Completa tu nombre y el servicio.');
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Revisa la hora preferida.');
  return ["Hola, Shili's. Quisiera consultar disponibilidad para una cita.",`Nombre completo: ${name}.`,`Servicio: ${service}.`,date?`Fecha preferida: ${formatDate(date)}.`:'',`Hora preferida: ${time} (Colombia).`,data.mensaje?'Detalles: '+String(data.mensaje).trim().slice(0,500):'','Quedo pendiente de su confirmación.'].filter(Boolean).join('\n');
 }
 function buildLink(data){return 'https://wa.me/573187862277?text='+encodeURIComponent(createMessage(data));}
 if(typeof module!=='undefined')module.exports={createMessage,buildLink};
 if(!root.document)return;
 const form=document.getElementById('reservation-form');if(!form)return;
 const nameInput=form.elements.nombre;
 nameInput.addEventListener('input',()=>nameInput.setCustomValidity(''));
 form.addEventListener('submit',event=>{
  event.preventDefault();
  nameInput.value=nameInput.value.trim().replace(/\s+/g,' ');
  nameInput.setCustomValidity(nameInput.value.length<3?'Escribe tu nombre completo.':'');
  if(!form.reportValidity())return;
  window.open(buildLink(Object.fromEntries(new FormData(form))),'_blank','noopener,noreferrer');
 });
})(typeof window!=='undefined'?window:globalThis);
