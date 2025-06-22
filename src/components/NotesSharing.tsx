
import { ExternalLink, FolderOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Semester {
  id: number;
  name: string;
  driveLink: string;
}

const NotesSharing = () => {
  const [expandedSemesters, setExpandedSemesters] = useState<number[]>([]);

  // Placeholder Google Drive links - to be replaced manually
  const semesters: Semester[] = [
    { id: 1, name: 'Semester 1', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-1' },
    { id: 2, name: 'Semester 2', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-2' },
    { id: 3, name: 'Semester 3', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-3' },
    { id: 4, name: 'Semester 4', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-4' },
    { id: 5, name: 'Semester 5', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-5' },
    { id: 6, name: 'Semester 6', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-6' },
    { id: 7, name: 'Semester 7', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-7' },
    { id: 8, name: 'Semester 8', driveLink: 'https://drive.google.com/drive/folders/placeholder-semester-8' },
  ];

  const toggleSemester = (semesterId: number) => {
    setExpandedSemesters(prev => 
      prev.includes(semesterId) 
        ? prev.filter(id => id !== semesterId)
        : [...prev, semesterId]
    );
  };

  const openDriveFolder = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Notes Sharing</h2>
        <p className="text-gray-400 mt-1">Access semester-wise notes and study materials</p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-900/20 border-blue-700/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <FolderOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-300 font-medium">Shared Study Resources</p>
              <p className="text-blue-200/80 text-sm mt-1">
                All notes and materials are stored in Google Drive folders. Click on any semester to access the shared resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semesters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {semesters.map((semester) => {
          const isExpanded = expandedSemesters.includes(semester.id);
          return (
            <Card 
              key={semester.id} 
              className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-[1.02]"
            >
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSemester(semester.id)}
              >
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{semester.id}</span>
                    </div>
                    <span>{semester.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </CardTitle>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0 animate-fade-in">
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm">
                      Access notes, assignments, and study materials for {semester.name}.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => openDriveFolder(semester.driveLink)}
                        className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>Open Drive Folder</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => navigator.clipboard.writeText(semester.driveLink)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Copy Link
                      </Button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-1">Direct Link:</p>
                      <p className="text-xs text-gray-300 font-mono break-all">
                        {semester.driveLink}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Instructions */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-300">
              Click on any semester card to expand and view the Google Drive folder link.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-300">
              Click "Open Drive Folder" to access the shared notes and materials in a new tab.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-300">
              Use "Copy Link" to share the folder link with your classmates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesSharing;
