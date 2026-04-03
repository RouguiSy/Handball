import React, { useState, useEffect, useRef } from 'react';
import { Award, Search, Plus, Download, X, Trash2, Eye, QrCode, Shield, UserPlus, LogOut, CheckCircle, Clock, XCircle, Home, Clipboard, UserCheck, Bell, FileCheck, BarChart2, Activity, Users } from 'lucide-react';

// ─── QR Code generator (canvas-based, no external lib) ───────────────────────
const QRCodeCanvas = ({ value, size = 128 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const modules = 25;
    const cellSize = size / modules;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000000';
    let hash = 0;
    for (let i = 0; i < value.length; i++) { hash = ((hash << 5) - hash) + value.charCodeAt(i); hash |= 0; }
    const rand = (seed) => { let x = Math.sin(seed + hash) * 10000; return x - Math.floor(x); };
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        const inTL = row < 7 && col < 7;
        const inTR = row < 7 && col >= modules - 7;
        const inBL = row >= modules - 7 && col < 7;
        if (inTL || inTR || inBL) {
          let r = row, c = col;
          if (inTR) c = col - (modules - 7);
          if (inBL) r = row - (modules - 7);
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          if (isOuter || isInner) ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        } else if (rand(row * modules + col) > 0.5) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [value, size]);
  return <canvas ref={canvasRef} width={size} height={size} style={{ imageRendering: 'pixelated' }} />;
};

// ─── PDF Generator ────────────────────────────────────────────────────────────
const generateLicensePDF = (license) => {
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Licence ${license.licenseNumber}</title>
  <style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;background:#eee;display:flex;justify-content:center;align-items:center;min-height:100vh;}
  .card{width:340px;background:white;border-radius:14px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.2);}
  .stripe{height:6px;background:linear-gradient(to right,#15803d 33%,#eab308 33%,#eab308 66%,#dc2626 66%);}
  .hdr{background:#15803d;padding:12px 14px;display:flex;align-items:center;gap:10px;}
  .logo{width:46px;height:46px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;color:#15803d;font-size:14px;flex-shrink:0;}
  .hdr-txt{color:white;font-size:11px;font-weight:900;line-height:1.3;}
  .title{background:#166534;text-align:center;padding:8px;color:white;font-size:18px;font-weight:900;letter-spacing:3px;}
  .body{padding:14px;background:#f9fafb;}
  .player{display:flex;gap:10px;margin-bottom:12px;}
  .photo{width:88px;height:108px;background:linear-gradient(135deg,#15803d,#166534);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:26px;font-weight:900;flex-shrink:0;border:3px solid #15803d;overflow:hidden;}
  .photo img{width:100%;height:100%;object-fit:cover;}
  .infobx{flex:1;background:#15803d;border-radius:8px;padding:10px;}
  .pname{color:white;font-size:15px;font-weight:900;border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:6px;margin-bottom:6px;}
  .irow{margin-bottom:4px;}
  .ilbl{color:rgba(255,255,255,.7);font-size:9px;}
  .ival{color:white;font-size:11px;font-weight:700;}
  .bot{display:flex;gap:10px;padding:12px;border-top:2px solid #e5e7eb;}
  .qrsec{display:flex;flex-direction:column;align-items:center;gap:4px;}
  .qrbx{width:86px;height:86px;border:2px solid #15803d;border-radius:8px;padding:3px;background:white;}
  .qrid{font-size:9px;font-weight:700;color:#15803d;}
  .stsbx{flex:1;display:flex;flex-direction:column;gap:6px;justify-content:center;}
  .srow{background:#f3f4f6;border-radius:6px;padding:7px 10px;display:flex;justify-content:space-between;}
  .slbl{font-size:10px;color:#6b7280;}
  .sval{font-size:12px;font-weight:900;color:#15803d;}
  .badges{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px 12px 12px;}
  .badge{display:flex;flex-direction:column;align-items:center;gap:3px;}
  .bico{font-size:20px;}
  .blbl{font-size:8px;font-weight:700;color:#15803d;text-align:center;}
  @media print{body{background:white;}.card{box-shadow:none;}}
  </style></head><body>
  <div class="card">
  <div class="stripe"></div>
  <div class="hdr"><div class="logo">FSH</div><div class="hdr-txt">FÉDÉRATION SÉNÉGALAISE<br>DE HANDBALL</div></div>
  <div class="title">LICENCE JOUEUR</div>
  <div class="body">
  <div class="player">
  <div class="photo">${license.photoDataUrl ? `<img src="${license.photoDataUrl}"/>` : license.firstName[0]+license.lastName[0]}</div>
  <div class="infobx">
  <div class="pname">${license.firstName} ${license.lastName}</div>
  <div class="irow"><div class="ilbl">N° Licence</div><div class="ival">${license.licenseNumber}</div></div>
  <div class="irow"><div class="ilbl">Date de Naissance</div><div class="ival">${new Date(license.dateOfBirth).toLocaleDateString('fr-FR')}</div></div>
  <div class="irow"><div class="ilbl">Club</div><div class="ival">${license.club}</div></div>
  <div class="irow"><div class="ilbl">Catégorie</div><div class="ival">${license.category}</div></div>
  </div></div></div>
  <div class="bot">
  <div class="qrsec"><div class="qrbx"><canvas id="qrc" width="80" height="80"></canvas></div><div class="qrid">ID: ${license.licenseNumber}</div></div>
  <div class="stsbx">
  <div class="srow"><span class="slbl">Validité</span><span class="sval">${license.validityYear}</span></div>
  <div class="srow"><span class="slbl">Statut</span><span class="sval" style="color:${license.status==='active'?'#15803d':'#dc2626'}">${license.status==='active'?'ACTIF':'EXPIRÉ'}</span></div>
  </div></div>
  <div class="badges">
  <div class="badge"><div class="bico">✅</div><div class="blbl">Assuré</div></div>
  <div class="badge"><div class="bico">🏥</div><div class="blbl">Certifié Médical</div></div>
  <div class="badge"><div class="bico">🏆</div><div class="blbl">Compétitions</div></div>
  <div class="badge"><div class="bico">🪪</div><div class="blbl">Identité Vérifiée</div></div>
  </div>
  <div class="stripe"></div>
  </div>
  <script>
  const cv=document.getElementById('qrc'),ctx=cv.getContext('2d'),val="${`FSH-${license.licenseNumber}`}",m=20,cell=4;
  ctx.fillStyle='#fff';ctx.fillRect(0,0,80,80);ctx.fillStyle='#000';
  let h=0;for(let i=0;i<val.length;i++){h=((h<<5)-h)+val.charCodeAt(i);h|=0;}
  const rnd=s=>{let x=Math.sin(s+h)*10000;return x-Math.floor(x);};
  for(let r=0;r<m;r++)for(let c=0;c<m;c++){
    if(r<7&&c<7){const isO=r===0||r===6||c===0||c===6,isI=r>=2&&r<=4&&c>=2&&c<=4;if(isO||isI)ctx.fillRect(c*cell,r*cell,cell,cell);}
    else if(r<7&&c>=m-7){const dc=c-(m-7),isO=r===0||r===6||dc===0||dc===6,isI=r>=2&&r<=4&&dc>=2&&dc<=4;if(isO||isI)ctx.fillRect(c*cell,r*cell,cell,cell);}
    else if(r>=m-7&&c<7){const dr=r-(m-7),isO=dr===0||dr===6||c===0||c===6,isI=dr>=2&&dr<=4&&c>=2&&c<=4;if(isO||isI)ctx.fillRect(c*cell,r*cell,cell,cell);}
    else if(rnd(r*m+c)>0.45)ctx.fillRect(c*cell,r*cell,cell,cell);}
  window.onload=()=>window.print();
  </script></body></html>`);
  w.document.close();
};

// ─── Main App ─────────────────────────────────────────────────────────────────
const HandballLicenseSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: 'admin' });

  const [licenses, setLicenses] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [clubSecretaries, setClubSecretaries] = useState([]);
  const [licenseRequests, setLicenseRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [view, setView] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showNotif, setShowNotif] = useState(false);

  const [facilitatorForm, setFacilitatorForm] = useState({ name: '', username: '', password: '', email: '', phone: '' });
  const [secretaryForm, setSecretaryForm] = useState({ name: '', username: '', password: '', email: '', phone: '', club: '' });
  const [licForm, setLicForm] = useState({
    firstName: '', lastName: '', dateOfBirth: '', gender: '', category: '',
    photoFile: null, photoDataUrl: null, idCardFile: null, medicalCertFile: null, medicalCertDataUrl: null, birthCertFile: null
  });

  useEffect(() => {
    try {
      const ls = localStorage.getItem('fsh-licenses');
      const cs = localStorage.getItem('fsh-clubs');
      const fs = localStorage.getItem('fsh-facilitators');
      const ss = localStorage.getItem('fsh-secretaries');
      const rs = localStorage.getItem('fsh-requests');
      const ns = localStorage.getItem('fsh-notifications');
      if (ls) setLicenses(JSON.parse(ls));
      if (ns) setNotifications(JSON.parse(ns));
      if (cs) { setClubs(JSON.parse(cs)); } else {
        const def = [
          { id:'1', name:'ASC Jaraaf', city:'Dakar', facilitatorId:null },
          { id:'2', name:'AS Douanes', city:'Dakar', facilitatorId:null },
          { id:'3', name:'ASFA Dakar', city:'Dakar', facilitatorId:null },
          { id:'4', name:'ASK Handball', city:'Kaolack', facilitatorId:null },
          { id:'5', name:"US Gorée", city:'Dakar', facilitatorId:null },
          { id:'6', name:"Jeanne d'Arc", city:'Dakar', facilitatorId:null },
        ];
        setClubs(def); localStorage.setItem('fsh-clubs', JSON.stringify(def));
      }
      if (fs) { setFacilitators(JSON.parse(fs)); } else {
        const def = [{ id:'1', name:'Moussa Diallo', username:'facilitator', password:'fac123', email:'moussa@fsh.sn', phone:'77 123 45 67', assignedClubs:[] }];
        setFacilitators(def); localStorage.setItem('fsh-facilitators', JSON.stringify(def));
      }
      if (ss) { setClubSecretaries(JSON.parse(ss)); } else {
        const def = [{ id:'1', name:'Fatou Sall', username:'secretary', password:'sec123', email:'fatou@jaraaf.sn', phone:'77 987 65 43', club:'ASC Jaraaf', facilitatorId:null }];
        setClubSecretaries(def); localStorage.setItem('fsh-secretaries', JSON.stringify(def));
      }
      if (rs) setLicenseRequests(JSON.parse(rs));
    } catch(e) { console.log('init default data'); }
  }, []);

  const save = (key, val, setter) => { setter(val); localStorage.setItem(key, JSON.stringify(val)); };

  const addNotif = (msg, type='info') => {
    const n = { id: Date.now().toString(), message: msg, type, timestamp: new Date().toISOString(), read: false };
    const upd = [n, ...notifications];
    setNotifications(upd); localStorage.setItem('fsh-notifications', JSON.stringify(upd));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, role } = loginForm;
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      setCurrentUser({ role:'admin', name:'Administrateur FSH', username:'admin' }); setShowLogin(false);
    } else if (role === 'facilitator') {
      const f = facilitators.find(f => f.username === username && f.password === password);
      if (f) { setCurrentUser({ role:'facilitator', ...f }); setShowLogin(false); } else alert('Identifiants incorrects');
    } else if (role === 'secretary') {
      const s = clubSecretaries.find(s => s.username === username && s.password === password);
      if (s) { setCurrentUser({ role:'secretary', ...s }); setShowLogin(false); } else alert('Identifiants incorrects');
    } else alert('Identifiants incorrects');
  };

  const getFilteredData = () => {
    if (!currentUser) return { licenses:[], clubs:[], requests:[] };
    if (currentUser.role === 'admin') return { licenses, clubs, requests: licenseRequests };
    if (currentUser.role === 'facilitator') {
      const myClubs = clubs.filter(c => c.facilitatorId === currentUser.id);
      return { licenses: licenses.filter(l => myClubs.some(c => c.name === l.club)), clubs: myClubs, requests: licenseRequests.filter(r => r.facilitatorId === currentUser.id) };
    }
    if (currentUser.role === 'secretary') {
      return { licenses: licenses.filter(l => l.club === currentUser.club), clubs: [clubs.find(c => c.name === currentUser.club)].filter(Boolean), requests: licenseRequests.filter(r => r.secretaryId === currentUser.id) };
    }
    return { licenses:[], clubs:[], requests:[] };
  };

  const fd = getFilteredData();
  const unread = notifications.filter(n => !n.read).length;
  const accessibleClubs = currentUser?.role === 'facilitator' ? clubs.filter(c => c.facilitatorId === currentUser.id) : clubs;

  const handleFileUpload = (field, file, dataField) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setLicForm(prev => ({ ...prev, [field]: file.name, [dataField]: e.target.result }));
    reader.readAsDataURL(file);
  };

  const handleCreateFacilitator = (e) => {
    e.preventDefault();
    const n = { id: Date.now().toString(), ...facilitatorForm, assignedClubs:[], createdAt: new Date().toISOString() };
    save('fsh-facilitators', [...facilitators, n], setFacilitators);
    setShowModal(false); setFacilitatorForm({ name:'', username:'', password:'', email:'', phone:'' });
    addNotif(`Facilitateur ${n.name} créé`, 'success');
  };

  const handleCreateSecretary = (e) => {
    e.preventDefault();
    const club = clubs.find(c => c.name === secretaryForm.club);
    const fid = club?.facilitatorId || (currentUser.role === 'facilitator' ? currentUser.id : null);
    const n = { id: Date.now().toString(), ...secretaryForm, facilitatorId: fid, createdAt: new Date().toISOString() };
    save('fsh-secretaries', [...clubSecretaries, n], setClubSecretaries);
    setShowModal(false); setSecretaryForm({ name:'', username:'', password:'', email:'', phone:'', club:'' });
    addNotif(`Secrétaire ${n.name} créé`, 'success');
  };

  const handleAssignFacilitator = (clubId, fId) => {
    const upd = clubs.map(c => c.id === clubId ? { ...c, facilitatorId: fId } : c);
    save('fsh-clubs', upd, setClubs);
    addNotif('Facilitateur affecté', 'success');
  };

  const handleSubmitLicense = (e) => {
    e.preventDefault();
    const club = clubs.find(c => c.name === currentUser.club);
    if (!club?.facilitatorId) { alert("Aucun facilitateur affecté à votre club."); return; }
    const req = { id: Date.now().toString(), ...licForm, club: currentUser.club, secretaryId: currentUser.id, facilitatorId: club.facilitatorId, status:'pending', submittedAt: new Date().toISOString(), comments:[] };
    save('fsh-requests', [...licenseRequests, req], setLicenseRequests);
    setShowModal(false);
    setLicForm({ firstName:'', lastName:'', dateOfBirth:'', gender:'', category:'', photoFile:null, photoDataUrl:null, idCardFile:null, medicalCertFile:null, medicalCertDataUrl:null, birthCertFile:null });
    addNotif('Demande soumise avec succès', 'success');
  };

  const handleReview = (id, action, comment='') => {
    const req = licenseRequests.find(r => r.id === id);
    if (action === 'approve') {
      const num = `${new Date().getFullYear()}${Math.floor(Math.random()*100000).toString().padStart(5,'0')}`;
      const lic = { id: Date.now().toString(), licenseNumber: num, firstName: req.firstName, lastName: req.lastName, dateOfBirth: req.dateOfBirth, gender: req.gender, category: req.category, club: req.club, photoFile: req.photoFile, photoDataUrl: req.photoDataUrl, status:'active', validityYear: new Date().getFullYear(), issuedDate: new Date().toISOString(), expirationDate: new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString(), assure:true, certifieMedical:!!req.medicalCertFile, competitions:true, identiteVerifiee:!!req.idCardFile };
      save('fsh-licenses', [...licenses, lic], setLicenses);
      save('fsh-requests', licenseRequests.map(r => r.id===id ? { ...r, status:'approved', reviewedAt: new Date().toISOString(), licenseNumber: num, reviewComment: comment } : r), setLicenseRequests);
      addNotif(`Licence ${num} délivrée`, 'success');
    } else {
      save('fsh-requests', licenseRequests.map(r => r.id===id ? { ...r, status:'rejected', reviewedAt: new Date().toISOString(), reviewComment: comment } : r), setLicenseRequests);
      addNotif('Demande rejetée', 'info');
    }
    setSelectedRequest(null);
  };

  // ═══ LOGIN ═══
  if (showLogin) return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-xl">
            <Award className="w-12 h-12 text-green-700" />
          </div>
          <h1 className="text-2xl font-bold">FSH License System</h1>
          <p className="text-white/80 text-sm">Fédération Sénégalaise de Handball</p>
        </div>
        <form onSubmit={handleLogin} className="p-7 space-y-4">
          {[
            { label: "Type d'utilisateur", field: 'role', type: 'select', options: [['admin','Administrateur'],['facilitator','Facilitateur'],['secretary','Secrétaire de Club']] },
            { label: "Nom d'utilisateur", field: 'username', type: 'text' },
            { label: 'Mot de passe', field: 'password', type: 'password' },
          ].map(f => (
            <div key={f.field}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{f.label}</label>
              {f.type === 'select'
                ? <select value={loginForm[f.field]} onChange={e => setLoginForm({...loginForm, [f.field]: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none">
                    {f.options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                : <input type={f.type} required value={loginForm[f.field]} onChange={e => setLoginForm({...loginForm, [f.field]: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none" />
              }
            </div>
          ))}
          <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg mt-2">Se connecter</button>
          <div className="p-4 bg-green-50 rounded-xl text-xs text-green-700 space-y-1">
            <p className="font-bold text-green-800">Comptes de démonstration:</p>
            <p>Admin: admin / admin123</p>
            <p>Facilitateur: facilitator / fac123</p>
            <p>Secrétaire: secretary / sec123</p>
          </div>
        </form>
      </div>
    </div>
  );

  // ═══ MAIN APP ═══
  const navItems = [
    { key:'dashboard', icon:Home, label:'Tableau de Bord', roles:['admin','facilitator','secretary'] },
    { key:'facilitators', icon:UserCheck, label:'Facilitateurs', roles:['admin'] },
    { key:'clubs', icon:Users, label:'Clubs', roles:['admin'] },
    { key:'secretaries', icon:UserPlus, label:'Secrétaires', roles:['admin','facilitator'] },
    { key:'requests', icon:Clipboard, label:'Demandes', roles:['admin','facilitator'], badge: fd.requests.filter(r=>r.status==='pending').length },
    { key:'licenses', icon:Award, label:'Licences', roles:['admin','facilitator','secretary'] },
  ].filter(i => i.roles.includes(currentUser.role));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 via-yellow-500 to-red-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"><Award className="w-7 h-7 text-green-700" /></div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold leading-tight">FSH – Gestion des Licences</h1>
              <p className="text-xs text-white/80">{currentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 hover:bg-white/10 rounded-lg">
                <Bell className="w-6 h-6" />
                {unread > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">{unread}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
                    <span className="font-bold text-gray-900 text-sm">Notifications</span>
                    <button onClick={() => { const u = notifications.map(n=>({...n,read:true})); setNotifications(u); localStorage.setItem('fsh-notifications',JSON.stringify(u)); }} className="text-xs text-green-600 font-semibold">Tout lire</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.slice(0,8).map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-gray-50 ${!n.read?'bg-green-50':''}`}>
                        <p className="text-sm text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString('fr-FR')}</p>
                      </div>
                    ))}
                    {notifications.length === 0 && <p className="text-center text-gray-400 py-6 text-sm">Aucune notification</p>}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => { setCurrentUser(null); setShowLogin(true); setView('dashboard'); }} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg font-semibold text-sm">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white border-b shadow-sm sticky top-[68px] z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-0 min-w-max">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setView(item.key)}
                className={`flex items-center gap-2 px-4 md:px-6 py-4 font-semibold border-b-4 transition-all text-sm whitespace-nowrap ${view===item.key?'border-green-600 text-green-600 bg-green-50':'border-transparent text-gray-600 hover:bg-gray-50'}`}>
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{item.label}</span>
                {item.badge > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">

        {/* ════ DASHBOARD ════ */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tableau de Bord</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label:'Licences Actives', val: fd.licenses.filter(l=>l.status==='active').length, grad:'from-green-500 to-green-600', icon:Award },
                { label:'Total Demandes', val: fd.requests.length, grad:'from-blue-500 to-blue-600', icon:FileCheck },
                { label:'En Attente', val: fd.requests.filter(r=>r.status==='pending').length, grad:'from-yellow-500 to-yellow-600', icon:Clock },
                { label: currentUser.role==='admin'?'Facilitateurs': currentUser.role==='facilitator'?'Mes Clubs':'Mon Club', val: currentUser.role==='admin'?facilitators.length:fd.clubs.filter(Boolean).length, grad:'from-purple-500 to-purple-600', icon:Users },
              ].map((c,i) => (
                <div key={i} className={`bg-gradient-to-br ${c.grad} rounded-2xl p-5 text-white shadow-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><c.icon className="w-5 h-5"/></div>
                  </div>
                  <h3 className="text-4xl font-black mb-1">{c.val}</h3>
                  <p className="text-white/80 text-sm font-medium">{c.label}</p>
                </div>
              ))}
            </div>

            {currentUser.role === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-green-600"/>Licences par Club</h3>
                  <div className="space-y-3">
                    {clubs.map(club => {
                      const cnt = licenses.filter(l=>l.club===club.name).length;
                      const mx = Math.max(...clubs.map(c=>licenses.filter(l=>l.club===c.name).length),1);
                      return (
                        <div key={club.id}>
                          <div className="flex justify-between text-sm mb-1"><span className="text-gray-700 font-medium">{club.name}</span><span className="font-bold text-green-700">{cnt}</span></div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{width:`${Math.round(cnt/mx*100)}%`}}></div></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-green-600"/>Statuts Demandes</h3>
                  <div className="space-y-3">
                    {[
                      { label:'Approuvées', cnt: licenseRequests.filter(r=>r.status==='approved').length, col:'bg-green-500', txt:'text-green-700' },
                      { label:'En attente', cnt: licenseRequests.filter(r=>r.status==='pending').length, col:'bg-yellow-500', txt:'text-yellow-700' },
                      { label:'Rejetées', cnt: licenseRequests.filter(r=>r.status==='rejected').length, col:'bg-red-500', txt:'text-red-700' },
                    ].map((s,i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${s.col}`}></div><span className="text-sm text-gray-700">{s.label}</span></div>
                        <span className={`text-lg font-black ${s.txt}`}>{s.cnt}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t"><span className="text-sm text-gray-500 font-semibold">Total</span><span className="text-xl font-black text-gray-900">{licenseRequests.length}</span></div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activités Récentes</h3>
              <div className="space-y-3">
                {fd.requests.slice(0,6).map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${r.status==='pending'?'bg-yellow-500':r.status==='approved'?'bg-green-500':'bg-red-500'}`}></div>
                      <div><p className="font-semibold text-gray-900 text-sm">{r.firstName} {r.lastName}</p><p className="text-xs text-gray-500">{r.club}</p></div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${r.status==='pending'?'bg-yellow-100 text-yellow-700':r.status==='approved'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
                      {r.status==='pending'?'En attente':r.status==='approved'?'Approuvée':'Rejetée'}
                    </span>
                  </div>
                ))}
                {fd.requests.length===0 && <p className="text-center text-gray-400 py-8">Aucune activité récente</p>}
              </div>
            </div>
          </div>
        )}

        {/* ════ FACILITATEURS ════ */}
        {view === 'facilitators' && currentUser.role === 'admin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Facilitateurs</h2>
              <button onClick={() => { setModalType('createFacilitator'); setShowModal(true); }} className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center gap-2 shadow-lg">
                <span className="text-lg">+</span> Nouveau Facilitateur
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {facilitators.map(f => (
                <div key={f.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">{f.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div className="flex gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Actif</span>
                      <button onClick={() => { if(window.confirm('Supprimer ?')){ save('fsh-facilitators',facilitators.filter(x=>x.id!==f.id),setFacilitators); addNotif('Facilitateur supprimé','info'); }}} className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p><span className="font-semibold">Email:</span> {f.email}</p>
                    <p><span className="font-semibold">Tél:</span> {f.phone}</p>
                    <p><span className="font-semibold">Login:</span> {f.username}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Clubs assignés:</p>
                    <div className="flex flex-wrap gap-1">
                      {clubs.filter(c=>c.facilitatorId===f.id).map(c=><span key={c.id} className="bg-green-50 text-green-700 px-2 py-0.5 rounded-lg text-xs font-semibold">{c.name}</span>)}
                      {clubs.filter(c=>c.facilitatorId===f.id).length===0 && <span className="text-gray-400 text-xs">Aucun club</span>}
                    </div>
                  </div>
                </div>
              ))}
              {facilitators.length===0 && <div className="col-span-3 text-center py-16 bg-white rounded-2xl shadow"><UserCheck className="w-14 h-14 text-gray-300 mx-auto mb-3"/><p className="text-gray-500">Aucun facilitateur</p></div>}
            </div>
          </div>
        )}

        {/* ════ CLUBS ════ */}
        {view === 'clubs' && currentUser.role === 'admin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Clubs</h2>
            <div className="space-y-4">
              {clubs.map(club => (
                <div key={club.id} className="bg-white rounded-2xl shadow-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">{club.name[0]}</div>
                      <div><h3 className="text-xl font-bold text-gray-900">{club.name}</h3><p className="text-gray-500 text-sm">{club.city}</p></div>
                    </div>
                    <div className="text-right"><p className="text-xs text-gray-500">Licences</p><p className="text-2xl font-black text-green-600">{licenses.filter(l=>l.club===club.name).length}</p></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Facilitateur assigné</label>
                      <select value={club.facilitatorId||''} onChange={e=>handleAssignFacilitator(club.id,e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-sm">
                        <option value="">-- Aucun --</option>
                        {facilitators.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Secrétaires Généraux</p>
                      <div className="space-y-1">
                        {clubSecretaries.filter(s=>s.club===club.name).map(s=>(
                          <div key={s.id} className="bg-gray-50 px-3 py-2 rounded-lg text-xs"><p className="font-semibold text-gray-800">{s.name}</p><p className="text-gray-500">{s.email}</p></div>
                        ))}
                        {clubSecretaries.filter(s=>s.club===club.name).length===0 && <p className="text-gray-400 text-xs">Aucun secrétaire</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ SECRETAIRES ════ */}
        {view === 'secretaries' && (currentUser.role==='admin' || currentUser.role==='facilitator') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Secrétaires Généraux</h2>
              <button onClick={() => { setModalType('createSecretary'); setShowModal(true); }} className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center gap-2 shadow-lg">
                <span className="text-lg">+</span> Nouveau Secrétaire
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(currentUser.role==='facilitator'
                ? clubSecretaries.filter(s=>clubs.filter(c=>c.facilitatorId===currentUser.id).some(c=>c.name===s.club))
                : clubSecretaries
              ).map(s => (
                <div key={s.id} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold">{s.name.split(' ').map(n=>n[0]).join('')}</div>
                    <button onClick={() => { if(window.confirm('Supprimer ?')){ save('fsh-secretaries',clubSecretaries.filter(x=>x.id!==s.id),setClubSecretaries); addNotif('Secrétaire supprimé','info'); }}} className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                  <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{s.club}</span>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-semibold">Email:</span> {s.email}</p>
                    <p><span className="font-semibold">Tél:</span> {s.phone}</p>
                    <p><span className="font-semibold">Login:</span> {s.username}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">Demandes: <span className="font-bold text-gray-700">{licenseRequests.filter(r=>r.secretaryId===s.id).length}</span></p>
                </div>
              ))}
              {(currentUser.role==='facilitator'?clubSecretaries.filter(s=>clubs.filter(c=>c.facilitatorId===currentUser.id).some(c=>c.name===s.club)):clubSecretaries).length===0 && (
                <div className="col-span-3 text-center py-16 bg-white rounded-2xl shadow"><UserPlus className="w-14 h-14 text-gray-300 mx-auto mb-3"/><p className="text-gray-500">Aucun secrétaire enregistré</p></div>
              )}
            </div>
          </div>
        )}

        {/* ════ DEMANDES ════ */}
        {view === 'requests' && (currentUser.role==='facilitator'||currentUser.role==='admin') && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Demandes de Licences</h2>
            <div className="flex gap-2 flex-wrap">
              {['all','pending','approved','rejected'].map(s=>(
                <button key={s} onClick={()=>setFilterStatus(s)} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${filterStatus===s?'bg-green-600 text-white shadow':'bg-white text-gray-600 hover:bg-gray-50'}`}>
                  {s==='all'?'Toutes':s==='pending'?'En attente':s==='approved'?'Approuvées':'Rejetées'}
                  {s!=='all'&&<span className="ml-1.5 text-xs opacity-80">({fd.requests.filter(r=>r.status===s).length})</span>}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {fd.requests.filter(r=>filterStatus==='all'||r.status===filterStatus).map(req=>(
                <div key={req.id} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {req.photoDataUrl
                        ? <img src={req.photoDataUrl} alt="" className="w-14 h-14 rounded-xl object-cover border-2 border-green-200"/>
                        : <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">{req.firstName[0]}{req.lastName[0]}</div>
                      }
                      <div>
                        <h3 className="font-bold text-gray-900">{req.firstName} {req.lastName}</h3>
                        <p className="text-sm text-gray-500">{req.club} · {req.category}</p>
                        <p className="text-xs text-gray-400">{new Date(req.submittedAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl font-semibold text-xs ${req.status==='pending'?'bg-yellow-100 text-yellow-700':req.status==='approved'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
                      {req.status==='pending'?'⏳ En attente':req.status==='approved'?'✅ Approuvée':'❌ Rejetée'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[{l:'Photo',f:req.photoFile},{l:'CNI',f:req.idCardFile},{l:'Médical',f:req.medicalCertFile},{l:'Naissance',f:req.birthCertFile}].map((d,i)=>(
                      <div key={i} className={`p-2 rounded-xl text-center text-xs font-semibold ${d.f?'bg-green-50 text-green-700':'bg-red-50 text-red-500'}`}>
                        <div className="text-base mb-0.5">{d.f?'✅':'❌'}</div>{d.l}
                      </div>
                    ))}
                  </div>
                  {req.status==='pending' && (
                    <button onClick={()=>setSelectedRequest(req)} className="w-full bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2 text-sm">
                      <Eye className="w-4 h-4"/> Examiner
                    </button>
                  )}
                  {req.status==='approved' && req.licenseNumber && (
                    <div className="bg-green-50 rounded-xl p-3 flex items-center justify-between mt-2">
                      <div><p className="text-xs text-green-600 font-semibold">Licence délivrée</p><p className="font-black text-green-900">{req.licenseNumber}</p></div>
                      <button onClick={()=>{ const l=licenses.find(x=>x.licenseNumber===req.licenseNumber); if(l) setSelectedLicense(l); }} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-green-700 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5"/> Voir
                      </button>
                    </div>
                  )}
                  {req.reviewComment && <div className="bg-gray-50 rounded-xl p-3 mt-2 text-sm"><span className="font-semibold text-gray-700">Commentaire: </span><span className="text-gray-600">{req.reviewComment}</span></div>}
                </div>
              ))}
              {fd.requests.filter(r=>filterStatus==='all'||r.status===filterStatus).length===0 && (
                <div className="text-center py-14 bg-white rounded-2xl shadow"><Clipboard className="w-14 h-14 text-gray-300 mx-auto mb-3"/><p className="text-gray-500">Aucune demande</p></div>
              )}
            </div>
          </div>
        )}

        {/* ════ LICENCES ════ */}
        {view === 'licenses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Licences</h2>
              {currentUser.role==='secretary' && (
                <button onClick={()=>{ setModalType('licenseRequest'); setShowModal(true); }} className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center gap-2 shadow-lg">
                  <span className="text-lg">+</span> Nouvelle Demande
                </button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
              <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {fd.licenses.filter(l=>!searchTerm||`${l.firstName} ${l.lastName} ${l.club} ${l.licenseNumber}`.toLowerCase().includes(searchTerm.toLowerCase())).map(lic=>(
                <div key={lic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 transform" onClick={()=>setSelectedLicense(lic)}>
                  <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
                  <div className="bg-green-700 px-4 py-3 flex items-center gap-2">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center font-black text-green-700 text-xs">FSH</div>
                    <div className="text-white flex-1"><p className="text-xs opacity-75">FÉDÉRATION SÉNÉGALAISE DE HANDBALL</p><p className="text-sm font-bold">LICENCE JOUEUR</p></div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${lic.status==='active'?'bg-white text-green-700':'bg-red-100 text-red-700'}`}>{lic.status==='active'?'ACTIF':'EXPIRÉ'}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-3 mb-3">
                      {lic.photoDataUrl
                        ? <img src={lic.photoDataUrl} alt="" className="w-20 h-24 object-cover rounded-xl border-2 border-green-200 flex-shrink-0"/>
                        : <div className="w-20 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">{lic.firstName[0]}{lic.lastName[0]}</div>
                      }
                      <div className="flex-1 bg-green-700 rounded-xl p-3 text-white min-w-0">
                        <p className="font-bold text-sm border-b border-green-600 pb-1.5 mb-1.5 truncate">{lic.firstName} {lic.lastName}</p>
                        <div className="space-y-1 text-xs">
                          <p><span className="opacity-70">N°: </span><span className="font-bold">{lic.licenseNumber}</span></p>
                          <p><span className="opacity-70">Club: </span><span className="font-bold">{lic.club}</span></p>
                          <p><span className="opacity-70">Cat.: </span><span className="font-bold">{lic.category}</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <div className="border-2 border-green-600 rounded-xl p-1 bg-white flex-shrink-0">
                        <QRCodeCanvas value={`FSH-${lic.licenseNumber}`} size={60}/>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="bg-gray-50 rounded-lg p-2 flex justify-between items-center"><span className="text-xs text-gray-500">Validité</span><span className="text-sm font-black text-green-700">{lic.validityYear}</span></div>
                        <div className="bg-gray-50 rounded-lg p-2 flex justify-between items-center"><span className="text-xs text-gray-500">Statut</span><span className={`text-sm font-black ${lic.status==='active'?'text-green-700':'text-red-600'}`}>{lic.status==='active'?'ACTIF':'EXPIRÉ'}</span></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 border-t pt-2">
                      {[{ico:'🛡️',lbl:'Assuré',a:lic.assure},{ico:'🏥',lbl:'Médical',a:lic.certifieMedical},{ico:'🏆',lbl:'Compét.',a:lic.competitions},{ico:'🪪',lbl:'Identité',a:lic.identiteVerifiee}].map((f,i)=>(
                        <div key={i} className={`p-1.5 rounded-lg text-center ${f.a?'bg-green-50':'bg-gray-50'}`}>
                          <div className="text-base">{f.ico}</div>
                          <div className={`text-xs font-semibold ${f.a?'text-green-700':'text-gray-400'}`}>{f.lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
                </div>
              ))}
            </div>
            {fd.licenses.length===0 && (
              <div className="text-center py-14 bg-white rounded-2xl shadow">
                <Award className="w-14 h-14 text-gray-300 mx-auto mb-3"/>
                <p className="text-gray-500">Aucune licence</p>
                {currentUser.role==='secretary' && <p className="text-gray-400 text-sm mt-1">Soumettez une demande pour commencer</p>}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ══════════════ MODALS ══════════════ */}

      {/* Modal Facilitateur */}
      {showModal && modalType==='createFacilitator' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-green-700 text-white p-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-bold">Nouveau Facilitateur</h2>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleCreateFacilitator} className="p-5 space-y-4">
              {[{l:'Nom Complet',f:'name',t:'text'},{l:'Email',f:'email',t:'email'},{l:'Téléphone',f:'phone',t:'tel'}].map(({l,f,t})=>(
                <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1">{l}</label>
                <input type={t} required value={facilitatorForm[f]} onChange={e=>setFacilitatorForm({...facilitatorForm,[f]:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[{l:"Nom d'utilisateur",f:'username'},{l:'Mot de passe',f:'password'}].map(({l,f})=>(
                  <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1">{l}</label>
                  <input type="text" required value={facilitatorForm[f]} onChange={e=>setFacilitatorForm({...facilitatorForm,[f]:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 shadow-lg">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Secrétaire */}
      {showModal && modalType==='createSecretary' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-green-700 text-white p-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-bold">Nouveau Secrétaire Général</h2>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleCreateSecretary} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Club</label>
                <select required value={secretaryForm.club} onChange={e=>setSecretaryForm({...secretaryForm,club:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none">
                  <option value="">-- Sélectionner un club --</option>
                  {accessibleClubs.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              {[{l:'Nom Complet',f:'name',t:'text'},{l:'Email',f:'email',t:'email'},{l:'Téléphone',f:'phone',t:'tel'}].map(({l,f,t})=>(
                <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1">{l}</label>
                <input type={t} required value={secretaryForm[f]} onChange={e=>setSecretaryForm({...secretaryForm,[f]:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[{l:"Nom d'utilisateur",f:'username'},{l:'Mot de passe',f:'password'}].map(({l,f})=>(
                  <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1">{l}</label>
                  <input type="text" required value={secretaryForm[f]} onChange={e=>setSecretaryForm({...secretaryForm,[f]:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 shadow-lg">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Demande Licence */}
      {showModal && modalType==='licenseRequest' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-green-700 text-white p-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-bold">Nouvelle Demande de Licence</h2>
              <button onClick={()=>setShowModal(false)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmitLicense} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[{l:'Prénom',f:'firstName'},{l:'Nom',f:'lastName'}].map(({l,f})=>(
                  <div key={f}><label className="block text-sm font-semibold text-gray-700 mb-1">{l}</label>
                  <input type="text" required value={licForm[f]} onChange={e=>setLicForm({...licForm,[f]:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Date de Naissance</label>
                <input type="date" required value={licForm.dateOfBirth} onChange={e=>setLicForm({...licForm,dateOfBirth:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"/></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Genre</label>
                <select required value={licForm.gender} onChange={e=>setLicForm({...licForm,gender:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none">
                  <option value="">Sélectionner</option><option value="M">Masculin</option><option value="F">Féminin</option>
                </select></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie</label>
              <select required value={licForm.category} onChange={e=>setLicForm({...licForm,category:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none">
                <option value="">Sélectionner</option>
                {['U12','U14','U16','U18','SENIOR M','SENIOR F','VÉTÉRAN'].map(c=><option key={c} value={c}>{c}</option>)}
              </select></div>

              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-bold text-gray-700">📎 Documents requis</p>

                {/* Photo upload réel */}
                <div className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-xl p-4 transition-colors">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📷 Photo d'identité <span className="text-red-500">*</span></label>
                  <input type="file" accept="image/*" required onChange={e=>handleFileUpload('photoFile',e.target.files[0],'photoDataUrl')} className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-semibold hover:file:bg-green-700 cursor-pointer"/>
                  {licForm.photoDataUrl && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={licForm.photoDataUrl} alt="preview" className="w-14 h-14 object-cover rounded-lg border-2 border-green-200"/>
                      <span className="text-xs text-green-600 font-semibold">✓ {licForm.photoFile}</span>
                    </div>
                  )}
                </div>

                {/* Certificat médical upload réel */}
                <div className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-xl p-4 transition-colors">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🏥 Certificat Médical <span className="text-red-500">*</span></label>
                  <input type="file" accept="image/*,application/pdf" required onChange={e=>handleFileUpload('medicalCertFile',e.target.files[0],'medicalCertDataUrl')} className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:font-semibold hover:file:bg-green-700 cursor-pointer"/>
                  {licForm.medicalCertFile && <p className="mt-1 text-xs text-green-600 font-semibold">✓ {licForm.medicalCertFile}</p>}
                </div>

                {/* CNI + Acte naissance case à cocher */}
                {[{l:'🪪 Copie CNI',f:'idCardFile'},{l:'📄 Acte de Naissance',f:'birthCertFile'}].map(({l,f})=>(
                  <div key={f} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">{l}</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!licForm[f]} onChange={e=>setLicForm({...licForm,[f]:e.target.checked?'fourni':null})} className="w-5 h-5 accent-green-600 cursor-pointer"/>
                      <span className={`text-sm font-semibold ${licForm[f]?'text-green-600':'text-gray-500'}`}>{licForm[f]?'✓ Fourni':'Marquer comme fourni'}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 shadow-lg">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal examen demande */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-green-700 text-white p-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-bold">Examen de la Demande</h2>
              <button onClick={()=>setSelectedRequest(null)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-5">
              <div className="flex gap-4 mb-5">
                {selectedRequest.photoDataUrl
                  ? <img src={selectedRequest.photoDataUrl} alt="" className="w-24 h-28 object-cover rounded-xl border-2 border-green-200 flex-shrink-0"/>
                  : <div className="w-24 h-28 bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-3xl font-bold flex-shrink-0">{selectedRequest.firstName[0]}{selectedRequest.lastName[0]}</div>
                }
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedRequest.firstName} {selectedRequest.lastName}</h3>
                  <p className="text-gray-600 text-sm">{selectedRequest.club}</p>
                  <p className="text-green-700 font-semibold text-sm">{selectedRequest.category}</p>
                  <p className="text-gray-500 text-sm">Naissance: {new Date(selectedRequest.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-bold text-gray-700 mb-3 text-sm">Documents fournis</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[{l:"Photo d'identité",f:selectedRequest.photoFile},{l:'CNI',f:selectedRequest.idCardFile},{l:'Cert. Médical',f:selectedRequest.medicalCertFile},{l:'Acte Naissance',f:selectedRequest.birthCertFile}].map((d,i)=>(
                    <div key={i} className={`p-3 rounded-xl flex items-center gap-2 ${d.f?'bg-green-100 text-green-700':'bg-red-100 text-red-600'}`}>
                      {d.f?<CheckCircle className="w-4 h-4 flex-shrink-0"/>:<XCircle className="w-4 h-4 flex-shrink-0"/>}
                      <span className="text-xs font-semibold">{d.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Commentaire (optionnel)</label>
                <textarea id="reviewComment" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-sm" rows="3" placeholder="Motif ou note..."></textarea>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>{ const c=document.getElementById('reviewComment').value; handleReview(selectedRequest.id,'reject',c); }} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 flex items-center justify-center gap-2 text-sm">
                  <XCircle className="w-4 h-4"/> Rejeter
                </button>
                <button onClick={()=>{ const c=document.getElementById('reviewComment').value; handleReview(selectedRequest.id,'approve',c); }} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4"/> Approuver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal licence détail + PDF */}
      {selectedLicense && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xs w-full overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
            <div className="bg-green-700 px-4 py-3 flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center font-black text-green-700 text-sm flex-shrink-0">FSH</div>
              <div className="text-white flex-1 min-w-0">
                <p className="text-xs opacity-75 truncate">FÉDÉRATION SÉNÉGALAISE DE HANDBALL</p>
                <p className="text-base font-black tracking-widest">LICENCE JOUEUR</p>
              </div>
              <button onClick={()=>setSelectedLicense(null)} className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><X className="w-4 h-4 text-white"/></button>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex gap-3 mb-3">
                {selectedLicense.photoDataUrl
                  ? <img src={selectedLicense.photoDataUrl} alt="" className="w-20 h-24 object-cover rounded-xl border-2 border-green-700 shadow flex-shrink-0"/>
                  : <div className="w-20 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white text-2xl font-black shadow flex-shrink-0">{selectedLicense.firstName[0]}{selectedLicense.lastName[0]}</div>
                }
                <div className="flex-1 bg-green-700 rounded-xl p-2.5 text-white min-w-0">
                  <p className="font-black text-sm border-b border-green-600 pb-1.5 mb-1.5 truncate">{selectedLicense.firstName} {selectedLicense.lastName}</p>
                  <div className="space-y-0.5 text-xs">
                    <p><span className="opacity-70">N°: </span><span className="font-bold">{selectedLicense.licenseNumber}</span></p>
                    <p><span className="opacity-70">Né: </span><span className="font-bold">{new Date(selectedLicense.dateOfBirth).toLocaleDateString('fr-FR')}</span></p>
                    <p><span className="opacity-70">Club: </span><span className="font-bold">{selectedLicense.club}</span></p>
                    <p><span className="opacity-70">Cat.: </span><span className="font-bold">{selectedLicense.category}</span></p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="border-2 border-green-600 rounded-xl p-1.5 bg-white flex-shrink-0">
                  <QRCodeCanvas value={`FSH-${selectedLicense.licenseNumber}-${selectedLicense.club}-${selectedLicense.validityYear}`} size={86}/>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="bg-white rounded-xl p-2.5 flex justify-between"><span className="text-xs text-gray-500">Validité</span><span className="font-black text-green-700">{selectedLicense.validityYear}</span></div>
                  <div className="bg-white rounded-xl p-2.5 flex justify-between"><span className="text-xs text-gray-500">Statut</span><span className={`font-black ${selectedLicense.status==='active'?'text-green-700':'text-red-600'}`}>{selectedLicense.status==='active'?'ACTIF':'EXPIRÉ'}</span></div>
                  <p className="text-center text-xs text-green-600 font-semibold">ID: {selectedLicense.licenseNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-4">
                {[{i:'🛡️',l:'Assuré',a:selectedLicense.assure},{i:'🏥',l:'Médical',a:selectedLicense.certifieMedical},{i:'🏆',l:'Compét.',a:selectedLicense.competitions},{i:'🪪',l:'Identité',a:selectedLicense.identiteVerifiee}].map((f,idx)=>(
                  <div key={idx} className={`p-2 rounded-xl text-center ${f.a?'bg-green-100':'bg-gray-100'}`}>
                    <div className="text-lg">{f.i}</div>
                    <p className={`text-xs font-bold leading-tight mt-0.5 ${f.a?'text-green-700':'text-gray-400'}`}>{f.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setSelectedLicense(null)} className="flex-1 py-2.5 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 text-sm">Fermer</button>
                <button onClick={()=>generateLicensePDF(selectedLicense)} className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg flex items-center justify-center gap-2 text-sm">
                  <Download className="w-4 h-4"/> PDF
                </button>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HandballLicenseSystem;
