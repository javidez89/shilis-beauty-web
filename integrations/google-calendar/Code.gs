/** Shili's booking-only integration. No client email, phone or guest invitations. */
const SETTINGS = Object.freeze({ zone: 'America/Bogota', offset: '-05:00', open: 9, close: 17, daysAhead: 30 });
const SERVICES = ['Cepillados','Manicure','Pedicure','Queratinas','Cejas','Depilación de piernas','Depilación de bikini','Mechas','Rollitos','Cejas en henna','Pestañas punto a punto','Peinados para ocasiones especiales','Peinados para niñas','Corte','Otro servicio'];

/** Run once in the editor, as the account that will own the booking calendar. */
function setup() {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty('BOOKING_CALENDAR_ID')) return 'La agenda de reservas ya está configurada.';
    const calendar = Calendar.Calendars.insert({ summary: 'Shili’s · Reservas web', timeZone: SETTINGS.zone, description: 'Agenda de prueba: 60 minutos, lunes a viernes, 09:00–17:00 Colombia. Sin datos de contacto.' });
    props.setProperty('BOOKING_CALENDAR_ID', calendar.id);
    return 'Agenda privada creada. Falta implementar la aplicación web para activar las reservas.';
  } finally { lock.releaseLock(); }
}
function calendarId_() {
  const id = PropertiesService.getScriptProperties().getProperty('BOOKING_CALENDAR_ID');
  if (!id) throw new Error('SETUP_REQUIRED');
  return id;
}
function dayStart_(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) throw new Error('INVALID_DATE');
  const start = new Date(date + 'T00:00:00' + SETTINGS.offset);
  if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0,10) !== date) throw new Error('INVALID_DATE');
  const today = Utilities.formatDate(new Date(), SETTINGS.zone, 'yyyy-MM-dd');
  const todayStart = new Date(today + 'T00:00:00' + SETTINGS.offset);
  const delta = Math.round((start.getTime()-todayStart.getTime())/86400000);
  if (delta < 0 || delta > SETTINGS.daysAhead) throw new Error('OUTSIDE_WINDOW');
  return start;
}
function times_(date, events, now) {
  const day = new Date(date + 'T12:00:00' + SETTINGS.offset).getUTCDay();
  if (day === 0 || day === 6) return [];
  const busy = events.filter(e => e.status !== 'cancelled' && e.transparency !== 'transparent').map(e => ({
    start: new Date(e.start.dateTime || e.start.date + 'T00:00:00' + SETTINGS.offset).getTime(),
    end: new Date(e.end.dateTime || e.end.date + 'T00:00:00' + SETTINGS.offset).getTime()
  }));
  const result = [];
  for (let hour = SETTINGS.open; hour < SETTINGS.close; hour++) {
    const time = String(hour).padStart(2,'0') + ':00';
    const start = new Date(date + 'T' + time + ':00' + SETTINGS.offset).getTime(), end = start + 3600000;
    if (start > now && !busy.some(e => start < e.end && end > e.start)) result.push(time);
  }
  return result;
}
function events_(date) {
  const start = dayStart_(date), end = new Date(start.getTime()+86400000);
  let token, events=[];
  do {
    const args={timeMin:start.toISOString(),timeMax:end.toISOString(),singleEvents:true,showDeleted:false,maxResults:250};
    if (token) args.pageToken=token;
    const page=Calendar.Events.list(calendarId_(),args);
    events=events.concat(page.items||[]);token=page.nextPageToken;
  } while (token);
  return events;
}
function output_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
function failure_(error) {
  const code = String(error && error.message || '');
  const known = ['INVALID_DATE','OUTSIDE_WINDOW','INVALID_REQUEST','SLOT_TAKEN','TOKEN_EXPIRED','BUSY','SETUP_REQUIRED'];
  return {ok:false,code:known.indexOf(code)>=0?code:'UNAVAILABLE'};
}
function doGet(e) {
  try {
    const date=String(e.parameter.date||'');
    const slots=times_(date,events_(date),Date.now());
    const token=Utilities.getUuid();
    CacheService.getScriptCache().put('slot:'+token,JSON.stringify({date:date}),600);
    return output_({ok:true,date:date,slots:slots,token:token,zone:SETTINGS.zone});
  } catch(error) { return output_(failure_(error)); }
}
function booking_(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_REQUEST');
  const allowed=['nombre','servicio','fecha','hora','token','requestId','website'];
  if (Object.keys(input).some(k=>allowed.indexOf(k)<0) || input.website) throw new Error('INVALID_REQUEST');
  const name=String(input.nombre||'').trim().replace(/\s+/g,' '), service=String(input.servicio||'');
  if (name.length<3 || name.length>100 || /[\x00-\x1f\x7f]/.test(name) || SERVICES.indexOf(service)<0) throw new Error('INVALID_REQUEST');
  const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuid.test(String(input.requestId||'')) || !uuid.test(String(input.token||''))) throw new Error('INVALID_REQUEST');
  const date=String(input.fecha||''),time=String(input.hora||'');dayStart_(date);
  if (!/^(09|1[0-6]):00$/.test(time)) throw new Error('INVALID_REQUEST');
  return {name:name,service:service,date:date,time:time,token:input.token,eventId:'shilis'+input.requestId.replace(/-/g,'').toLowerCase()};
}
function prior_(id) {
  try { return Calendar.Events.get(calendarId_(),id); }
  catch(error) {
    if ((error.details && error.details.code === 404) || /\bnot found\b/i.test(String(error.message))) return null;
    throw error;
  }
}
function receipt_(data,event) {
  const expected=data.date+'T'+data.time+':00'+SETTINGS.offset;
  if (event.status!=='confirmed' || event.summary!==data.name || !event.start || new Date(event.start.dateTime).getTime()!==new Date(expected).getTime() || !event.extendedProperties || !event.extendedProperties.private || event.extendedProperties.private.service!==data.service) throw new Error('INVALID_REQUEST');
  return {ok:true,reservation:{nombre:data.name,servicio:data.service,fecha:data.date,hora:data.time}};
}
function doPost(e) {
  let lock;
  try {
    const body=e.postData && e.postData.contents || '';
    if (body.length>4096) throw new Error('INVALID_REQUEST');
    const data=booking_(JSON.parse(body));
    lock=LockService.getScriptLock();
    if (!lock.tryLock(20000)) throw new Error('BUSY');
    const previous=prior_(data.eventId);
    if (previous) return output_(receipt_(data,previous));
    const cache=CacheService.getScriptCache(), raw=cache.get('slot:'+data.token);
    if (!raw || JSON.parse(raw).date!==data.date) throw new Error('TOKEN_EXPIRED');
    if (times_(data.date,events_(data.date),Date.now()).indexOf(data.time)<0) throw new Error('SLOT_TAKEN');
    const start=new Date(data.date+'T'+data.time+':00'+SETTINGS.offset);
    const event=Calendar.Events.insert({id:data.eventId,summary:data.name,description:'Servicio: '+data.service+'\nReserva desde la web de Shili’s.',visibility:'private',transparency:'opaque',start:{dateTime:start.toISOString(),timeZone:SETTINGS.zone},end:{dateTime:new Date(start.getTime()+3600000).toISOString(),timeZone:SETTINGS.zone},extendedProperties:{private:{service:data.service,source:'shilis-web'}}},calendarId_());
    cache.remove('slot:'+data.token);
    return output_(receipt_(data,event));
  } catch(error) { return output_(failure_(error)); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
