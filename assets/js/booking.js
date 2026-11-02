/* Shared booking flow. Google confirms the event; WhatsApp opens a draft only. */
(function(root){
 'use strict';
 const CALENDAR_URL='https://calendar.google.com/calendar/appointments/schedules/AcZssZ11uVGdXtFDhfjhyCDt72I4_jRW4LPIwHv9PofETBK25kwmbwGjLQcxVYzKPXTFHQfFsLF6Y9mc?gv=true';
 function formatDate(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw new Error('Revisa la fecha de la cita.');
  const parsed=new Date(value+'T12:00:00Z');
  if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==value)throw new Error('La fecha no es válida.');
  const [y,m,d]=value.split('-');return `${d}/${m}/${y}`;
 }
 function createMessage(data,mode='confirmed'){
  const name=String(data.nombre||'').trim().replace(/\s+/g,' '),service=String(data.servicio||'').trim(),date=String(data.fecha||''),time=String(data.hora||'');
  if(name.length<3||name.length>100||!service||service.length>100)throw new Error('Completa tu nombre y el servicio.');
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Revisa la hora de la cita.');
  const confirmed=mode==='confirmed';
  if(!confirmed&&mode!=='consultation')throw new Error('Elige un tipo de aviso válido.');
  if(confirmed&&data.confirmada!==true)throw new Error('Primero completa la reserva en Google y marca que está confirmada.');
  const day=date?formatDate(date):'';
  if(confirmed&&!day)throw new Error('Indica la fecha que confirmó Google.');
  return [confirmed?"Hola, Shili's. Ya completé mi reserva en Google Calendar.":"Hola, Shili's. Quisiera consultar disponibilidad para una cita.",`Nombre completo: ${name}.`,`Servicio: ${service}.`,day?`${confirmed?'Fecha de la cita':'Fecha preferida'}: ${day}.`:'',`${confirmed?'Hora de la cita':'Hora preferida'}: ${time} (Colombia).`,data.mensaje?'Detalles: '+String(data.mensaje).trim().slice(0,500):'',confirmed?'Les comparto este aviso de mi reserva.':'Quedo pendiente de su confirmación.'].filter(Boolean).join('\n');
 }
 function buildLink(data,mode='confirmed'){return 'https://wa.me/573187862277?text='+encodeURIComponent(createMessage(data,mode));}
 if(typeof module!=='undefined')module.exports={createMessage,buildLink,formatDate};
 if(!root.document)return;
 const dialog=document.querySelector('.booking-dialog'),form=document.getElementById('reservation-form');
 if(!dialog||!form)return;
 const find=selector=>dialog.querySelector(selector);
 const details=find('[data-booking-details]'),calendar=find('[data-booking-calendar]'),frame=find('[data-booking-frame]');
 const heading=find('#booking-title'),step=find('[data-booking-step]'),intro=find('[data-booking-intro]'),trial=find('[data-booking-trial]'),help=find('#hora-ayuda');
 const submit=find('[data-booking-submit]'),consult=find('[data-booking-consult]'),confirmLabel=find('[data-booking-confirm]'),confirmation=find('#reserva-confirmada'),returnCalendar=find('[data-booking-calendar-back]'),status=find('[data-booking-status]');
 const nameInput=form.elements.nombre,dateInput=form.elements.fecha;
 let phase='details';
 function values(){const data=Object.fromEntries(new FormData(form));data.confirmada=confirmation.checked;return data;}
 function showDetails(confirmed=false,focus=true){
  phase=confirmed?'notice':'details';details.hidden=false;calendar.hidden=true;dialog.classList.remove('is-calendar');dialog.setAttribute('aria-labelledby','booking-title');
  heading.textContent=confirmed?'Avísanos de tu reserva':'Agenda tu momento';
  step.textContent=confirmed?'Shili’s · Citas · Paso 3 de 3':'Shili’s · Citas · Paso 1 de 3';
  intro.textContent=confirmed?'Tus datos siguen aquí. Revisa e indica la fecha y hora exactas que confirmó Google. Después abriremos WhatsApp con el aviso preparado.':'Empieza aquí: cuéntanos qué necesitas. Luego elegirás un horario disponible en Google Calendar y podrás avisarnos por WhatsApp con estos mismos datos.';
  help.textContent=confirmed?'Usa la hora exacta de tu reserva confirmada, en hora de Colombia. Este aviso no crea ni modifica la cita.':'Esta es tu preferencia. En el siguiente paso, Google mostrará los horarios disponibles y confirmará tu reserva.';
  find('label[for="fecha"]').textContent=confirmed?'Fecha confirmada en Google *':'Fecha preferida (opcional)';
  find('label[for="hora"]').textContent=confirmed?'Hora confirmada (Colombia) *':'Hora preferida *';
  submit.textContent=confirmed?'Enviar aviso por WhatsApp ↗':'Ver horarios y reservar';
  confirmation.checked=false;confirmation.required=confirmed;confirmLabel.hidden=!confirmed;dateInput.required=confirmed;
  consult.hidden=confirmed;returnCalendar.hidden=!confirmed;trial.hidden=confirmed;status.textContent='';
  dialog.scrollTop=0;if(focus)heading.focus({preventScroll:true});
 }
 function showCalendar(reload){
  phase='calendar';details.hidden=true;calendar.hidden=false;dialog.classList.add('is-calendar');dialog.setAttribute('aria-labelledby','booking-calendar-title');
  confirmation.checked=false;
  const data=values();
  find('[data-booking-preference]').textContent=`${data.nombre} · ${data.servicio}\nTu preferencia: ${data.fecha?formatDate(data.fecha):'fecha por elegir'} a las ${data.hora} (Colombia).\nEl horario definitivo será el que confirme Google.`;
  if(reload||!frame.getAttribute('src'))frame.src=CALENDAR_URL;
  dialog.scrollTop=0;find('#booking-calendar-title').focus({preventScroll:true});
 }
 nameInput.addEventListener('input',()=>nameInput.setCustomValidity(''));
 dialog.addEventListener('booking:open',()=>showDetails(false,false));
 find('[data-booking-edit]').addEventListener('click',()=>showDetails());
 find('[data-booking-next]').addEventListener('click',()=>showDetails(true));
 returnCalendar.addEventListener('click',()=>showCalendar(false));
 form.addEventListener('submit',event=>{
  event.preventDefault();
  nameInput.value=nameInput.value.trim().replace(/\s+/g,' ');
  nameInput.setCustomValidity(nameInput.value.length<3?'Escribe tu nombre completo.':'');
  if(!form.reportValidity())return;
  try{
   if(phase==='notice'){
    window.open(buildLink(values()),'_blank','noopener,noreferrer');
    status.textContent='Revisa el aviso y pulsa Enviar en WhatsApp para que el salón lo reciba. La cita sigue registrada en Google.';
   }else if(event.submitter?.value==='consulta'){
    window.open(buildLink(values(),'consultation'),'_blank','noopener,noreferrer');
    status.textContent='Revisa la consulta y pulsa Enviar en WhatsApp. Esta opción no reserva ni crea una cita en Google.';
   }else{showCalendar(true);}
  }catch(error){status.textContent=error.message;}
 });
})(typeof window!=='undefined'?window:globalThis);
