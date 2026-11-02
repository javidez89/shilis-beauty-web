/* Contact-free time picker. Never treats an unacknowledged request as a confirmed booking. */
(function(root){
 'use strict';
 function create(options){
  const {element,endpoint,onReserved}=options;
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint))throw new Error('Conexión de agenda inválida.');
  const date=element.querySelector('[data-picker-date]'),slots=element.querySelector('[data-picker-slots]'),message=element.querySelector('[data-picker-status]'),submit=element.querySelector('[data-picker-submit]');
  let customer={},token='',selected='',loadVersion=0,attempt=null,writing=false;
  const errors={SLOT_TAKEN:'Ese horario acaba de ocuparse. Actualiza los horarios y elige otro.',TOKEN_EXPIRED:'Los horarios vencieron. Vuelve a consultar el día.',BUSY:'La agenda está atendiendo otra reserva. Intenta de nuevo.',UNAVAILABLE:'No pudimos confirmar la reserva. Reintenta para comprobar el mismo turno sin duplicarlo.'};
  async function request(url,init){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
   try{const response=await fetch(url,{...init,signal:controller.signal,credentials:'omit',redirect:'follow'});if(!response.ok)throw new Error('UNAVAILABLE');const body=await response.json();if(!body.ok)throw new Error(body.code||'UNAVAILABLE');return body;}
   finally{clearTimeout(timer);}
  }
  async function load(){
   if(writing)return;
   const version=++loadVersion;selected='';token='';attempt=null;submit.disabled=true;slots.replaceChildren();
   if(!date.value){message.textContent='Elige el día de tu cita.';return;}
   message.textContent='Consultando los horarios de Google Calendar…';
   try{
    const url=new URL(endpoint);url.searchParams.set('date',date.value);url.searchParams.set('v',String(Date.now()));
    const result=await request(url.toString());if(version!==loadVersion)return;
    if(result.date!==date.value||!Array.isArray(result.slots)||typeof result.token!=='string')throw new Error('UNAVAILABLE');
    token=result.token;
    result.slots.forEach(time=>{
     if(!/^(09|1[0-6]):00$/.test(time))return;
     const button=document.createElement('button');button.type='button';button.className='btn btn-outline';button.textContent=time;button.setAttribute('aria-pressed','false');
     button.addEventListener('click',()=>{if(writing)return;selected=time;attempt=null;slots.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));submit.disabled=false;message.textContent=`Hora seleccionada: ${time}, Colombia. Pulsa Reservar esta hora para registrarla.`;});slots.append(button);
    });
    message.textContent=slots.childElementCount?'Elige una hora disponible (hora de Colombia).':'No quedan horarios para este día. Elige otra fecha.';
   }catch(error){if(version===loadVersion)message.textContent=errors[error.message]||'No se pudo consultar la agenda. Cambia o vuelve a consultar el día.';}
  }
  date.addEventListener('change',load);
  element.querySelector('[data-picker-refresh]').addEventListener('click',load);
  submit.addEventListener('click',async()=>{
   if(writing||!selected||!token)return;
   if(!attempt)attempt={nombre:customer.nombre,servicio:customer.servicio,fecha:date.value,hora:selected,token:token,requestId:crypto.randomUUID(),website:''};
   writing=true;date.disabled=true;submit.disabled=true;slots.querySelectorAll('button').forEach(b=>b.disabled=true);message.textContent='Registrando tu cita en Google Calendar…';
   try{
    const result=await request(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(attempt)});
    const receipt=result.reservation;
    if(!receipt||['nombre','servicio','fecha','hora'].some(k=>receipt[k]!==attempt[k]))throw new Error('UNAVAILABLE');
    message.textContent='Tu cita quedó registrada en Google Calendar.';onReserved(receipt);
   }catch(error){message.textContent=errors[error.message]||'No pudimos confirmar la reserva. Reintenta o vuelve a consultar los horarios.';}
   finally{writing=false;date.disabled=false;submit.disabled=false;slots.querySelectorAll('button').forEach(b=>b.disabled=false);}
  });
  return {open(data){customer={nombre:data.nombre,servicio:data.servicio};date.value=data.fecha||'';date.min=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());load();}};
 }
 root.ShilisCalendarPicker={create};
})(window);
