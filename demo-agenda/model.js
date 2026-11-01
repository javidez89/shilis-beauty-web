/* Pure demo scheduling logic. Colombian local time is explicit, regardless of device time zone. */
(function(root){
 'use strict';
 const zone='America/Bogota';
 function instant(r){return new Date(`${r.date}T${r.time}:00-05:00`).getTime();}
 function end(r){return instant(r)+Number(r.duration)*60000;}
 function validate(r){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||!/^\d{2}:\d{2}$/.test(r.time)||!Number.isFinite(instant(r)))return 'Revisa la fecha y la hora.';
  const [h,m]=r.time.split(':').map(Number), minutes=h*60+m;
  if(h>23||m>59||!Number.isInteger(Number(r.duration))||r.duration<15||r.duration>360||r.duration%15!==0)return 'La duración debe ser de 15 a 360 minutos, en pasos de 15.';
  if(minutes<480||minutes+Number(r.duration)>1080)return 'El horario de prueba es de 8:00 a. m. a 6:00 p. m.';
  if(!['p1','p2'].includes(r.professional))return 'Selecciona un profesional de prueba.';
  if(!r.name||r.name.trim().length<3)return 'Escribe un nombre de prueba de al menos tres caracteres.';
  if(r.phone&&!/^(?:57)?3\d{9}$/.test(r.phone.replace(/\D/g,'')))return 'Escribe un celular colombiano de 10 dígitos o déjalo vacío.';
  return '';
 }
 function conflicts(r,rows){return rows.filter(x=>x.id!==r.id&&x.professional===r.professional&&['prepared','confirmed'].includes(x.status)&&instant(r)<end(x)&&end(r)>instant(x));}
 function stamp(ms){return new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
 function calendarUrl(r,account){if(!account||!/^\S+@\S+\.\S+$/.test(account))throw new Error("Configura tu cuenta de Google primero.");const q=new URLSearchParams({action:'TEMPLATE',authuser:account,text:`DEMO Shili’s · ${r.service} · ${r.name}`,dates:`${stamp(instant(r))}/${stamp(end(r))}`,ctz:zone,location:'Shili’s · Mesitas del Colegio, Cundinamarca',details:`Cita de prueba.\nCliente: ${r.name}\nServicio: ${r.service}\nProfesional: ${r.professional==='p1'?'Profesional 1':'Profesional 2'}\nDuración: ${r.duration} min\n${r.phone?'WhatsApp: '+r.phone+'\n':''}${r.note||''}\nOrigen: demo local; no es una reserva de producción.`});return 'https://calendar.google.com/calendar/render?'+q.toString();}
 function whatsappUrl(r){const phone=r.phone.replace(/\D/g,'');if(!phone)return null;const local=new Intl.DateTimeFormat('es-CO',{timeZone:zone,dateStyle:'long',timeStyle:'short'}).format(new Date(instant(r)));return 'https://wa.me/'+(phone.length===10?'57'+phone:phone)+'?text='+encodeURIComponent(`Hola, ${r.name}. Confirmamos tu cita en Shili’s para ${r.service}, el ${local} (hora de Colombia). Duración aproximada: ${r.duration} minutos. Si necesitas cambiarla, escríbenos. Mensaje de prueba.`);}
 const api={instant,end,validate,conflicts,calendarUrl,whatsappUrl};root.AgendaModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
