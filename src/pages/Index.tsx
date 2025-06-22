
import { useState } from 'react';
import { Calendar, Calculator, FileText, Menu, X, Home as HomeIcon } from 'lucide-react';
import Home from '../components/Home';
import DeadlineTracker from '../components/DeadlineTracker';
import GpaCalculator from '../components/GpaCalculator';
import NotesSharing from '../components/NotesSharing';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'deadlines', label: 'Deadline Tracker', icon: Calendar },
    { id: 'gpa', label: 'GPA Calculator', icon: Calculator },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'deadlines':
        return <DeadlineTracker />;
      case 'gpa':
        return <GpaCalculator />;
      case 'notes':
        return <NotesSharing />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/9b601f8a-77ac-49b9-8d85-b4bb0fb1ecdd.png" 
                alt="MTC Logo" 
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-xl font-bold text-white">MTC Hub</h1>
                <p className="text-xs text-gray-400">Microsoft Tech Club</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
