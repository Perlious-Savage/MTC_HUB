
import { Calendar, Calculator, FileText, Users, BookOpen, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home = ({ setActiveTab }: HomeProps) => {
  const features = [
    {
      icon: Calendar,
      title: 'Deadline Tracker',
      description: 'Never miss an assignment deadline again. Track all your submissions with smart reminders.',
      color: 'bg-blue-900/20 border-blue-700/50',
      iconColor: 'text-blue-400',
      tabId: 'deadlines'
    },
    {
      icon: Calculator,
      title: 'GPA Calculator',
      description: 'Calculate your CGPA on a 10-point scale. Add subjects dynamically and track your academic progress.',
      color: 'bg-green-900/20 border-green-700/50',
      iconColor: 'text-green-400',
      tabId: 'gpa'
    },
    {
      icon: FileText,
      title: 'Notes Sharing',
      description: 'Access semester-wise study materials and notes shared by the MTC community.',
      color: 'bg-purple-900/20 border-purple-700/50',
      iconColor: 'text-purple-400',
      tabId: 'notes'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '500+', icon: Users },
    { label: 'Study Resources', value: '1000+', icon: BookOpen },
    { label: 'Success Rate', value: '95%', icon: Trophy }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <img 
            src="/lovable-uploads/9b601f8a-77ac-49b9-8d85-b4bb0fb1ecdd.png" 
            alt="MTC Logo" 
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome to MTC Hub
            </h1>
            <p className="text-xl text-gray-400 mt-2">Microsoft Tech Club</p>
          </div>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your all-in-one student productivity platform. Track deadlines, calculate GPA, 
          and access shared study resources - all in one place.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900 border-gray-700 text-center">
              <CardContent className="p-6">
                <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`${feature.color} hover:scale-105 transition-transform duration-200 cursor-pointer`}
                onClick={() => setActiveTab(feature.tabId)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                  <p className="text-sm text-gray-400 mt-2">Click to access →</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-center">Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                1
              </div>
              <h3 className="text-white font-medium">Track Deadlines</h3>
              <p className="text-gray-400 text-sm">Add your assignments and never miss a due date</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                2
              </div>
              <h3 className="text-white font-medium">Calculate GPA</h3>
              <p className="text-gray-400 text-sm">Monitor your academic performance with ease</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                3
              </div>
              <h3 className="text-white font-medium">Access Notes</h3>
              <p className="text-gray-400 text-sm">Browse semester-wise study materials</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center bg-white/5 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-2">Ready to boost your productivity?</h3>
        <p className="text-gray-400 mb-4">
          Start using MTC Hub today and join hundreds of successful students
        </p>
        <p className="text-sm text-gray-500">
          Use the navigation above to get started with any feature
        </p>
      </div>
    </div>
  );
};

export default Home;
