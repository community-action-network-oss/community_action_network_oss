// Regenerates tokens.json and fails if any colour pair misses WCAG AA. Run: node docs/design/ux/tokens.build.mjs
import fs from 'fs';
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return +(((x+.05)/(y+.05)).toFixed(2))};
const themes={
light:{bg:'#FAFAF7',surface:'#FFFFFF',surfaceMuted:'#F1F1EC',text:'#1D2428',textMuted:'#48545A',border:'#D5D9DA',controlBorder:'#68757B',primary:'#1F5F6B',onPrimary:'#FFFFFF',focus:'#1F5F6B',link:'#1B5663',urgent:'#9B2C1F',onUrgent:'#FFFFFF',urgentSurface:'#FBE9E6',
 status:{pending:['#2F4A6B','#E3EBF5'],active:['#17594F','#DDF1EC'],paused:['#6B4A12','#F6EBD3'],stuck:['#4E3F78','#E9E4F5'],withdrawn:['#444D52','#E8EAEB'],solved:['#1E5A2C','#DDF0DF'],closed:['#3E4A50','#E1E5E7'],redirected:['#3B4A8A','#E6E9F7'],interim:['#5A4A1E','#F3EFD9']}},
dark:{bg:'#12181B',surface:'#1A2226',surfaceMuted:'#222C31',text:'#E9EEF0',textMuted:'#A9B5BA',border:'#34424A',controlBorder:'#8A989F',primary:'#7CC5D3',onPrimary:'#0B1A1E',focus:'#7CC5D3',link:'#8FD0DD',urgent:'#FF9C8F',onUrgent:'#2A0B07',urgentSurface:'#3A1A16',
 status:{pending:['#B7CEF0','#1F2D42'],active:['#9BDCCF','#143A34'],paused:['#EBCB8B','#3B2D12'],stuck:['#CFC2F0','#2C2447'],withdrawn:['#C3CCD0','#2A3338'],solved:['#A5DDAE','#173A20'],closed:['#BDC8CD','#273136'],redirected:['#C2CAF2','#232B52'],interim:['#E6D8A0','#38300F']}}};
const pairs=[],fails=[];
for(const [t,v] of Object.entries(themes)){
 const chk=(n,f,b,min)=>{const r=cr(f,b);pairs.push({theme:t,pair:n,fg:f,bg:b,ratio:r,min});if(r<min)fails.push([t,n,r])};
 for(const s of ['bg','surface','surfaceMuted'])for(const k of ['text','textMuted','link'])chk(`${k} on ${s}`,v[k],v[s],4.5);
 chk('onPrimary on primary',v.onPrimary,v.primary,4.5);chk('primary on surface',v.primary,v.surface,4.5);
 chk('onUrgent on urgent',v.onUrgent,v.urgent,4.5);chk('urgent on urgentSurface',v.urgent,v.urgentSurface,4.5);
 chk('controlBorder on surface (non-text)',v.controlBorder,v.surface,3);chk('focus on bg (non-text)',v.focus,v.bg,3);
 for(const [n,[f,b]] of Object.entries(v.status)){chk(`status.${n} fg on bg`,f,b,4.5);chk(`status.${n} bg on surface (badge edge)`,b,v.surface,1)}
}
const sem=t=>({color:{bg:{value:t.bg},surface:{value:t.surface},surfaceMuted:{value:t.surfaceMuted},text:{value:t.text},textMuted:{value:t.textMuted},border:{value:t.border},controlBorder:{value:t.controlBorder},primary:{value:t.primary},onPrimary:{value:t.onPrimary},focus:{value:t.focus},link:{value:t.link},urgent:{value:t.urgent},onUrgent:{value:t.onUrgent},urgentSurface:{value:t.urgentSurface}},status:Object.fromEntries(Object.entries(t.status).map(([k,[f,b]])=>[k,{fg:f,bg:b}]))});
const out={"$description":"CAN semantic design tokens. Consumed by can_app (Expo) and can_gallery (CSS variables). Status colours are deliberately neutral: no red for stuck, paused, withdrawn or any disagreement. `urgent` is reserved for genuine safety or deadline conditions and validation errors that block saving. Every colour pair in `contrastVerified` was computed with the WCAG 2 relative luminance formula; text min 4.5, non-text min 3.","version":"1.0.0",
 themes:{light:sem(themes.light),dark:sem(themes.dark)},
 space:{"0":0,"1":4,"2":8,"3":12,"4":16,"5":24,"6":32,"7":48,"8":64,unit:"px (dp in the app)"},
 radius:{sm:4,md:8,lg:16,pill:999},
 size:{minTarget:44,focusRingWidth:2,focusRingOffset:2,contentMaxWidth:720},
 type:{family:{sans:"system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif",mono:"ui-monospace, 'SF Mono', Menlo, monospace"},
  scale:{caption:{size:13,line:18,weight:400},body:{size:16,line:24,weight:400},bodyStrong:{size:16,line:24,weight:600},label:{size:14,line:20,weight:600},h3:{size:18,line:26,weight:600},h2:{size:22,line:30,weight:600},h1:{size:28,line:36,weight:700}},
  note:"Sizes are base values; the app must scale with the OS text size and layouts must survive 200 percent."},
 motion:{fast:120,normal:200,reducedMotion:"all durations 0 when the user prefers reduced motion"},
 contrastVerified:pairs};
fs.writeFileSync(new URL('./tokens.json', import.meta.url),JSON.stringify(out,null,1));
console.log(pairs.length,'pairs; fails:',JSON.stringify(fails));

if(fails.length)process.exit(1);
