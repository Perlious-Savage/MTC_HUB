
import { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

const gradeMapping: { [key: string]: number } = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0,
};

const GpaCalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    credits: '',
    grade: '',
  });
  const [totalCredits, setTotalCredits] = useState(0);
  const [cgpa, setCgpa] = useState(0);

  // Calculate CGPA whenever subjects change
  useEffect(() => {
    const credits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + (subject.credits * subject.gradePoints), 0);
    
    setTotalCredits(credits);
    setCgpa(credits > 0 ? totalGradePoints / credits : 0);
  }, [subjects]);

  const addSubject = () => {
    if (newSubject.name && newSubject.credits && newSubject.grade) {
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name,
        credits: parseInt(newSubject.credits),
        grade: newSubject.grade,
        gradePoints: gradeMapping[newSubject.grade],
      };
      setSubjects([...subjects, subject]);
      setNewSubject({ name: '', credits: '', grade: '' });
    }
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        const updatedSubject = { ...subject, [field]: value };
        if (field === 'grade') {
          updatedSubject.gradePoints = gradeMapping[value as string];
        }
        return updatedSubject;
      }
      return subject;
    }));
  };

  const getCgpaColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-400';
    if (cgpa >= 8) return 'text-blue-400';
    if (cgpa >= 7) return 'text-yellow-400';
    if (cgpa >= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  const getCgpaGrade = (cgpa: number) => {
    if (cgpa >= 9) return 'Outstanding';
    if (cgpa >= 8) return 'Excellent';
    if (cgpa >= 7) return 'Very Good';
    if (cgpa >= 6) return 'Good';
    if (cgpa >= 5) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">GPA Calculator</h2>
          <p className="text-gray-400 mt-1">Calculate your CGPA on a 10-point scale</p>
        </div>
      </div>

      {/* Add Subject Form */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Subject
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="bg-black border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              type="number"
              placeholder="Credits"
              value={newSubject.credits}
              onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
              className="bg-black border-gray-600 text-white placeholder-gray-400"
              min="1"
              max="10"
            />
            <Select
              value={newSubject.grade}
              onValueChange={(value) => setNewSubject({ ...newSubject, grade: value })}
            >
              <SelectTrigger className="bg-black border-gray-600 text-white">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {Object.keys(gradeMapping).map((grade) => (
                  <SelectItem key={grade} value={grade} className="text-white hover:bg-gray-700">
                    {grade} ({gradeMapping[grade]} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={addSubject} 
            className="bg-white text-black hover:bg-gray-200"
            disabled={!newSubject.name || !newSubject.credits || !newSubject.grade}
          >
            Add Subject
          </Button>
        </CardContent>
      </Card>

      {/* Subjects Table */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-8">
              <Calculator className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No subjects added yet. Add subjects to calculate your CGPA.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Subject</th>
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Credits</th>
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Grade</th>
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Grade Points</th>
                    <th className="text-left py-3 px-2 text-gray-300 font-medium">Total Points</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-2">
                        <Input
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          className="bg-transparent border-none text-white p-0 h-auto focus:ring-0"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <Input
                          type="number"
                          value={subject.credits}
                          onChange={(e) => updateSubject(subject.id, 'credits', parseInt(e.target.value) || 0)}
                          className="bg-transparent border-none text-white p-0 h-auto focus:ring-0 w-16"
                          min="1"
                          max="10"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <Select
                          value={subject.grade}
                          onValueChange={(value) => updateSubject(subject.id, 'grade', value)}
                        >
                          <SelectTrigger className="bg-transparent border-none text-white p-0 h-auto focus:ring-0 w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {Object.keys(gradeMapping).map((grade) => (
                              <SelectItem key={grade} value={grade} className="text-white hover:bg-gray-700">
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-2 text-gray-300">{subject.gradePoints}</td>
                      <td className="py-3 px-2 text-gray-300">{subject.credits * subject.gradePoints}</td>
                      <td className="py-3 px-2">
                        <Button
                          onClick={() => deleteSubject(subject.id)}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CGPA Summary */}
      {subjects.length > 0 && (
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Total Credits</p>
                <p className="text-2xl font-bold text-white">{totalCredits}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">CGPA</p>
                <p className={`text-3xl font-bold ${getCgpaColor(cgpa)}`}>
                  {cgpa.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Grade</p>
                <p className={`text-xl font-semibold ${getCgpaColor(cgpa)}`}>
                  {getCgpaGrade(cgpa)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GpaCalculator;
