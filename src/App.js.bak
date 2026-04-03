import React, { useState, useEffect } from 'react';
import { Camera, Users, Award, Search, Plus, Download, Filter, ChevronRight, Check, X, Edit2, Trash2, Eye, QrCode, FileText, TrendingUp, Upload, Shield, UserPlus, Lock, LogOut, AlertCircle, CheckCircle, Clock, XCircle, Menu, Home, Clipboard, UserCheck, Bell, Settings, FileCheck } from 'lucide-react';

const HandballLicenseSystem = () => {
  // Auth & User State
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '', role: 'admin' });

  // Data State
  const [licenses, setLicenses] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [clubSecretaries, setClubSecretaries] = useState([]);
  const [licenseRequests, setLicenseRequests] = useState([]);

  // UI State
  const [view, setView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Form States
  const [facilitatorForm, setFacilitatorForm] = useState({
    name: '', username: '', password: '', email: '', phone: ''
  });
  const [secretaryForm, setSecretaryForm] = useState({
    name: '', username: '', password: '', email: '', phone: '', club: ''
  });
  const [licenseRequestForm, setLicenseRequestForm] = useState({
    firstName: '', lastName: '', dateOfBirth: '', gender: '', category: '', 
    photoFile: null, idCardFile: null, medicalCertFile: null, birthCertFile: null
  });

  // Initialize data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      // Load all data from localStorage
      const licensesData = localStorage.getItem('fsh-licenses');
      const clubsData = localStorage.getItem('fsh-clubs');
      const facilitatorsData = localStorage.getItem('fsh-facilitators');
      const secretariesData = localStorage.getItem('fsh-secretaries');
      const requestsData = localStorage.getItem('fsh-requests');
      const notificationsData = localStorage.getItem('fsh-notifications');

      if (licensesData) setLicenses(JSON.parse(licensesData));
      if (notificationsData) setNotifications(JSON.parse(notificationsData));
      
      if (clubsData) {
        setClubs(JSON.parse(clubsData));
      } else {
        const defaultClubs = [
          { id: '1', name: 'ASC Jaraaf', city: 'Dakar', facilitatorId: null },
          { id: '2', name: 'AS Douanes', city: 'Dakar', facilitatorId: null },
          { id: '3', name: 'ASFA Dakar', city: 'Dakar', facilitatorId: null },
          { id: '4', name: 'ASK Handball', city: 'Kaolack', facilitatorId: null },
          { id: '5', name: 'US Gorée', city: 'Dakar', facilitatorId: null }
        ];
        setClubs(defaultClubs);
        localStorage.setItem('fsh-clubs', JSON.stringify(defaultClubs));
      }

      if (facilitatorsData) {
        setFacilitators(JSON.parse(facilitatorsData));
      } else {
        // Demo facilitator
        const demoFacilitator = [{
          id: '1', name: 'Moussa Diallo', username: 'facilitator', password: 'fac123',
          email: 'moussa@fsh.sn', phone: '77 123 45 67', assignedClubs: []
        }];
        setFacilitators(demoFacilitator);
        localStorage.setItem('fsh-facilitators', JSON.stringify(demoFacilitator));
      }

      if (secretariesData) {
        setClubSecretaries(JSON.parse(secretariesData));
      } else {
        // Demo secretary
        const demoSecretary = [{
          id: '1', name: 'Fatou Sall', username: 'secretary', password: 'sec123',
          email: 'fatou@jaraaf.sn', phone: '77 987 65 43', club: 'ASC Jaraaf', facilitatorId: null
        }];
        setClubSecretaries(demoSecretary);
        localStorage.setItem('fsh-secretaries', JSON.stringify(demoSecretary));
      }

      if (requestsData) {
        setLicenseRequests(JSON.parse(requestsData));
      }
    } catch (error) {
      console.log('Initializing with default data');
    }
  };

  // Auth Functions
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, role } = loginForm;

    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      setCurrentUser({ role: 'admin', name: 'Administrateur FSH', username: 'admin' });
      setShowLogin(false);
      addNotification('Connexion réussie', 'success');
    } else if (role === 'facilitator') {
      const facilitator = facilitators.find(f => f.username === username && f.password === password);
      if (facilitator) {
        setCurrentUser({ role: 'facilitator', ...facilitator });
        setShowLogin(false);
        addNotification('Connexion réussie', 'success');
      } else {
        alert('Identifiants incorrects');
      }
    } else if (role === 'secretary') {
      const secretary = clubSecretaries.find(s => s.username === username && s.password === password);
      if (secretary) {
        setCurrentUser({ role: 'secretary', ...secretary });
        setShowLogin(false);
        addNotification('Connexion réussie', 'success');
      } else {
        alert('Identifiants incorrects');
      }
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setView('dashboard');
  };

  // Notification system
  const addNotification = (message, type = 'info') => {
    const newNotif = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    const updatedNotifications = [newNotif, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem('fsh-notifications', JSON.stringify(updatedNotifications));
  };

  // Facilitator Management (Admin only)
  const handleCreateFacilitator = (e) => {
    e.preventDefault();
    const newFacilitator = {
      id: Date.now().toString(),
      ...facilitatorForm,
      assignedClubs: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...facilitators, newFacilitator];
    setFacilitators(updated);
    localStorage.setItem('fsh-facilitators', JSON.stringify(updated));
    setShowModal(false);
    setFacilitatorForm({ name: '', username: '', password: '', email: '', phone: '' });
    addNotification(`Facilitateur ${newFacilitator.name} créé avec succès`, 'success');
  };

  // Club Secretary Management
  const handleCreateSecretary = (e) => {
    e.preventDefault();
    const club = clubs.find(c => c.name === secretaryForm.club);
    const newSecretary = {
      id: Date.now().toString(),
      ...secretaryForm,
      facilitatorId: club?.facilitatorId || null,
      createdAt: new Date().toISOString()
    };
    const updated = [...clubSecretaries, newSecretary];
    setClubSecretaries(updated);
    localStorage.setItem('fsh-secretaries', JSON.stringify(updated));
    setShowModal(false);
    setSecretaryForm({ name: '', username: '', password: '', email: '', phone: '', club: '' });
    addNotification(`Secrétaire ${newSecretary.name} créé avec succès`, 'success');
  };

  // Assign facilitator to club (Admin only)
  const handleAssignFacilitator = (clubId, facilitatorId) => {
    const updatedClubs = clubs.map(club => 
      club.id === clubId ? { ...club, facilitatorId } : club
    );
    setClubs(updatedClubs);
    localStorage.setItem('fsh-clubs', JSON.stringify(updatedClubs));

    const updatedFacilitators = facilitators.map(f => 
      f.id === facilitatorId 
        ? { ...f, assignedClubs: [...(f.assignedClubs || []), clubId] }
        : f
    );
    setFacilitators(updatedFacilitators);
    localStorage.setItem('fsh-facilitators', JSON.stringify(updatedFacilitators));

    // Update secretaries with facilitator
    const updatedSecretaries = clubSecretaries.map(s => {
      const club = updatedClubs.find(c => c.name === s.club);
      return club ? { ...s, facilitatorId: club.facilitatorId } : s;
    });
    setClubSecretaries(updatedSecretaries);
    localStorage.setItem('fsh-secretaries', JSON.stringify(updatedSecretaries));

    addNotification('Facilitateur affecté au club avec succès', 'success');
  };

  // License Request (Secretary)
  const handleSubmitLicenseRequest = (e) => {
    e.preventDefault();
    
    const secretary = currentUser;
    const club = clubs.find(c => c.name === secretary.club);
    
    if (!club?.facilitatorId) {
      alert('Aucun facilitateur n\'est affecté à votre club. Veuillez contacter l\'administration.');
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      ...licenseRequestForm,
      club: secretary.club,
      secretaryId: secretary.id,
      facilitatorId: club.facilitatorId,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      comments: []
    };

    const updated = [...licenseRequests, newRequest];
    setLicenseRequests(updated);
    localStorage.setItem('fsh-requests', JSON.stringify(updated));
    
    setShowModal(false);
    setLicenseRequestForm({
      firstName: '', lastName: '', dateOfBirth: '', gender: '', category: '',
      photoFile: null, idCardFile: null, medicalCertFile: null, birthCertFile: null
    });
    
    addNotification('Demande de licence soumise avec succès', 'success');
  };

  // Review License Request (Facilitator)
  const handleReviewRequest = (requestId, action, comment = '') => {
    const request = licenseRequests.find(r => r.id === requestId);
    
    if (action === 'approve') {
      // Create license
      const licenseNumber = generateLicenseNumber();
      const newLicense = {
        id: Date.now().toString(),
        licenseNumber,
        firstName: request.firstName,
        lastName: request.lastName,
        dateOfBirth: request.dateOfBirth,
        gender: request.gender,
        category: request.category,
        club: request.club,
        photoFile: request.photoFile,
        status: 'active',
        validityYear: new Date().getFullYear(),
        issuedDate: new Date().toISOString(),
        expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        assure: true,
        certifieMedical: true,
        competitions: true,
        identiteVerifiee: true
      };

      const updatedLicenses = [...licenses, newLicense];
      setLicenses(updatedLicenses);
      localStorage.setItem('fsh-licenses', JSON.stringify(updatedLicenses));
      
      // Update request status
      const updatedRequests = licenseRequests.map(r => 
        r.id === requestId 
          ? { ...r, status: 'approved', reviewedAt: new Date().toISOString(), licenseNumber, reviewComment: comment }
          : r
      );
      setLicenseRequests(updatedRequests);
      localStorage.setItem('fsh-requests', JSON.stringify(updatedRequests));
      
      addNotification(`Licence ${licenseNumber} délivrée avec succès`, 'success');
    } else if (action === 'reject') {
      const updatedRequests = licenseRequests.map(r => 
        r.id === requestId 
          ? { ...r, status: 'rejected', reviewedAt: new Date().toISOString(), reviewComment: comment }
          : r
      );
      setLicenseRequests(updatedRequests);
      localStorage.setItem('fsh-requests', JSON.stringify(updatedRequests));
      
      addNotification('Demande rejetée', 'info');
    }
    
    setSelectedRequest(null);
  };

  const generateLicenseNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${year}${random}`;
  };

  // Filter data based on user role
  const getFilteredData = () => {
    if (!currentUser) {
      return { licenses: [], clubs: [], requests: [] };
    }
    
    if (currentUser.role === 'admin') {
      return { licenses, clubs, requests: licenseRequests };
    } else if (currentUser.role === 'facilitator') {
      const myClubs = clubs.filter(c => c.facilitatorId === currentUser.id);
      const myRequests = licenseRequests.filter(r => r.facilitatorId === currentUser.id);
      const myLicenses = licenses.filter(l => myClubs.some(c => c.name === l.club));
      return { licenses: myLicenses, clubs: myClubs, requests: myRequests };
    } else if (currentUser.role === 'secretary') {
      const myLicenses = licenses.filter(l => l.club === currentUser.club);
      const myRequests = licenseRequests.filter(r => r.secretaryId === currentUser.id);
      return { licenses: myLicenses, clubs: [clubs.find(c => c.name === currentUser.club)].filter(Boolean), requests: myRequests };
    }
    return { licenses: [], clubs: [], requests: [] };
  };

  const filteredData = getFilteredData();

  // Login Screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-10">
          <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 p-8 text-white text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
              <Award className="w-14 h-14 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold mb-2">FSH License System</h1>
            <p className="text-green-50">Fédération Sénégalaise de Handball</p>
          </div>

          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Type d'utilisateur</label>
              <select
                value={loginForm.role}
                onChange={(e) => setLoginForm({...loginForm, role: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
              >
                <option value="admin">Administrateur</option>
                <option value="facilitator">Facilitateur</option>
                <option value="secretary">Secrétaire de Club</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom d'utilisateur</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                placeholder="Votre nom d'utilisateur"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                placeholder="Votre mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Se connecter
            </button>

            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <p className="text-xs text-green-800 font-semibold mb-2">Comptes de démonstration:</p>
              <p className="text-xs text-green-700">Admin: admin / admin123</p>
              <p className="text-xs text-green-700">Facilitateur: facilitator / fac123</p>
              <p className="text-xs text-green-700">Secrétaire: secretary / sec123</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 via-yellow-500 to-red-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">FSH - Système de Gestion</h1>
                <p className="text-sm text-white/90">{currentUser.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-[76px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-all ${
                view === 'dashboard' 
                  ? 'border-green-600 text-green-600 bg-green-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              Tableau de Bord
            </button>

            {currentUser.role === 'admin' && (
              <>
                <button
                  onClick={() => setView('facilitators')}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-all ${
                    view === 'facilitators' 
                      ? 'border-green-600 text-green-600 bg-green-50' 
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  Facilitateurs
                </button>
                <button
                  onClick={() => setView('clubs')}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-all ${
                    view === 'clubs' 
                      ? 'border-green-600 text-green-600 bg-green-50' 
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Clubs
                </button>
              </>
            )}

            {(currentUser.role === 'facilitator' || currentUser.role === 'admin') && (
              <button
                onClick={() => setView('requests')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-all ${
                  view === 'requests' 
                    ? 'border-green-600 text-green-600 bg-green-50' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Clipboard className="w-5 h-5" />
                Demandes
                {filteredData.requests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {filteredData.requests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setView('licenses')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-all ${
                view === 'licenses' 
                  ? 'border-green-600 text-green-600 bg-green-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Award className="w-5 h-5" />
              Licences
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Tableau de Bord</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">Total</span>
                </div>
                <h3 className="text-4xl font-bold mb-2">{filteredData.licenses.length}</h3>
                <p className="text-green-100 font-medium">Licences Actives</p>
              </div>

              {currentUser.role === 'facilitator' && (
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">En attente</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-2">
                    {filteredData.requests.filter(r => r.status === 'pending').length}
                  </h3>
                  <p className="text-yellow-100 font-medium">Demandes à Traiter</p>
                </div>
              )}

              {currentUser.role === 'secretary' && (
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">Soumises</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{filteredData.requests.length}</h3>
                  <p className="text-yellow-100 font-medium">Mes Demandes</p>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">Clubs</span>
                </div>
                <h3 className="text-4xl font-bold mb-2">{filteredData.clubs.filter(c => c).length}</h3>
                <p className="text-blue-100 font-medium">
                  {currentUser.role === 'admin' ? 'Total Clubs' : 
                   currentUser.role === 'facilitator' ? 'Mes Clubs' : 'Mon Club'}
                </p>
              </div>

              {currentUser.role === 'admin' && (
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">Actifs</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{facilitators.length}</h3>
                  <p className="text-red-100 font-medium">Facilitateurs</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Activités Récentes</h3>
              <div className="space-y-3">
                {filteredData.requests.slice(0, 5).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-500' :
                        request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {request.firstName} {request.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{request.club}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        request.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {request.status === 'pending' ? 'En attente' :
                         request.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(request.submittedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredData.requests.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucune activité récente</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Facilitators View (Admin only) */}
        {view === 'facilitators' && currentUser.role === 'admin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Gestion des Facilitateurs</h2>
              <button
                onClick={() => { setModalType('createFacilitator'); setShowModal(true); }}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouveau Facilitateur
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilitators.map(facilitator => (
                <div key={facilitator.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {facilitator.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Actif
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{facilitator.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-semibold">Email:</span> {facilitator.email}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-semibold">Tél:</span> {facilitator.phone}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-semibold">Username:</span> {facilitator.username}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Clubs Assignés:</p>
                    <div className="flex flex-wrap gap-2">
                      {clubs.filter(c => c.facilitatorId === facilitator.id).map(club => (
                        <span key={club.id} className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-semibold">
                          {club.name}
                        </span>
                      ))}
                      {clubs.filter(c => c.facilitatorId === facilitator.id).length === 0 && (
                        <span className="text-gray-400 text-xs">Aucun club assigné</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clubs View (Admin only) */}
        {view === 'clubs' && currentUser.role === 'admin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Gestion des Clubs</h2>
              <button
                onClick={() => { setModalType('createSecretary'); setShowModal(true); }}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouveau Secrétaire
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {clubs.map(club => (
                <div key={club.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {club.name[0]}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{club.name}</h3>
                        <p className="text-gray-600">{club.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Licences actives</p>
                      <p className="text-3xl font-bold text-green-600">
                        {licenses.filter(l => l.club === club.name).length}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Facilitateur Assigné
                      </label>
                      <select
                        value={club.facilitatorId || ''}
                        onChange={(e) => handleAssignFacilitator(club.id, e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      >
                        <option value="">-- Sélectionner un facilitateur --</option>
                        {facilitators.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Secrétaires</p>
                      <div className="space-y-1">
                        {clubSecretaries.filter(s => s.club === club.name).map(secretary => (
                          <div key={secretary.id} className="bg-gray-50 px-3 py-2 rounded-lg text-sm">
                            <p className="font-semibold text-gray-900">{secretary.name}</p>
                            <p className="text-gray-600 text-xs">{secretary.email}</p>
                          </div>
                        ))}
                        {clubSecretaries.filter(s => s.club === club.name).length === 0 && (
                          <p className="text-gray-400 text-xs">Aucun secrétaire</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests View (Facilitator) */}
        {view === 'requests' && (currentUser.role === 'facilitator' || currentUser.role === 'admin') && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Demandes de Licences</h2>

            {/* Filter tabs */}
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    filterStatus === status
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {status === 'all' ? 'Toutes' : 
                   status === 'pending' ? 'En attente' :
                   status === 'approved' ? 'Approuvées' : 'Rejetées'}
                  {status !== 'all' && (
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                      {filteredData.requests.filter(r => r.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredData.requests
                .filter(r => filterStatus === 'all' || r.status === filterStatus)
                .map(request => (
                <div key={request.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {request.firstName[0]}{request.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {request.firstName} {request.lastName}
                        </h3>
                        <p className="text-gray-600">{request.club}</p>
                        <p className="text-sm text-gray-500">{request.category}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      request.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {request.status === 'pending' ? 'En attente' :
                       request.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Date de naissance</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(request.dateOfBirth).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Genre</p>
                      <p className="font-semibold text-gray-900">
                        {request.gender === 'M' ? 'Masculin' : 'Féminin'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Documents fournis:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { label: 'Photo', file: request.photoFile },
                        { label: 'CNI', file: request.idCardFile },
                        { label: 'Certificat Médical', file: request.medicalCertFile },
                        { label: 'Acte de Naissance', file: request.birthCertFile }
                      ].map((doc, idx) => (
                        <div key={idx} className={`p-3 rounded-lg text-center ${
                          doc.file ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <div className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center ${
                            doc.file ? 'bg-green-200' : 'bg-red-200'
                          }`}>
                            {doc.file ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </div>
                          <p className="text-xs font-semibold">{doc.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>Soumis le: {new Date(request.submittedAt).toLocaleString('fr-FR')}</p>
                    {request.reviewedAt && (
                      <p>Traité le: {new Date(request.reviewedAt).toLocaleString('fr-FR')}</p>
                    )}
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Examiner
                      </button>
                    </div>
                  )}

                  {request.status !== 'pending' && request.reviewComment && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Commentaire:</p>
                      <p className="text-sm text-gray-600">{request.reviewComment}</p>
                    </div>
                  )}

                  {request.status === 'approved' && request.licenseNumber && (
                    <div className="bg-green-50 rounded-xl p-4 mt-4">
                      <p className="text-sm font-semibold text-green-700 mb-1">Licence délivrée:</p>
                      <p className="text-lg font-bold text-green-900">{request.licenseNumber}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredData.requests.filter(r => filterStatus === 'all' || r.status === filterStatus).length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <Clipboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Aucune demande trouvée</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Licenses View */}
        {view === 'licenses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Licences</h2>
              {currentUser.role === 'secretary' && (
                <button
                  onClick={() => { setModalType('licenseRequest'); setShowModal(true); }}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Nouvelle Demande
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.licenses.map(license => (
                <div key={license.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer" onClick={() => setSelectedLicense(license)}>
                  {/* License Card - Senegal colors header */}
                  <div className="h-32 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 relative p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <Award className="w-7 h-7 text-green-700" />
                      </div>
                      <div className="text-white">
                        <p className="text-xs font-semibold opacity-90">FÉDÉRATION SÉNÉGALAISE</p>
                        <p className="text-lg font-bold">DE HANDBALL</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {license.status === 'active' ? 'ACTIF' : 'EXPIRÉ'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 -mt-12 relative">
                    {/* Player photo placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center border-4 border-white text-white text-3xl font-bold">
                      {license.firstName[0]}{license.lastName[0]}
                    </div>

                    <div className="bg-green-700 text-white rounded-xl p-4 mb-4">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {license.firstName} {license.lastName}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between border-b border-green-600 pb-1">
                          <span className="opacity-90">N° Licence:</span>
                          <span className="font-bold">{license.licenseNumber}</span>
                        </p>
                        <p className="flex justify-between border-b border-green-600 pb-1">
                          <span className="opacity-90">Date de Naissance:</span>
                          <span className="font-bold">
                            {new Date(license.dateOfBirth).toLocaleDateString('fr-FR')}
                          </span>
                        </p>
                        <p className="flex justify-between border-b border-green-600 pb-1">
                          <span className="opacity-90">Club:</span>
                          <span className="font-bold">{license.club}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="opacity-90">Catégorie:</span>
                          <span className="font-bold">{license.category}</span>
                        </p>
                      </div>
                    </div>

                    {/* QR Code placeholder */}
                    <div className="bg-white border-4 border-gray-200 rounded-xl p-4 mb-4">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-gray-400" />
                      </div>
                      <p className="text-center text-xs text-gray-600 mt-2 font-semibold">
                        ID: {license.licenseNumber}
                      </p>
                    </div>

                    {/* Validity and status */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Validité</p>
                        <p className="font-bold text-green-700">{license.validityYear}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">Statut</p>
                        <p className="font-bold text-green-700">
                          {license.status === 'active' ? 'ACTIF' : 'EXPIRÉ'}
                        </p>
                      </div>
                    </div>

                    {/* Features icons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { icon: Shield, label: 'Assuré', active: license.assure },
                        { icon: FileCheck, label: 'Certifié Médical', active: license.certifieMedical },
                        { icon: Award, label: 'Compétitions', active: license.competitions },
                        { icon: CheckCircle, label: 'Identité Vérifiée', active: license.identiteVerifiee }
                      ].map((feature, idx) => (
                        <div key={idx} className={`p-2 rounded-lg text-center ${
                          feature.active ? 'bg-green-50' : 'bg-gray-50'
                        }`}>
                          <feature.icon className={`w-6 h-6 mx-auto mb-1 ${
                            feature.active ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <p className={`text-xs font-semibold ${
                            feature.active ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {feature.label.split(' ')[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom decoration */}
                  <div className="h-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600"></div>
                </div>
              ))}
            </div>

            {filteredData.licenses.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Aucune licence trouvée</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showModal && modalType === 'createFacilitator' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nouveau Facilitateur</h2>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleCreateFacilitator} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom Complet</label>
                <input
                  type="text"
                  required
                  value={facilitatorForm.name}
                  onChange={(e) => setFacilitatorForm({...facilitatorForm, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    required
                    value={facilitatorForm.username}
                    onChange={(e) => setFacilitatorForm({...facilitatorForm, username: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                  <input
                    type="text"
                    required
                    value={facilitatorForm.password}
                    onChange={(e) => setFacilitatorForm({...facilitatorForm, password: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={facilitatorForm.email}
                  onChange={(e) => setFacilitatorForm({...facilitatorForm, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  required
                  value={facilitatorForm.phone}
                  onChange={(e) => setFacilitatorForm({...facilitatorForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && modalType === 'createSecretary' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nouveau Secrétaire de Club</h2>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleCreateSecretary} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom Complet</label>
                <input
                  type="text"
                  required
                  value={secretaryForm.name}
                  onChange={(e) => setSecretaryForm({...secretaryForm, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Club</label>
                <select
                  required
                  value={secretaryForm.club}
                  onChange={(e) => setSecretaryForm({...secretaryForm, club: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Sélectionner un club</option>
                  {clubs.map(club => (
                    <option key={club.id} value={club.name}>{club.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    required
                    value={secretaryForm.username}
                    onChange={(e) => setSecretaryForm({...secretaryForm, username: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                  <input
                    type="text"
                    required
                    value={secretaryForm.password}
                    onChange={(e) => setSecretaryForm({...secretaryForm, password: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={secretaryForm.email}
                  onChange={(e) => setSecretaryForm({...secretaryForm, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  required
                  value={secretaryForm.phone}
                  onChange={(e) => setSecretaryForm({...secretaryForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && modalType === 'licenseRequest' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Nouvelle Demande de Licence</h2>
                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmitLicenseRequest} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    required
                    value={licenseRequestForm.firstName}
                    onChange={(e) => setLicenseRequestForm({...licenseRequestForm, firstName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    required
                    value={licenseRequestForm.lastName}
                    onChange={(e) => setLicenseRequestForm({...licenseRequestForm, lastName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date de Naissance</label>
                  <input
                    type="date"
                    required
                    value={licenseRequestForm.dateOfBirth}
                    onChange={(e) => setLicenseRequestForm({...licenseRequestForm, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
                  <select
                    required
                    value={licenseRequestForm.gender}
                    onChange={(e) => setLicenseRequestForm({...licenseRequestForm, gender: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <select
                  required
                  value={licenseRequestForm.category}
                  onChange={(e) => setLicenseRequestForm({...licenseRequestForm, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Sélectionner</option>
                  <option value="U12">U12 - Moins de 12 ans</option>
                  <option value="U14">U14 - Moins de 14 ans</option>
                  <option value="U16">U16 - Moins de 16 ans</option>
                  <option value="U18">U18 - Moins de 18 ans</option>
                  <option value="SENIOR M">SENIOR M - Hommes</option>
                  <option value="SENIOR F">SENIOR F - Femmes</option>
                  <option value="VÉTÉRAN">VÉTÉRAN</option>
                </select>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Documents requis (simulations):</p>
                <div className="space-y-3">
                  {[
                    { label: 'Photo d\'identité', field: 'photoFile' },
                    { label: 'Copie CNI', field: 'idCardFile' },
                    { label: 'Certificat médical', field: 'medicalCertFile' },
                    { label: 'Acte de naissance', field: 'birthCertFile' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-700">{doc.label}</span>
                      <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={licenseRequestForm[doc.field]}
                          onChange={(e) => setLicenseRequestForm({...licenseRequestForm, [doc.field]: e.target.checked})}
                          className="hidden"
                        />
                        {licenseRequestForm[doc.field] ? '✓ Fourni' : 'Marquer comme fourni'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                  Soumettre la Demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Examen de la Demande</h2>
                <button onClick={() => setSelectedRequest(null)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedRequest.firstName} {selectedRequest.lastName}
                </h3>
                <p className="text-gray-600">{selectedRequest.club} - {selectedRequest.category}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Documents fournis:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Photo', file: selectedRequest.photoFile },
                    { label: 'CNI', file: selectedRequest.idCardFile },
                    { label: 'Certificat Médical', file: selectedRequest.medicalCertFile },
                    { label: 'Acte de Naissance', file: selectedRequest.birthCertFile }
                  ].map((doc, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${
                      doc.file ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className="flex items-center gap-2">
                        {doc.file ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        <span className="font-semibold text-sm">{doc.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Commentaire (optionnel)</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  rows="3"
                  placeholder="Ajoutez un commentaire..."
                  id="reviewComment"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const comment = document.getElementById('reviewComment').value;
                    handleReviewRequest(selectedRequest.id, 'reject', comment);
                  }}
                  className="flex-1 bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Rejeter
                </button>
                <button
                  onClick={() => {
                    const comment = document.getElementById('reviewComment').value;
                    handleReviewRequest(selectedRequest.id, 'approve', comment);
                  }}
                  className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approuver et Délivrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedLicense && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Licence Joueur</h2>
                <button onClick={() => setSelectedLicense(null)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  {selectedLicense.firstName[0]}{selectedLicense.lastName[0]}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedLicense.firstName} {selectedLicense.lastName}
                </h3>
                <p className="text-gray-600">{selectedLicense.club}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">N° Licence:</span>
                  <span className="font-bold text-gray-900">{selectedLicense.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Catégorie:</span>
                  <span className="font-semibold text-gray-900">{selectedLicense.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validité:</span>
                  <span className="font-semibold text-green-600">{selectedLicense.validityYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <span className={`font-semibold ${
                    selectedLicense.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedLicense.status === 'active' ? 'ACTIF' : 'EXPIRÉ'}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-inner">
                    <QrCode className="w-32 h-32 text-green-700" />
                  </div>
                </div>
                <p className="text-center text-lg font-bold text-green-700">
                  Scanner pour vérifier
                </p>
                <p className="text-center text-sm text-green-600 mt-1">
                  {selectedLicense.status === 'active' ? '✓ VALIDE' : '✗ NON VALIDE'}
                </p>
              </div>

              <button
                onClick={() => setSelectedLicense(null)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandballLicenseSystem;