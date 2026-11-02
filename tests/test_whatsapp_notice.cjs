const assert=require('node:assert/strict');
const {createMessage,buildLink}=require('../assets/js/booking.js');
const d={nombre:'Cliente de prueba',servicio:'Cepillados',fecha:'2026-11-02',hora:'10:00',confirmada:true,mensaje:'Cabello & estilo'};
const u=new URL(buildLink(d));assert.equal(u.hostname,'wa.me');assert.equal(u.pathname,'/573187862277');assert.equal(u.searchParams.get('text'),createMessage(d));
assert.ok(createMessage(d).includes('02/11/2026'));assert.ok(createMessage(d).includes('10:00 (Colombia)'));
assert.throws(()=>buildLink({...d,confirmada:false}));assert.throws(()=>buildLink({...d,fecha:'2026-02-30'}));assert.throws(()=>buildLink({...d,hora:'25:00'}));assert.throws(()=>buildLink({...d,nombre:'a'}));
console.log('PASS aviso WhatsApp: destinatario, texto, fecha, hora, codificación y confirmación obligatoria.');

const consult=createMessage({...d,fecha:'',confirmada:false},'consultation');
assert.ok(consult.includes('consultar disponibilidad'));
assert.ok(!consult.includes('Ya completé'));
assert.ok(!consult.includes('Fecha de la cita'));
assert.throws(()=>buildLink({...d,fecha:''}));
assert.throws(()=>buildLink({...d,confirmada:'true'}));
assert.throws(()=>buildLink(d,'unknown'));
console.log('PASS consulta sin reserva y aviso de cita confirmada se distinguen.');
