import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Globe, BarChart3, MapPin, Database, Home, Download, Filter, ArrowUp, Eye } from 'lucide-react';

const BeninLanguageWebsite = () => {
  const [data, setData] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [activeTab, setActiveTab] = useState('accueil');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filters, setFilters] = useState({
    department: 'all',
    search: '',
    minDiversity: 0,
    maxDiversity: 50
  });
  const [loading, setLoading] = useState(true);

  // Enhanced color palette with pure red prominence
  const vibrantColors = [
    '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A', 
    '#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2',
    '#E11D48', '#BE185D', '#9D174D', '#881337', '#4C0519',
    '#F43F5E', '#FB7185', '#FDA4AF', '#FECDD3', '#FDF2F8'
  ];

  const departmentColors = {
    'Alibori': 'from-red-500 to-red-600',
    'Atacora': 'from-red-600 to-red-700',
    'Atlantique': 'from-red-400 to-red-500',
    'Borgou': 'from-red-300 to-red-500',
    'Collines': 'from-red-500 to-red-600',
    'Couffo': 'from-red-700 to-red-800',
    'Donga': 'from-red-400 to-red-600',
    'Littoral': 'from-red-600 to-red-700',
    'Mono': 'from-red-500 to-red-700',
    'Ouémé': 'from-red-400 to-red-600',
    'Plateau': 'from-red-300 to-red-500',
    'Zou': 'from-red-600 to-red-800'
  };

  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'vue-ensemble', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'langues', label: 'Langues', icon: Globe },
    { id: 'départements', label: 'Départements', icon: MapPin },
    { id: 'données', label: 'Données', icon: Database }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Données complètes des 77 communes du Bénin
        const fullBeninData = [
          // Alibori
          { commune: "Banikoara", département: "Alibori", langprinc: "Bariba", pourcentage: 0.68, diversité: 28, lat: 11.293453, lng: 2.435696, altitude: 320, hasCoordinates: true },
          { commune: "Gogounou", département: "Alibori", langprinc: "Bariba", pourcentage: 0.72, diversité: 25, lat: 10.839900, lng: 2.831740, altitude: 328, hasCoordinates: true },
          { commune: "Kandi", département: "Alibori", langprinc: "Bariba", pourcentage: 0.75, diversité: 33, lat: 11.130519, lng: 2.932578, altitude: 200, hasCoordinates: true },
          { commune: "Karimama", département: "Alibori", langprinc: "Dendi", pourcentage: 0.82, diversité: 22, lat: 12.069425, lng: 3.184242, altitude: 200, hasCoordinates: true },
          { commune: "Malanville", département: "Alibori", langprinc: "Dendi", pourcentage: 0.78, diversité: 31, lat: 11.862628, lng: 3.383733, altitude: 200, hasCoordinates: true },
          { commune: "Segbana", département: "Alibori", langprinc: "Bariba", pourcentage: 0.71, diversité: 26, lat: 10.927402, lng: 3.695290, altitude: 200, hasCoordinates: true },
          
          // Atacora
          { commune: "Boukoumbé", département: "Atacora", langprinc: "Waama", pourcentage: 0.85, diversité: 18, lat: 10.183220, lng: 1.100050, altitude: 230, hasCoordinates: true },
          { commune: "Cobly", département: "Atacora", langprinc: "Waama", pourcentage: 0.79, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Kérou", département: "Atacora", langprinc: "Bariba", pourcentage: 0.67, diversité: 29, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Kouandé", département: "Atacora", langprinc: "Bariba", pourcentage: 0.73, diversité: 24, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Matéri", département: "Atacora", langprinc: "Waama", pourcentage: 0.81, diversité: 19, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Natitingou", département: "Atacora", langprinc: "Waama", pourcentage: 0.76, diversité: 28, lat: 10.304160, lng: 1.379620, altitude: 450, hasCoordinates: true },
          { commune: "Péhunco", département: "Atacora", langprinc: "Bariba", pourcentage: 0.69, diversité: 27, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Tanguiéta", département: "Atacora", langprinc: "Waama", pourcentage: 0.83, diversité: 17, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Toucountouna", département: "Atacora", langprinc: "Waama", pourcentage: 0.87, diversité: 16, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Atlantique
          { commune: "Abomey-Calavi", département: "Atlantique", langprinc: "Fon", pourcentage: 0.76, diversité: 35, lat: 6.448520, lng: 2.355660, altitude: 17, hasCoordinates: true },
          { commune: "Allada", département: "Atlantique", langprinc: "Fon", pourcentage: 0.88, diversité: 22, lat: 6.650000, lng: 2.150000, altitude: 25, hasCoordinates: true },
          { commune: "Kpomassè", département: "Atlantique", langprinc: "Fon", pourcentage: 0.84, diversité: 24, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Ouidah", département: "Atlantique", langprinc: "Fon", pourcentage: 0.82, diversité: 32, lat: 6.363070, lng: 2.085060, altitude: 12, hasCoordinates: true },
          { commune: "Sô-Ava", département: "Atlantique", langprinc: "Fon", pourcentage: 0.91, diversité: 18, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Toffo", département: "Atlantique", langprinc: "Fon", pourcentage: 0.86, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Tori-Bossito", département: "Atlantique", langprinc: "Fon", pourcentage: 0.89, diversité: 19, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Zè", département: "Atlantique", langprinc: "Fon", pourcentage: 0.85, diversité: 23, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Borgou
          { commune: "Bembèrèkè", département: "Borgou", langprinc: "Bariba", pourcentage: 0.74, diversité: 31, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Kalalé", département: "Borgou", langprinc: "Bariba", pourcentage: 0.79, diversité: 26, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "N'Dali", département: "Borgou", langprinc: "Bariba", pourcentage: 0.77, diversité: 28, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Nikki", département: "Borgou", langprinc: "Bariba", pourcentage: 0.81, diversité: 24, lat: 9.936763, lng: 3.213123, altitude: 408, hasCoordinates: true },
          { commune: "Parakou", département: "Borgou", langprinc: "Bariba", pourcentage: 0.72, diversité: 42, lat: 9.337160, lng: 2.630310, altitude: 369, hasCoordinates: true },
          { commune: "Pèrèrè", département: "Borgou", langprinc: "Bariba", pourcentage: 0.83, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Sinendé", département: "Borgou", langprinc: "Bariba", pourcentage: 0.76, diversité: 27, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Tchaourou", département: "Borgou", langprinc: "Bariba", pourcentage: 0.75, diversité: 29, lat: 8.886490, lng: 2.597530, altitude: 332, hasCoordinates: true },
          
          // Collines
          { commune: "Bantè", département: "Collines", langprinc: "Fon", pourcentage: 0.69, diversité: 34, lat: 8.330078, lng: 1.869610, altitude: null, hasCoordinates: true },
          { commune: "Dassa-Zoumè", département: "Collines", langprinc: "Fon", pourcentage: 0.71, diversité: 36, lat: 7.750000, lng: 2.183330, altitude: null, hasCoordinates: true },
          { commune: "Glazoué", département: "Collines", langprinc: "Fon", pourcentage: 0.73, diversité: 32, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Ouèssè", département: "Collines", langprinc: "Fon", pourcentage: 0.67, diversité: 38, lat: 8.495962, lng: 2.423342, altitude: null, hasCoordinates: true },
          { commune: "Savalou", département: "Collines", langprinc: "Fon", pourcentage: 0.75, diversité: 33, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Savè", département: "Collines", langprinc: "Fon", pourcentage: 0.72, diversité: 35, lat: 8.033600, lng: 2.485146, altitude: null, hasCoordinates: true },
          
          // Couffo
          { commune: "Aplahoué", département: "Couffo", langprinc: "Fon", pourcentage: 0.84, diversité: 23, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Djakotomey", département: "Couffo", langprinc: "Fon", pourcentage: 0.86, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Dogbo", département: "Couffo", langprinc: "Fon", pourcentage: 0.88, diversité: 19, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Klouékanmè", département: "Couffo", langprinc: "Fon", pourcentage: 0.87, diversité: 20, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Lalo", département: "Couffo", langprinc: "Fon", pourcentage: 0.89, diversité: 18, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Toviklin", département: "Couffo", langprinc: "Fon", pourcentage: 0.91, diversité: 16, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Donga
          { commune: "Bassila", département: "Donga", langprinc: "Ani", pourcentage: 0.72, diversité: 31, lat: 9.008100, lng: 1.665400, altitude: null, hasCoordinates: true },
          { commune: "Copargo", département: "Donga", langprinc: "Ani", pourcentage: 0.75, diversité: 28, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Djougou", département: "Donga", langprinc: "Dendi", pourcentage: 0.68, diversité: 35, lat: 9.708530, lng: 1.665980, altitude: null, hasCoordinates: true },
          { commune: "Ouaké", département: "Donga", langprinc: "Ani", pourcentage: 0.78, diversité: 26, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Littoral
          { commune: "Cotonou", département: "Littoral", langprinc: "Français", pourcentage: 0.65, diversité: 45, lat: 6.365400, lng: 2.418300, altitude: 7, hasCoordinates: true },
          
          // Mono
          { commune: "Athiémé", département: "Mono", langprinc: "Fon", pourcentage: 0.83, diversité: 24, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Bopa", département: "Mono", langprinc: "Fon", pourcentage: 0.85, diversité: 22, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Comè", département: "Mono", langprinc: "Fon", pourcentage: 0.87, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Grand-Popo", département: "Mono", langprinc: "Fon", pourcentage: 0.89, diversité: 19, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Houéyogbé", département: "Mono", langprinc: "Fon", pourcentage: 0.86, diversité: 23, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Lokossa", département: "Mono", langprinc: "Fon", pourcentage: 0.81, diversité: 27, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Ouémé
          { commune: "Adjarra", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.84, diversité: 26, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Adjohoun", département: "Ouémé", langprinc: "Fon", pourcentage: 0.78, diversité: 29, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Aguégués", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.89, diversité: 18, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Akpro-Missérété", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.81, diversité: 25, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Avrankou", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.86, diversité: 22, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Bonou", département: "Ouémé", langprinc: "Fon", pourcentage: 0.83, diversité: 24, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Dangbo", département: "Ouémé", langprinc: "Fon", pourcentage: 0.87, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Porto-Novo", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.78, diversité: 38, lat: 6.496500, lng: 2.603600, altitude: 20, hasCoordinates: true },
          { commune: "Sèmè-Kpodji", département: "Ouémé", langprinc: "Yoruba", pourcentage: 0.82, diversité: 27, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Plateau
          { commune: "Adja-Ouèrè", département: "Plateau", langprinc: "Yoruba", pourcentage: 0.79, diversité: 28, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Ifangni", département: "Plateau", langprinc: "Yoruba", pourcentage: 0.85, diversité: 23, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Kétou", département: "Plateau", langprinc: "Yoruba", pourcentage: 0.88, diversité: 21, lat: 7.363320, lng: 2.599780, altitude: null, hasCoordinates: true },
          { commune: "Pobè", département: "Plateau", langprinc: "Yoruba", pourcentage: 0.82, diversité: 26, lat: 6.980080, lng: 2.664900, altitude: null, hasCoordinates: true },
          { commune: "Sakété", département: "Plateau", langprinc: "Yoruba", pourcentage: 0.86, diversité: 22, lat: null, lng: null, altitude: null, hasCoordinates: false },
          
          // Zou
          { commune: "Abomey", département: "Zou", langprinc: "Fon", pourcentage: 0.85, diversité: 25, lat: 7.182860, lng: 1.991190, altitude: 219, hasCoordinates: true },
          { commune: "Agbangnizoun", département: "Zou", langprinc: "Fon", pourcentage: 0.87, diversité: 23, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Bohicon", département: "Zou", langprinc: "Fon", pourcentage: 0.79, diversité: 30, lat: 7.168871, lng: 2.067014, altitude: null, hasCoordinates: true },
          { commune: "Cové", département: "Zou", langprinc: "Fon", pourcentage: 0.83, diversité: 27, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Djidja", département: "Zou", langprinc: "Fon", pourcentage: 0.81, diversité: 28, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Ouinhi", département: "Zou", langprinc: "Fon", pourcentage: 0.84, diversité: 26, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Za-Kpota", département: "Zou", langprinc: "Fon", pourcentage: 0.88, diversité: 22, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Zangnanado", département: "Zou", langprinc: "Fon", pourcentage: 0.86, diversité: 24, lat: null, lng: null, altitude: null, hasCoordinates: false },
          { commune: "Zogbodomey", département: "Zou", langprinc: "Fon", pourcentage: 0.89, diversité: 21, lat: null, lng: null, altitude: null, hasCoordinates: false }
        ];
        
        setData(fullBeninData);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const stats = useMemo(() => {
    if (!data.length) return { langues: [], départements: [], diversitéMoyenne: 0 };
    
    const langueCount = {};
    const deptStats = {};
    let totalDiversité = 0;

    data.forEach(item => {
      langueCount[item.langprinc] = (langueCount[item.langprinc] || 0) + 1;
      
      if (!deptStats[item.département]) {
        deptStats[item.département] = { communes: 0, diversitéTotal: 0, dominanceTotal: 0, langues: new Set() };
      }
      deptStats[item.département].communes++;
      deptStats[item.département].diversitéTotal += item.diversité;
      deptStats[item.département].dominanceTotal += item.pourcentage * 100;
      deptStats[item.département].langues.add(item.langprinc);
      totalDiversité += item.diversité;
    });

    const langues = Object.entries(langueCount)
      .map(([langue, count]) => ({ langue, count }))
      .sort((a, b) => b.count - a.count);

    const départements = Object.entries(deptStats)
      .map(([nom, stats]) => ({
        nom,
        communes: stats.communes,
        diversitéMoy: Math.round(stats.diversitéTotal / stats.communes),
        dominanceMoy: Math.round(stats.dominanceTotal / stats.communes),
        nbLangues: stats.langues.size
      }))
      .sort((a, b) => b.diversitéMoy - a.diversitéMoy);

    return {
      langues,
      départements,
      diversitéMoyenne: totalDiversité / data.length
    };
  }, [data]);

  const departments = useMemo(() => [...new Set(data.map(item => item.département))].sort(), [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesDept = filters.department === 'all' || item.département === filters.department;
      const matchesSearch = filters.search === '' || 
        item.commune.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.langprinc.toLowerCase().includes(filters.search.toLowerCase());
      const matchesDiversity = item.diversité >= filters.minDiversity && item.diversité <= filters.maxDiversity;
      
      return matchesDept && matchesSearch && matchesDiversity;
    });
  }, [data, filters]);

  const getLanguageColor = (langue) => {
    const languages = stats.langues.map(l => l.langue);
    const index = languages.indexOf(langue);
    return vibrantColors[index % vibrantColors.length];
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Commune,Département,Langue Principale,Pourcentage,Diversité,Latitude,Longitude,Altitude\n"
      + filteredData.map(row => 
          `${row.commune},${row.département},${row.langprinc},${(row.pourcentage*100).toFixed(1)}%,${row.diversité},${row.lat || ''},${row.lng || ''},${row.altitude || ''}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "atlas_linguistique_benin.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-800 flex items-center justify-center">
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-3xl p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-6"></div>
          <p className="text-white text-xl font-semibold">Chargement de l'Atlas Linguistique...</p>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (activeTab === 'accueil') {
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-600 via-red-600 to-red-800 text-white rounded-3xl p-12 text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Globe className="text-white" size={48} />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6">Bienvenue dans l'Atlas Linguistique du Bénin</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Explorez la richesse de la diversité linguistique béninoise à travers {data.length} communes 
              et découvrez les {stats.langues.length} langues principales qui façonnent notre patrimoine culturel.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{data.length}</div>
                <div className="opacity-90">Communes analysées</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{stats.langues.length}</div>
                <div className="opacity-90">Langues principales</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{data.filter(d => d.hasCoordinates).length}</div>
                <div className="opacity-90">Communes géolocalisées</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                <BarChart3 className="text-red-600" size={28} />
                Aperçu des données
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                  <span className="font-medium text-gray-700">Langue la plus parlée</span>
                  <span className="font-bold text-red-700">{stats.langues[0]?.langue}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                  <span className="font-medium text-gray-700">Diversité moyenne</span>
                  <span className="font-bold text-red-700">{stats.diversitéMoyenne.toFixed(1)} langues/commune</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                  <span className="font-medium text-gray-700">Département le plus divers</span>
                  <span className="font-bold text-red-700">{stats.départements[0]?.nom}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                <Globe className="text-red-600" size={28} />
                Langues principales
              </h3>
              <div className="space-y-3">
                {stats.langues.slice(0, 6).map((langue, index) => (
                  <div key={langue.langue} className="flex items-center gap-4 p-3 bg-red-50 rounded-xl">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: vibrantColors[index] }}
                    ></div>
                    <span className="font-medium text-gray-700 flex-1">{langue.langue}</span>
                    <span className="font-bold text-red-700">{langue.count} communes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'vue-ensemble') {
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-2xl p-10 border border-indigo-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl">
                <BarChart3 className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                📊 Vue d'ensemble statistique
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-400">
                <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                  🏆 Top 10 des langues principales
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={stats.langues.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fee2e2" />
                    <XAxis 
                      dataKey="langue" 
                      angle={-45}
                      textAnchor="end"
                      height={120}
                      fontSize={12}
                      stroke="#dc2626"
                    />
                    <YAxis stroke="#dc2626" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fef2f2',
                        border: '2px solid #dc2626',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                  🌈 Diversité par département
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={stats.départements}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fee2e2" />
                    <XAxis 
                      dataKey="nom" 
                      angle={-45}
                      textAnchor="end"
                      height={120}
                      fontSize={11}
                      stroke="#dc2626"
                    />
                    <YAxis stroke="#dc2626" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fef2f2',
                        border: '2px solid #dc2626',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="diversitéMoy" fill="#b91c1c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-10 border border-red-200">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-8 text-center">
              🎨 Distribution des langues
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={stats.langues.slice(0, 8)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ langue, percent }) => `${langue} (${(percent * 100).toFixed(1)}%)`}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="count"
                    stroke="#ffffff"
                    strokeWidth={3}
                  >
                    {stats.langues.slice(0, 8).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={vibrantColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fef2f2',
                      border: '2px solid #dc2626',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'langues') {
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-10 border border-red-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl">
                <Globe className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                🗣️ Analyse par langue
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {stats.langues.slice(0, 9).map((lang, index) => (
                <div key={lang.langue} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-red-200">
                  <div className="bg-gradient-to-r from-red-400 to-red-500 p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full shadow-lg border-2 border-white"
                        style={{ backgroundColor: vibrantColors[index % vibrantColors.length] }}
                      ></div>
                      <h3 className="font-bold text-white text-lg">{lang.langue}</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-600 font-medium">🏘️ Communes :</span>
                      <span className="font-bold text-red-600 text-xl">{lang.count}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg">
                      <span className="text-gray-600 font-medium">📊 % du total :</span>
                      <span className="font-bold text-red-700 text-xl">
                        {((lang.count / data.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-600 font-medium">🗺️ Cartographiées :</span>
                      <span className="font-bold text-red-600 text-xl">
                        {data.filter(d => d.langprinc === lang.langue && d.hasCoordinates).length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'départements') {
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-10 border border-red-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl">
                <MapPin className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                🏛️ Analyse par département
              </h2>
            </div>
            
            <div className="grid gap-8">
              {stats.départements.map((dept, index) => {
                const deptData = data.filter(d => d.département === dept.nom);
                const mappedCount = deptData.filter(d => d.hasCoordinates).length;
                const gradientClass = departmentColors[dept.nom] || 'from-red-400 to-red-500';
                
                return (
                  <div key={dept.nom} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className={`bg-gradient-to-r ${gradientClass} p-6`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          🌟 {dept.nom}
                        </h3>
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                          <div className="text-3xl font-bold text-white">{dept.communes}</div>
                          <div className="text-white opacity-90 font-medium">communes</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border-l-4 border-red-400">
                          <div className="text-3xl font-bold text-red-600 mb-2">{dept.diversitéMoy}</div>
                          <div className="text-gray-600 font-medium">🌈 Langues/commune (moy.)</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border-l-4 border-red-500">
                          <div className="text-3xl font-bold text-red-700 mb-2">{dept.dominanceMoy}%</div>
                          <div className="text-gray-600 font-medium">📊 Dominance moyenne</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border-l-4 border-red-600">
                          <div className="text-3xl font-bold text-red-800 mb-2">{dept.nbLangues}</div>
                          <div className="text-gray-600 font-medium">🗣️ Langues principales</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border-l-4 border-red-400">
                          <div className="text-3xl font-bold text-red-600 mb-2">{mappedCount}</div>
                          <div className="text-gray-600 font-medium">📍 Communes cartographiées</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'données') {
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-10 border border-red-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl">
                  <Database className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  🗃️ Données complètes
                </h2>
              </div>
              <button
                onClick={exportData}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2"
              >
                <Download size={20} />
                Exporter CSV
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Filter size={20} />
                Filtres de recherche
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">🏛️ Département</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                  >
                    <option value="all">🌍 Tous les départements</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">🔎 Recherche</label>
                  <input
                    type="text"
                    placeholder="🏘️ Commune ou 🗣️ langue..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">📊 Diversité min</label>
                  <input
                    type="number"
                    value={filters.minDiversity}
                    onChange={(e) => setFilters({...filters, minDiversity: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">📈 Diversité max</label>
                  <input
                    type="number"
                    value={filters.maxDiversity}
                    onChange={(e) => setFilters({...filters, maxDiversity: parseInt(e.target.value) || 50})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  📊 {filteredData.length} résultats sur {data.length} communes analysées
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-red-50 to-red-100">
                      <th className="text-left py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">🏘️ Commune</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">🏛️ Département</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">🗣️ Langue Principale</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">📊 % Locuteurs</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">🌈 Nb Langues</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-700 border-b-2 border-red-200">🗺️ Cartographié</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200">
                        <td className="py-4 px-6 font-bold text-gray-800">{row.commune}</td>
                        <td className="py-4 px-6 text-gray-600 font-medium">{row.département}</td>
                        <td className="py-4 px-6 font-bold" style={{ color: getLanguageColor(row.langprinc) }}>
                          {row.langprinc}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                            {(row.pourcentage * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg">
                            {row.diversité}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {row.hasCoordinates ? (
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                              ✓ Oui
                            </span>
                          ) : (
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full text-sm font-bold shadow-lg">
                              ✗ Non
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-6">
            🚧 Onglet en construction
          </h2>
          <p className="text-gray-600 text-xl">✨ Cette section sera bientôt disponible avec encore plus de fonctionnalités ! 🎉</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-red-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-2xl shadow-lg">
                <Globe className="text-white" size={36} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-800 bg-clip-text text-transparent">
                  Atlas Linguistique
                </h1>
                <p className="text-gray-600 font-medium">🇧🇯 République du Bénin</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-red-300">
                <span className="font-bold text-red-700">{data.length}</span>
                <span className="text-gray-600 ml-1">communes analysées</span>
              </div>
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-red-400">
                <span className="font-bold text-red-800">{data.filter(d => d.hasCoordinates).length}</span>
                <span className="text-gray-600 ml-1">géolocalisées</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 transform ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl scale-105'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {renderTabContent()}
      </main>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <footer className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Globe className="text-white" size={32} />
              </div>
            </div>
            <p className="text-xl font-bold mb-2">🌟 Atlas Linguistique du Bénin 🌟</p>
            <p className="opacity-90">
              📊 Exploration interactive de la diversité linguistique béninoise
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeninLanguageWebsite;