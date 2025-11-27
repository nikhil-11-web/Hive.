import React, { useState } from "react";

// --- COMPONENTS ---
import Login3D from "./components/Login3D"; 
import Header from "./components/Header"; 
import LeftSidebar from "./components/LeftSidebar"; 
import Stories from "./components/Stories";
import Post from "./components/Post"; 
import Sidebar from "./components/Sidebar"; 
import ChatSection from "./components/ChatSection";
import ActivitySection from "./components/ActivitySection"; 
import SearchSection from "./components/SearchSection";
import CreatePostModal from "./components/CreatePostModal";
import ExploreSection from "./components/ExploreSection";
import MobileMenu from "./components/MobileMenu"; 
import ProfileSection from "./components/ProfileSection";
import SettingsSection from "./components/SettingsSection";
import MoreSection from "./components/MoreSection"; 
import ReelSection from "./components/ReelSection"; 
import AboutHive from "./components/AboutHive"; 

// --- FIXED DATA IMPORTS (Use lowercase 'data' folder) ---
import { currentUser } from "./data/currentUser.js";
import { postsData } from "./data/posts.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('dark'); 
  const [currentView, setCurrentView] = useState('home'); 

  // --- SAVE LOGIC ---
  const [savedPosts, setSavedPosts] = useState([]);

  const handleToggleSave = (post) => {
    setSavedPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      if (exists) {
        return prev.filter((p) => p.id !== post.id); 
      }
      return [...prev, post]; 
    });
  };

  // --- MODAL STATES ---
  const [modals, setModals] = useState({
    chat: false, activity: false, search: false, create: false,
    menu: false, settings: false, more: false, about: false
  });

  const closeAll = () => {
    setModals({
      chat: false, activity: false, search: false, create: false,
      menu: false, settings: false, more: false, about: false
    });
  };

  const toggleModal = (name) => {
    closeAll();
    setModals(prev => ({ ...prev, [name]: true }));
  };

  // --- NAVIGATION ---
  const navigateTo = (view) => { closeAll(); setCurrentView(view); };
  const toggleTheme = () => { setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')); };

  if (!isAuthenticated) return <Login3D onLogin={() => setIsAuthenticated(true)} theme={theme} />;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-[#050505] text-slate-200' : 'bg-fuchsia-50 text-slate-900'}`}>
      
      {/* HEADER */}
      <Header 
        currentUser={currentUser} 
        onOpenChat={() => toggleModal('chat')} 
        onOpenActivity={() => toggleModal('activity')} 
        onOpenSearch={() => toggleModal('search')} 
        onOpenCreate={() => toggleModal('create')} 
        onOpenMenu={() => toggleModal('menu')} 
        theme={theme} 
      />

      {/* LEFT SIDEBAR */}
      <LeftSidebar 
        currentUser={currentUser}
        onOpenChat={() => toggleModal('chat')} 
        onOpenActivity={() => toggleModal('activity')} 
        onOpenSearch={() => toggleModal('search')} 
        onOpenCreate={() => toggleModal('create')} 
        onOpenSettings={() => toggleModal('settings')} 
        onOpenMore={() => toggleModal('more')} 
        onOpenAbout={() => toggleModal('about')}
        onNavigateHome={() => navigateTo('home')} 
        onNavigateExplore={() => navigateTo('explore')} 
        onNavigateProfile={() => navigateTo('profile')} 
        onNavigateReels={() => navigateTo('reels')} 
        activeTab={currentView} 
        theme={theme} 
      />

      {/* MAIN CONTENT */}
      <main className="w-full max-w-[1400px] mx-auto pt-20 md:pt-8 md:pl-[90px] lg:pl-[280px] transition-all duration-300">
        
        {currentView === 'home' && (
            <div className="flex justify-center xl:justify-between gap-0 xl:gap-16 px-0 md:px-4">
              <div className="w-full max-w-[470px] flex flex-col mx-auto xl:mx-0">
                
                <Stories theme={theme} currentUser={currentUser} />
                
                <div className="flex flex-col gap-6 pb-20">
                  {postsData.map((post) => (
                    <Post 
                      key={post.id} 
                      {...post} 
                      theme={theme}
                      isSavedExternal={savedPosts.some(p => p.id === post.id)}
                      onToggleSave={() => handleToggleSave(post)}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="hidden xl:block w-[350px] pt-4 mr-8">
                  <Sidebar theme={theme} currentUser={currentUser} onNavigateProfile={() => navigateTo('profile')} />
              </div>
            </div>
        )}

        {currentView === 'explore' && <ExploreSection theme={theme} />}

        {currentView === 'profile' && (
          <ProfileSection 
            theme={theme} 
            savedPosts={savedPosts} 
            user={currentUser} 
            allPosts={postsdata} 
          />
        )}

        {currentView === 'reels' && (
            <div className="flex justify-center w-full bg-black md:bg-transparent h-[calc(100vh-80px)] md:h-auto">
                <ReelSection theme={theme} />
            </div>
        )}
      </main>

      {/* MODALS */}
      {modals.chat && <ChatSection onClose={closeAll} theme={theme} />}
      {modals.activity && <ActivitySection onClose={closeAll} theme={theme} />}
      {modals.search && <SearchSection onClose={closeAll} theme={theme} />}
      {modals.create && <CreatePostModal onClose={closeAll} theme={theme} />}
      {modals.settings && <SettingsSection onClose={closeAll} theme={theme} onToggleTheme={toggleTheme} />}
      {modals.more && <MoreSection onClose={closeAll} theme={theme} />}
      {modals.about && <AboutHive onClose={closeAll} theme={theme} />}
      
      {modals.menu && (
        <MobileMenu 
          currentUser={currentUser}
          onClose={closeAll} 
          onNavigateProfile={() => navigateTo('profile')} 
          onOpenSettings={() => toggleModal('settings')} 
          onOpenMore={() => toggleModal('more')} 
          onOpenAbout={() => toggleModal('about')} 
          onToggleTheme={toggleTheme} 
          currentTheme={theme} 
        />
      )}
    </div>
  );
}

export default App;