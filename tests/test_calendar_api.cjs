const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const code=fs.readFileSync('integrations/google-calendar/Code.gs','utf8');
const events=new Map(),cache=new Map(),props=new Map();let serial=false,createdCalendars=0,calendarError=false;
const now=Date.parse('2026-11-02T12:00:00Z');
class Clock extends Date{constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
const context=vm.createContext({Date:Clock,JSON,Object,String,Number,Error,Array,Math,
 Utilities:{formatDate:d=>new Date(d.getTime()-18000000).toISOString().slice(0,10),getUuid:()=>crypto.randomUUID()},
 LockService:{getScriptLock:()=>({waitLock(){assert.ok(!serial);serial=true;},tryLock(){if(serial)return false;serial=true;return true;},hasLock(){return serial;},releaseLock(){serial=false;}})},
 PropertiesService:{getScriptProperties:()=>({getProperty:key=>props.get(key),setProperty:(key,value)=>props.set(key,value)})},
 CacheService:{getScriptCache:()=>({put:(key,value)=>cache.set(key,value),get:key=>cache.get(key),remove:key=>cache.delete(key)})},
 ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({text,setMimeType(){return this;}})},
 Calendar:{Calendars:{insert(data){createdCalendars++;assert.equal(data.timeZone,'America/Bogota');return {id:'dedicated-calendar'};}},Events:{
  list(id){assert.equal(id,'dedicated-calendar');if(calendarError)throw new Error('Private calendar details MUST NOT leak');return {items:[...events.values()]};},
  get(id,eventId){assert.equal(id,'dedicated-calendar');if(events.has(eventId))return events.get(eventId);throw new Error('Not Found');},
  insert(event,id){assert.ok(serial,'Write without lock');assert.equal(id,'dedicated-calendar');assert.ok(!event.attendees);assert.ok(!event.email);assert.ok(!event.phone);const value={...event,status:'confirmed'};events.set(event.id,value);return value;}
 }}
});
vm.runInContext(code,context);
const get=date=>JSON.parse(JSON.stringify(context.getAvailableSlots(date)));
const post=payload=>JSON.parse(JSON.stringify(context.reserveTime(payload)));
assert.equal(get('2026-11-02').code,'SETUP_REQUIRED');context.setup();context.setup();assert.equal(createdCalendars,1);
const a=get('2026-11-02'),b=get('2026-11-02');assert.equal(a.slots.length,8);assert.equal(a.slots[0],'09:00');assert.equal(a.slots.at(-1),'16:00');
assert.equal(get('2026-11-07').slots.length,0);assert.equal(get('2026-11-01').code,'OUTSIDE_WINDOW');assert.equal(get('2026-11-31').code,'INVALID_DATE');
const data={nombre:'Cliente de prueba',servicio:'Cepillados',fecha:'2026-11-02',hora:'09:00',token:a.token,requestId:crypto.randomUUID(),website:''};
const result=post(data);assert.ok(result.ok);assert.equal(result.reservation.nombre,'Cliente de prueba');assert.equal(events.size,1);assert.equal([...events.values()][0].summary,'Cliente de prueba');assert.equal([...events.values()][0].visibility,'private');
assert.ok(post(data).ok);assert.equal(events.size,1,'Retry duplicated an event');
assert.equal(post({...data,nombre:'Otro cliente'}).code,'INVALID_REQUEST');
assert.equal(post({...data,token:b.token,requestId:crypto.randomUUID()}).code,'SLOT_TAKEN');
assert.ok(!get('2026-11-02').slots.includes('09:00'));
assert.equal(post({...data,email:'no-contact@example.invalid'}).code,'INVALID_REQUEST');
assert.equal(post({...data,calendarId:'primary'}).code,'INVALID_REQUEST');
assert.equal(post({...data,requestId:crypto.randomUUID(),hora:'17:00'}).code,'INVALID_REQUEST');
assert.equal(post({...data,requestId:crypto.randomUUID(),token:crypto.randomUUID(),hora:'10:00'}).code,'TOKEN_EXPIRED');
const free=vm.runInContext("times_('2026-11-02',[{status:'confirmed',start:{dateTime:'2026-11-02T10:30:00-05:00'},end:{dateTime:'2026-11-02T11:30:00-05:00'}}],Date.now())",context);assert.ok(!free.includes('10:00')&&!free.includes('11:00'));assert.ok(free.includes('12:00'));
assert.equal(vm.runInContext("times_('2026-11-02',[{start:{date:'2026-11-02'},end:{date:'2026-11-03'}}],Date.now()).length",context),0);
calendarError=true;assert.deepEqual(get('2026-11-02'),{ok:false,code:'UNAVAILABLE'});
const manifest=JSON.parse(fs.readFileSync('integrations/google-calendar/appsscript.json','utf8').replace(/^\uFEFF/,''));assert.deepEqual(manifest.oauthScopes,['https://www.googleapis.com/auth/calendar.app.created']);
console.log('PASS: agenda aislada, sin contacto, nombre como título, cruces, bloqueos, reintentos, validación, errores privados y alcance mínimo.');
