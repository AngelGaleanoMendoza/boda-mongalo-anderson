// Genera los archivos de calendario (.ics) y los códigos QR de cada boda en public/calendar/.
// Uso: npm run calendar
//
// Si cambian la fecha, la hora o el lugar de una boda, actualízalos aquí y en
// src/app/wedding.config.ts, y vuelve a correr este script.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'public', 'calendar');
const SITE = 'https://angelgaleanomendoza.github.io/boda-mongalo-anderson/';

/** Avisos: una semana antes, cada día de esa última semana y el mismo día. */
const REMINDERS = ['-P7D', '-P6D', '-P5D', '-P4D', '-P3D', '-P2D', '-P1D', '-PT3H'];

const WEDDINGS = [
  {
    id: 'texas',
    // 4:00 p. m. hora de Texas (POR CONFIRMAR) hasta las 11:00 p. m.
    start: '2027-02-27T16:00:00-06:00',
    end: '2027-02-27T23:00:00-06:00',
    en: {
      title: 'Justin & Melanie – US Wedding (Texas)',
      location: 'Texas, United States',
      description:
        'Our Texas celebration! Venue and time details will be announced soon.\\nAll the details: ' + SITE,
      alarm: 'Justin & Melanie’s Texas wedding is coming up!',
    },
    es: {
      title: 'Justin & Melanie – Boda US (Texas)',
      location: 'Texas, Estados Unidos',
      description:
        '¡Nuestra celebración en Texas! El lugar y la hora se anunciarán pronto.\\nTodos los detalles: ' + SITE,
      alarm: '¡Se acerca la boda de Justin y Melanie en Texas!',
    },
  },
  {
    id: 'nicaragua',
    // Llegada 2:00 p. m., ceremonia 2:30 p. m., despedida 2:00 a. m. (hora de Managua).
    start: '2027-11-27T14:00:00-06:00',
    end: '2027-11-28T02:00:00-06:00',
    en: {
      title: 'Justin & Melanie – NIC Wedding (Managua)',
      location: 'Ángeles – Centro de Eventos, Balcones de Santo Domingo, Managua, Nicaragua',
      description:
        '2:00 PM Guest arrival at the church\\n2:30 PM Wedding ceremony\\n5:00 PM Reception\\n8:00 PM Dinner\\n11:00 PM Hora Loca\\n2:00 AM Farewell\\nAll the details: ' +
        SITE,
      alarm: 'Justin & Melanie’s Nicaragua wedding is coming up!',
    },
    es: {
      title: 'Justin & Melanie – Boda NIC (Managua)',
      location: 'Ángeles – Centro de Eventos, Balcones de Santo Domingo, Managua, Nicaragua',
      description:
        '2:00 p. m. Llegada a la iglesia\\n2:30 p. m. Ceremonia religiosa\\n5:00 p. m. Recepción\\n8:00 p. m. Cena\\n11:00 p. m. Hora loca\\n2:00 a. m. Despedida\\nTodos los detalles: ' +
        SITE,
      alarm: '¡Se acerca la boda de Justin y Melanie en Nicaragua!',
    },
  },
];

/** "2027-02-27T16:00:00-06:00" -> "20270227T220000Z" */
const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Las líneas de un .ics no deben pasar de 75 bytes: se cortan y siguen con un espacio. */
function fold(line) {
  const bytes = Buffer.from(line, 'utf8');
  if (bytes.length <= 75) return line;
  const parts = [];
  let current = '';
  for (const ch of line) {
    const limit = parts.length === 0 ? 75 : 74;
    if (Buffer.byteLength(current + ch, 'utf8') > limit) {
      parts.push(current);
      current = '';
    }
    current += ch;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

const escape = (text) => text.replace(/[,;]/g, (c) => '\\' + c);

function ics(w, lang) {
  const t = w[lang];
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Justin & Melanie//Wedding//' + lang.toUpperCase(),
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${w.id}-wedding@justin-melanie`,
    `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(w.start)}`,
    `DTEND:${utc(w.end)}`,
    `SUMMARY:${escape(t.title)}`,
    `LOCATION:${escape(t.location)}`,
    `DESCRIPTION:${t.description.replace(/,/g, '\\,').replace(/;/g, '\;')}`,
    `URL:${SITE}`,
    ...REMINDERS.flatMap((trigger) => [
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escape(t.alarm)}`,
      `TRIGGER:${trigger}`,
      'END:VALARM',
    ]),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

await mkdir(outDir, { recursive: true });
for (const w of WEDDINGS) {
  for (const lang of ['en', 'es']) {
    const file = `${w.id}${lang === 'es' ? '-es' : ''}`;
    await writeFile(path.join(outDir, `${file}.ics`), ics(w, lang));
    const url = `${SITE}calendar/${file}.ics`;
    const qr = { margin: 1, color: { dark: '#3f4b35', light: '#ffffff' } };
    await writeFile(path.join(outDir, `qr-${file}.svg`), await QRCode.toString(url, { ...qr, type: 'svg' }));
    await QRCode.toFile(path.join(outDir, `qr-${file}.png`), url, { ...qr, width: 1024 });
    console.log(`${file}.ics + qr-${file}.svg/png`);
  }
}
