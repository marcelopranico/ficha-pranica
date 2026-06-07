import { useState, useEffect, useRef } from "react";

const CHAKRAS = [
  { name: "Coronario", loc: "Corona de la cabeza" },
  { name: "Ajna (frontal)", loc: "Entrecejo" },
  { name: "Laríngeo", loc: "Garganta" },
  { name: "Cardíaco", loc: "Centro del pecho" },
  { name: "Plexo solar", loc: "Zona estomacal" },
  { name: "Sacro (ombligo)", loc: "Abdomen inferior" },
  { name: "Básico", loc: "Base de la columna" },
];

const defaultChakra = () => ({ cong: "", activ: "" });
const defaultSesion = () => ({
  id: Date.now(),
  fecha: new Date().toLocaleDateString("es-CL"),
  numero: 1,
  terapeuta: "",
  ubicacion: "",
  tiempo: "",
  tipo: "",
  intensidadPre: 5,
  empeora: "",
  alivia: "",
  diagnostico: "",
  medicamentos: "",
  tratamientos: [],
  experiencia: "",
  expectativas: "",
  otros: "",
  chakras: CHAKRAS.map(defaultChakra),
  marcasCuerpo: [],
  protocolo: "",
  zonas: "",
  observaciones: "",
  intensidadPost: 3,
  proximaSesion: "",
  indicaciones: "",
});

const defaultConsultante = (nombre) => ({
  id: Date.now(),
  nombre,
  edad: "",
  wsp: "",
  ciudad: "",
  sesiones: [],
});

const PILL_COLORS = {
  congestion: { bg: "#FAECE7", color: "#993C1D" },
  normal: { bg: "#EAF3DE", color: "#3B6D11" },
  debilidad: { bg: "#E6F1FB", color: "#185FA5" },
  sobreactivado: { bg: "#FAEEDA", color: "#854F0B" },
  inhibido: { bg: "#EEEDFE", color: "#3C3489" },
};

const MARCA_COLORS = ["#e74c3c","#e67e22","#3498db","#9b59b6","#1abc9c"];
const MARCA_LABELS = ["Dolor","Tensión","Trabajo pránico","Bloqueo","Mejora"];

const S = {
  input: { width:"100%", fontSize:13, padding:"7px 10px", border:"0.5px solid #ccc", borderRadius:8, background:"transparent", color:"inherit", fontFamily:"inherit" },
  label: { display:"block", fontSize:13, fontWeight:500, marginBottom:4 },
  hint: { fontSize:11, color:"#888", marginBottom:4 },
  sectionHead: { fontSize:11, fontWeight:500, color:"#888", textTransform:"uppercase", letterSpacing:"0.06em", margin:"24px 0 12px", paddingBottom:6, borderBottom:"0.5px solid #ddd" },
};

const Field = ({ label, hint, children }) => (
  <div style={{ marginBottom:14 }}>
    {label && <label style={S.label}>{label}</label>}
    {hint && <p style={S.hint}>{hint}</p>}
    {children}
  </div>
);
const Inp = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={S.input} />
);
const Txt = ({ value, onChange, placeholder }) => (
  <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    style={{ ...S.input, minHeight:68, resize:"vertical" }} />
);
const Sel = ({ value, onChange, children }) => (
  <select value={value} onChange={e=>onChange(e.target.value)} style={S.input}>{children}</select>
);
const Row2 = ({ children }) => <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>{children}</div>;
const SHead = ({ children }) => <div style={S.sectionHead}>{children}</div>;
const Pill = ({ label, type }) => (
  <span style={{ display:"inline-block", fontSize:11, padding:"2px 8px", borderRadius:20, fontWeight:500, marginLeft:4,
    background:PILL_COLORS[type]?.bg, color:PILL_COLORS[type]?.color }}>{label}</span>
);
const Btn = ({ label, onClick, primary, small, danger }) => (
  <button onClick={onClick} style={{
    padding: small ? "5px 12px" : "8px 18px", fontSize: small ? 12 : 13, fontWeight:500,
    borderRadius:8, cursor:"pointer", border: primary||danger ? "none" : "0.5px solid #ccc",
    background: primary ? "#1a1a1a" : danger ? "#c0392b" : "transparent",
    color: primary||danger ? "#fff" : "inherit"
  }}>{label}</button>
);

const Scale = ({ value, onChange, min=0, max=10 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <span style={{ fontSize:11, color:"#888" }}>{min}</span>
    <input type="range" min={min} max={max} step={1} value={value} onChange={e=>onChange(Number(e.target.value))} style={{ flex:1 }} />
    <span style={{ fontSize:11, color:"#888" }}>{max}</span>
    <span style={{ fontSize:16, fontWeight:500, minWidth:24, textAlign:"center" }}>{value}</span>
  </div>
);

const ChakraTable = ({ chakras, onChange, mode }) => {
  const opts = mode===1
    ? [{ v:"congestion",l:"Congestión" },{ v:"normal",l:"Normal" },{ v:"debilidad",l:"Debilidad" }]
    : [{ v:"sobreactivado",l:"Sobreactivado" },{ v:"normal",l:"Normal" },{ v:"inhibido",l:"Inhibido" }];
  const f = mode===1 ? "cong" : "activ";
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
      <thead>
        <tr>
          <th style={{ textAlign:"left", padding:"6px 8px", fontSize:11, color:"#888", borderBottom:"0.5px solid #ddd", width:"32%" }}>Chakra</th>
          {opts.map(o=><th key={o.v} style={{ textAlign:"center", padding:"6px 8px", fontSize:11, color:"#888", borderBottom:"0.5px solid #ddd" }}>{o.l}</th>)}
        </tr>
      </thead>
      <tbody>
        {CHAKRAS.map((ch,i)=>(
          <tr key={i}>
            <td style={{ padding:"8px", borderBottom:"0.5px solid #eee" }}>
              <span style={{ fontWeight:500 }}>{ch.name}</span><br/>
              <span style={{ fontSize:11, color:"#888" }}>{ch.loc}</span>
            </td>
            {opts.map(o=>(
              <td key={o.v} style={{ textAlign:"center", padding:"8px", borderBottom:"0.5px solid #eee" }}>
                <input type="radio" name={`m${mode}_c${i}`}
                  checked={chakras[i][f]===o.v}
                  onChange={()=>{ const a=[...chakras]; a[i]={...a[i],[f]:o.v}; onChange(a); }} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const BodyMap = ({ marcas, onChange }) => {
  const canvasRef = useRef(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [drawing, setDrawing] = useState(false);
  const last = useRef(null);

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x:(src.clientX-r.left)*(canvas.width/r.width), y:(src.clientY-r.top)*(canvas.height/r.height) };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBody(ctx,canvas.width,canvas.height);
    marcas.forEach(m => {
      ctx.beginPath();
      if (m.type==="dot") { ctx.arc(m.x,m.y,5,0,Math.PI*2); ctx.fillStyle=m.color+"cc"; ctx.fill(); }
      else { ctx.moveTo(m.x1,m.y1); ctx.lineTo(m.x2,m.y2); ctx.strokeStyle=m.color+"cc"; ctx.lineWidth=3; ctx.lineCap="round"; ctx.stroke(); }
    });
  }, [marcas]);

  const drawBody = (ctx,w,h) => {
    ctx.strokeStyle="#999"; ctx.lineWidth=1.5; ctx.fillStyle="#f5f5f5";
    const cx=w/2, sc=h/420;
    ctx.beginPath(); ctx.ellipse(cx,45*sc,28*sc,34*sc,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-12*sc,77*sc); ctx.lineTo(cx-12*sc,95*sc); ctx.lineTo(cx+12*sc,95*sc); ctx.lineTo(cx+12*sc,77*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(cx-50*sc,95*sc,100*sc,130*sc,8*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(cx-80*sc,95*sc,28*sc,120*sc,8*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(cx+52*sc,95*sc,28*sc,120*sc,8*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx-66*sc,222*sc,14*sc,10*sc,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx+66*sc,222*sc,14*sc,10*sc,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(cx-48*sc,225*sc,42*sc,130*sc,8*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(cx+6*sc,225*sc,42*sc,130*sc,8*sc); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx-27*sc,358*sc,22*sc,10*sc,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx+27*sc,358*sc,22*sc,10*sc,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  };

  const startDraw = (e) => { e.preventDefault(); const pos=getPos(e,canvasRef.current); setDrawing(true); last.current=pos; onChange([...marcas,{type:"dot",x:pos.x,y:pos.y,color:MARCA_COLORS[colorIdx]}]); };
  const moveDraw = (e) => { e.preventDefault(); if(!drawing||!last.current) return; const pos=getPos(e,canvasRef.current); onChange([...marcas,{type:"line",x1:last.current.x,y1:last.current.y,x2:pos.x,y2:pos.y,color:MARCA_COLORS[colorIdx]}]); last.current=pos; };
  const endDraw = () => { setDrawing(false); last.current=null; };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        {MARCA_COLORS.map((c,i)=>(
          <button key={i} onClick={()=>setColorIdx(i)} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", fontSize:12, borderRadius:20,
            border:colorIdx===i?`2px solid ${c}`:"0.5px solid #ccc", background:colorIdx===i?c+"22":"transparent", cursor:"pointer", color:"inherit" }}>
            <span style={{ width:10,height:10,borderRadius:"50%",background:c,display:"inline-block" }}/>{MARCA_LABELS[i]}
          </button>
        ))}
        <button onClick={()=>onChange([])} style={{ padding:"4px 10px",fontSize:12,borderRadius:20,border:"0.5px solid #ccc",background:"transparent",cursor:"pointer",color:"#c0392b" }}>Limpiar</button>
      </div>
      <canvas ref={canvasRef} width={280} height={380}
        style={{ border:"0.5px solid #ddd",borderRadius:12,touchAction:"none",cursor:"crosshair",maxWidth:"100%" }}
        onMouseDown={startDraw} onMouseMove={moveDraw} onMouseUp={endDraw} onMouseLeave={endDraw}
        onTouchStart={startDraw} onTouchMove={moveDraw} onTouchEnd={endDraw} />
      <p style={{ fontSize:11,color:"#aaa" }}>Toca o arrastra para marcar zonas</p>
    </div>
  );
};

const Evolucion = ({ sesiones }) => {
  if (sesiones.length<2) return <p style={{ fontSize:13,color:"#888",padding:"12px 0" }}>Se necesitan al menos 2 sesiones para ver evolución.</p>;
  return (
    <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
      <thead><tr>{["Sesión","Dolor pre","Dolor post","Diferencia"].map(h=>(
        <th key={h} style={{ textAlign:h==="Sesión"?"left":"center",padding:"6px 8px",fontSize:11,color:"#888",borderBottom:"0.5px solid #ddd" }}>{h}</th>
      ))}</tr></thead>
      <tbody>{sesiones.map((s,i)=>{ const diff=s.intensidadPre-s.intensidadPost; return (
        <tr key={i}>
          <td style={{ padding:"8px",borderBottom:"0.5px solid #eee" }}>#{s.numero} · {s.fecha}</td>
          <td style={{ textAlign:"center",padding:"8px",borderBottom:"0.5px solid #eee" }}>{s.intensidadPre}</td>
          <td style={{ textAlign:"center",padding:"8px",borderBottom:"0.5px solid #eee" }}>{s.intensidadPost}</td>
          <td style={{ textAlign:"center",padding:"8px",borderBottom:"0.5px solid #eee",fontWeight:500,color:diff>0?"#3B6D11":diff<0?"#993C1D":"#888" }}>
            {diff>0?`−${diff}`:diff<0?`+${Math.abs(diff)}`:"="}
          </td>
        </tr>
      ); })}</tbody>
    </table>
  );
};

const exportarPDF = (consultante, sesion) => {
  const chakraRow = (ch,i) => `<tr><td>${ch.name}</td><td>${sesion.chakras[i]?.cong||"—"}</td><td>${sesion.chakras[i]?.activ||"—"}</td></tr>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ficha · ${consultante.nombre}</title>
  <style>body{font-family:Arial,sans-serif;font-size:12px;color:#222;padding:24px;max-width:700px;margin:auto}
  h1{font-size:18px;margin-bottom:2px}h2{font-size:14px;margin:18px 0 6px;border-bottom:1px solid #ddd;padding-bottom:4px}
  .meta{font-size:11px;color:#666;margin-bottom:16px}table{width:100%;border-collapse:collapse;margin-bottom:12px}
  th,td{padding:5px 8px;border:0.5px solid #ddd;font-size:11px;text-align:left}th{background:#f5f5f5;font-weight:600}
  .row{display:flex;gap:16px;margin-bottom:8px}.col{flex:1}label{font-size:10px;color:#888;display:block}
  p{margin:2px 0 8px;font-size:12px}@media print{body{padding:8px}}</style></head><body>
  <h1>Ficha de sesión — sanación pránica</h1>
  <div class="meta">Consultante: <strong>${consultante.nombre}</strong> · Sesión #${sesion.numero} · ${sesion.fecha} · Terapeuta: ${sesion.terapeuta||"—"}</div>
  <h2>Datos personales</h2>
  <div class="row"><div class="col"><label>Edad</label><p>${consultante.edad||"—"}</p></div><div class="col"><label>WhatsApp</label><p>${consultante.wsp||"—"}</p></div><div class="col"><label>Ciudad</label><p>${consultante.ciudad||"—"}</p></div></div>
  <h2>El dolor</h2>
  <div class="row"><div class="col"><label>Ubicación</label><p>${sesion.ubicacion||"—"}</p></div><div class="col"><label>Duración</label><p>${sesion.tiempo||"—"}</p></div><div class="col"><label>Tipo</label><p>${sesion.tipo||"—"}</p></div></div>
  <div class="row"><div class="col"><label>Intensidad pre</label><p>${sesion.intensidadPre}/10</p></div><div class="col"><label>Empeora con</label><p>${sesion.empeora||"—"}</p></div><div class="col"><label>Alivia con</label><p>${sesion.alivia||"—"}</p></div></div>
  <h2>Antecedentes</h2>
  <div class="row"><div class="col"><label>Diagnóstico</label><p>${sesion.diagnostico||"—"}</p></div><div class="col"><label>Medicamentos</label><p>${sesion.medicamentos||"—"}</p></div></div>
  <label>Tratamientos previos</label><p>${sesion.tratamientos.join(", ")||"—"}</p>
  <h2>Evaluación de chakras</h2>
  <table><thead><tr><th>Chakra</th><th>Cong./Normal/Deb.</th><th>Sobre./Normal/Inh.</th></tr></thead>
  <tbody>${CHAKRAS.map((ch,i)=>chakraRow(ch,i)).join("")}</tbody></table>
  <h2>Observaciones del terapeuta</h2>
  <div class="row"><div class="col"><label>Protocolo</label><p>${sesion.protocolo||"—"}</p></div><div class="col"><label>Zonas intervenidas</label><p>${sesion.zonas||"—"}</p></div></div>
  <label>Observaciones</label><p>${sesion.observaciones||"—"}</p>
  <div class="row"><div class="col"><label>Intensidad post</label><p>${sesion.intensidadPost}/10</p></div><div class="col"><label>Próxima sesión</label><p>${sesion.proximaSesion||"—"}</p></div></div>
  <label>Indicaciones</label><p>${sesion.indicaciones||"—"}</p>
  <p style="font-size:10px;color:#aaa;margin-top:24px">Documento confidencial · uso exclusivo del terapeuta</p>
  <script>window.onload=()=>{window.print();}<\/script></body></html>`;
  const w=window.open("","_blank"); w.document.write(html); w.document.close();
};

export default function App() {
  const [consultantes, setConsultantes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pranica_v2")||"[]"); } catch { return []; }
  });
  const [vista, setVista] = useState("lista");
  const [cActivo, setCActivo] = useState(null);
  const [sActiva, setSActiva] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("pranica_v2", JSON.stringify(consultantes)); } catch {}
  }, [consultantes]);

  const upS = (field,val) => setSActiva(s=>({...s,[field]:val}));

  const guardar = () => {
    if (!cActivo||!sActiva) return;
    setConsultantes(prev=>prev.map(c=>{
      if (c.id!==cActivo.id) return c;
      const updated={...c,edad:cActivo.edad,wsp:cActivo.wsp,ciudad:cActivo.ciudad};
      const existe=c.sesiones.find(s=>s.id===sActiva.id);
      updated.sesiones=existe?c.sesiones.map(s=>s.id===sActiva.id?sActiva:s):[...c.sesiones,sActiva];
      return updated;
    }));
    setGuardado(true); setTimeout(()=>setGuardado(false),2000);
  };

  const crearConsultante = () => {
    if (!nuevoNombre.trim()) return;
    const c=defaultConsultante(nuevoNombre.trim());
    setConsultantes(prev=>[...prev,c]);
    setCActivo(c); setSActiva(defaultSesion()); setNuevoNombre(""); setVista("ficha");
  };

  const nuevaSesion = (c) => { const s=defaultSesion(); s.numero=c.sesiones.length+1; setCActivo(c); setSActiva(s); setVista("ficha"); };
  const abrirSesion = (c,s) => { setCActivo(c); setSActiva({...s}); setVista("ficha"); };
  const eliminarC = (id) => { if(window.confirm("¿Eliminar consultante y todas sus fichas?")) setConsultantes(p=>p.filter(c=>c.id!==id)); };

  const filtrados = consultantes.filter(c=>c.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  if (vista==="lista") return (
    <div style={{ maxWidth:640,padding:"1.5rem 1rem",margin:"0 auto" }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
        <div><h1 style={{ fontSize:20,fontWeight:500,margin:0 }}>Sanación pránica</h1><p style={{ fontSize:12,color:"#888",margin:"2px 0 0" }}>Fichas de consultantes</p></div>
        <Btn label="+ Nuevo consultante" onClick={()=>setVista("nuevo_c")} primary />
      </div>
      <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar consultante..." style={{ ...S.input,marginBottom:16 }} />
      {filtrados.length===0 && <p style={{ fontSize:13,color:"#aaa",textAlign:"center",padding:32 }}>Sin consultantes. Crea el primero.</p>}
      {filtrados.map(c=>(
        <div key={c.id} style={{ border:"0.5px solid #ddd",borderRadius:12,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
          <div><p style={{ fontWeight:500,fontSize:15,margin:0 }}>{c.nombre}</p><p style={{ fontSize:11,color:"#888",margin:"2px 0 0" }}>{c.edad&&`${c.edad} años · `}{c.ciudad&&`${c.ciudad} · `}{c.sesiones.length} sesión{c.sesiones.length!==1?"es":""}</p></div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {c.sesiones.length>0&&<Btn label="Historial" small onClick={()=>{setCActivo(c);setVista("historial");}} />}
            <Btn label="Nueva sesión" small onClick={()=>nuevaSesion(c)} />
            <button onClick={()=>eliminarC(c.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#c0392b",fontSize:16,padding:"0 4px" }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );

  if (vista==="nuevo_c") return (
    <div style={{ maxWidth:480,padding:"1.5rem 1rem",margin:"0 auto" }}>
      <button onClick={()=>setVista("lista")} style={{ fontSize:12,color:"#888",background:"none",border:"none",cursor:"pointer",marginBottom:20 }}>← Volver</button>
      <h2 style={{ fontSize:18,fontWeight:500,marginBottom:20 }}>Nuevo consultante</h2>
      <Field label="Nombre completo"><Inp value={nuevoNombre} onChange={setNuevoNombre} placeholder="Nombre y apellidos" /></Field>
      <div style={{ display:"flex",gap:10,marginTop:8 }}>
        <Btn label="Cancelar" onClick={()=>setVista("lista")} />
        <Btn label="Crear y completar ficha →" onClick={crearConsultante} primary />
      </div>
    </div>
  );

  if (vista==="historial"&&cActivo) {
    const c=consultantes.find(x=>x.id===cActivo.id)||cActivo;
    return (
      <div style={{ maxWidth:640,padding:"1.5rem 1rem",margin:"0 auto" }}>
        <button onClick={()=>setVista("lista")} style={{ fontSize:12,color:"#888",background:"none",border:"none",cursor:"pointer",marginBottom:16 }}>← Volver</button>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8 }}>
          <h2 style={{ fontSize:18,fontWeight:500,margin:0 }}>{c.nombre}</h2>
          <div style={{ display:"flex",gap:8 }}><Btn label="Evolución" small onClick={()=>setVista("evolucion")} /><Btn label="Nueva sesión" small primary onClick={()=>nuevaSesion(c)} /></div>
        </div>
        {c.sesiones.length===0&&<p style={{ fontSize:13,color:"#888" }}>Sin sesiones registradas.</p>}
        {c.sesiones.map((s,i)=>(
          <div key={i} onClick={()=>abrirSesion(c,s)} style={{ border:"0.5px solid #ddd",borderRadius:12,padding:"12px 16px",marginBottom:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div><p style={{ fontWeight:500,fontSize:14,margin:0 }}>Sesión #{s.numero} · {s.fecha}</p><p style={{ fontSize:11,color:"#888",margin:"2px 0 0" }}>Dolor pre: {s.intensidadPre} → post: {s.intensidadPost}{s.protocolo&&` · ${s.protocolo}`}</p></div>
            <span style={{ fontSize:18,color:"#ccc" }}>›</span>
          </div>
        ))}
      </div>
    );
  }

  if (vista==="evolucion"&&cActivo) {
    const c=consultantes.find(x=>x.id===cActivo.id)||cActivo;
    return (
      <div style={{ maxWidth:640,padding:"1.5rem 1rem",margin:"0 auto" }}>
        <button onClick={()=>setVista("historial")} style={{ fontSize:12,color:"#888",background:"none",border:"none",cursor:"pointer",marginBottom:16 }}>← Historial</button>
        <h2 style={{ fontSize:18,fontWeight:500,marginBottom:20 }}>Evolución · {c.nombre}</h2>
        <SHead>Dolor por sesión</SHead><Evolucion sesiones={c.sesiones} />
        {c.sesiones.some(s=>s.observaciones)&&<><SHead>Notas por sesión</SHead>{c.sesiones.filter(s=>s.observaciones).map((s,i)=>(
          <div key={i} style={{ marginBottom:12 }}><p style={{ fontSize:11,color:"#888",margin:"0 0 2px" }}>Sesión #{s.numero} · {s.fecha}</p><p style={{ fontSize:13 }}>{s.observaciones}</p></div>
        ))}</>}
      </div>
    );
  }

  if (vista==="ficha"&&sActiva&&cActivo) return (
    <div style={{ maxWidth:640,padding:"1.5rem 1rem",margin:"0 auto" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10 }}>
        <div>
          <button onClick={()=>setVista(cActivo?.sesiones?.length?"historial":"lista")} style={{ fontSize:12,color:"#888",background:"none",border:"none",cursor:"pointer",display:"block",marginBottom:4 }}>← Volver</button>
          <h1 style={{ fontSize:18,fontWeight:500,margin:0 }}>{cActivo.nombre}</h1>
          <p style={{ fontSize:11,color:"#888",margin:0 }}>Sesión #{sActiva.numero}</p>
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <Btn label="Exportar PDF" small onClick={()=>exportarPDF(cActivo,sActiva)} />
          <button onClick={guardar} style={{ padding:"8px 20px",fontSize:13,fontWeight:500,borderRadius:8,cursor:"pointer",border:"none",background:guardado?"#639922":"#1a1a1a",color:"#fff",transition:"background .3s" }}>{guardado?"✓ Guardado":"Guardar"}</button>
        </div>
      </div>

      <SHead>Datos de la sesión</SHead>
      <Row2><Field label="Fecha"><Inp value={sActiva.fecha} onChange={v=>upS("fecha",v)} /></Field><Field label="Terapeuta"><Inp value={sActiva.terapeuta} onChange={v=>upS("terapeuta",v)} placeholder="Nombre" /></Field></Row2>

      <SHead>Datos personales</SHead>
      <Row2><Field label="Edad"><Inp value={cActivo.edad} onChange={v=>setCActivo(c=>({...c,edad:v}))} placeholder="Ej: 34" /></Field><Field label="WhatsApp"><Inp value={cActivo.wsp} onChange={v=>setCActivo(c=>({...c,wsp:v}))} placeholder="+56 9 XXXX XXXX" /></Field></Row2>
      <Field label="Ciudad"><Inp value={cActivo.ciudad} onChange={v=>setCActivo(c=>({...c,ciudad:v}))} /></Field>

      <SHead>El dolor</SHead>
      <Field label="¿Dónde se ubica el dolor?" hint="Ej: espalda baja, cuello, rodilla derecha"><Inp value={sActiva.ubicacion} onChange={v=>upS("ubicacion",v)} /></Field>
      <Row2>
        <Field label="¿Hace cuánto tiempo?"><Sel value={sActiva.tiempo} onChange={v=>upS("tiempo",v)}><option value="">Seleccionar</option>{["Menos de 1 mes","1 a 3 meses","3 a 6 meses","6 meses a 1 año","Más de 1 año","Más de 5 años"].map(o=><option key={o}>{o}</option>)}</Sel></Field>
        <Field label="¿Cómo es el dolor?"><Sel value={sActiva.tipo} onChange={v=>upS("tipo",v)}><option value="">Seleccionar</option>{["Continuo (siempre presente)","Intermitente (va y viene)","Solo en ciertas posiciones","Solo con movimiento"].map(o=><option key={o}>{o}</option>)}</Sel></Field>
      </Row2>
      <Field label="Intensidad actual del dolor"><Scale value={sActiva.intensidadPre} onChange={v=>upS("intensidadPre",v)} min={1} /></Field>
      <Row2><Field label="¿Qué empeora el dolor?" hint="Ej: frío, estrés"><Inp value={sActiva.empeora} onChange={v=>upS("empeora",v)} /></Field><Field label="¿Qué alivia el dolor?" hint="Ej: calor, descanso"><Inp value={sActiva.alivia} onChange={v=>upS("alivia",v)} /></Field></Row2>

      <SHead>Antecedentes</SHead>
      <Row2><Field label="Diagnóstico médico" hint="Si tiene"><Inp value={sActiva.diagnostico} onChange={v=>upS("diagnostico",v)} /></Field><Field label="Medicamentos"><Inp value={sActiva.medicamentos} onChange={v=>upS("medicamentos",v)} /></Field></Row2>
      <Field label="Tratamientos previos o actuales">
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {["Kinesiología / fisioterapia","Acupuntura","Medicina convencional","Otras terapias complementarias","Ninguno"].map(t=>(
            <label key={t} style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,cursor:"pointer" }}>
              <input type="checkbox" checked={sActiva.tratamientos.includes(t)} onChange={e=>{ const a=e.target.checked?[...sActiva.tratamientos,t]:sActiva.tratamientos.filter(x=>x!==t); upS("tratamientos",a); }} />{t}
            </label>
          ))}
        </div>
      </Field>

      <SHead>Experiencia y expectativas</SHead>
      <Field label="¿Ha recibido sanación pránica antes?"><Sel value={sActiva.experiencia} onChange={v=>upS("experiencia",v)}><option value="">Seleccionar</option>{["Sí, sesiones individuales","Sí, sesiones grupales","Sí, ambas","No, es mi primera vez"].map(o=><option key={o}>{o}</option>)}</Sel></Field>
      <Field label="¿Qué espera lograr?"><Txt value={sActiva.expectativas} onChange={v=>upS("expectativas",v)} placeholder="Resultado que le gustaría obtener" /></Field>
      <Field label="¿Algo más que quiera compartir?"><Txt value={sActiva.otros} onChange={v=>upS("otros",v)} placeholder="Información relevante para su sanación" /></Field>

      <SHead>Evaluación de chakras — congestión / debilidad<Pill label="Congestión" type="congestion" /><Pill label="Normal" type="normal" /><Pill label="Debilidad" type="debilidad" /></SHead>
      <ChakraTable chakras={sActiva.chakras} onChange={v=>upS("chakras",v)} mode={1} />

      <SHead>Evaluación de chakras — activación<Pill label="Sobreactivado" type="sobreactivado" /><Pill label="Normal" type="normal" /><Pill label="Inhibido" type="inhibido" /></SHead>
      <ChakraTable chakras={sActiva.chakras} onChange={v=>upS("chakras",v)} mode={2} />

      <SHead>Mapa corporal</SHead>
      <p style={{ fontSize:12,color:"#888",marginBottom:12 }}>Marca las zonas de trabajo en el cuerpo del consultante.</p>
      <BodyMap marcas={sActiva.marcasCuerpo} onChange={v=>upS("marcasCuerpo",v)} />

      <SHead>Observaciones del terapeuta</SHead>
      <div style={{ background:"rgba(0,0,0,0.03)",borderRadius:12,padding:16 }}>
        <Field label="Protocolo aplicado"><Inp value={sActiva.protocolo} onChange={v=>upS("protocolo",v)} placeholder="Ej: Protocolo alivio del dolor — espalda baja" /></Field>
        <Field label="Zonas intervenidas"><Inp value={sActiva.zonas} onChange={v=>upS("zonas",v)} placeholder="Ej: chakra básico, plexo solar, ajna" /></Field>
        <Field label="Observaciones durante la sesión"><Txt value={sActiva.observaciones} onChange={v=>upS("observaciones",v)} placeholder="Hallazgos energéticos, reacciones, cambios perceptibles..." /></Field>
        <Field label="Intensidad del dolor post-sesión"><Scale value={sActiva.intensidadPost} onChange={v=>upS("intensidadPost",v)} /></Field>
        <Row2><Field label="Próxima sesión recomendada"><Inp value={sActiva.proximaSesion} onChange={v=>upS("proximaSesion",v)} placeholder="Ej: en 3 días" /></Field><Field label="Indicaciones para el consultante"><Inp value={sActiva.indicaciones} onChange={v=>upS("indicaciones",v)} placeholder="Reposo, hidratación, etc." /></Field></Row2>
      </div>

      <div style={{ display:"flex",justifyContent:"flex-end",gap:10,marginTop:24 }}>
        <Btn label="Exportar PDF" onClick={()=>exportarPDF(cActivo,sActiva)} />
        <button onClick={guardar} style={{ padding:"10px 28px",fontSize:14,fontWeight:500,borderRadius:8,cursor:"pointer",border:"none",background:guardado?"#639922":"#1a1a1a",color:"#fff",transition:"background .3s" }}>{guardado?"✓ Guardado":"Guardar ficha"}</button>
      </div>
    </div>
  );

  return null;
}
