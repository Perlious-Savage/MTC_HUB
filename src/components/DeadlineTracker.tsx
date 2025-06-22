
import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  daysLeft: number;
}

const DeadlineTracker = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState({
    subject: '',
    title: '',
    dueDate: '',
  });
  const [showForm, setShowForm] = useState(false);

  // Calculate days left for each assignment
  const calculateDaysLeft = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Update assignments with current days left
  useEffect(() => {
    const interval = setInterval(() => {
      setAssignments(prev => 
        prev.map(assignment => ({
          ...assignment,
          daysLeft: calculateDaysLeft(assignment.dueDate)
        }))
      );
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const addAssignment = () => {
    if (newAssignment.subject && newAssignment.title && newAssignment.dueDate) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        ...newAssignment,
        daysLeft: calculateDaysLeft(newAssignment.dueDate),
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ subject: '', title: '', dueDate: '' });
      setShowForm(false);
    }
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const getPriorityColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'border-red-500 bg-red-500/10';
    if (daysLeft <= 3) return 'border-orange-500 bg-orange-500/10';
    if (daysLeft <= 7) return 'border-yellow-500 bg-yellow-500/10';
    return 'border-gray-700 bg-gray-900/50';
  };

  const getPriorityIcon = (daysLeft: number) => {
    if (daysLeft <= 3) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  const sortedAssignments = [...assignments].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Deadline Tracker</h2>
          <p className="text-gray-400 mt-1">Keep track of your assignments and deadlines</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-white text-black hover:bg-gray-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      {/* Add Assignment Form */}
      {showForm && (
        <Card className="bg-gray-900 border-gray-700 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white">Add New Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Subject"
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                className="bg-black border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Assignment Title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="bg-black border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Input
              type="date"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
              className="bg-black border-gray-600 text-white"
            />
            <div className="flex space-x-3">
              <Button onClick={addAssignment} className="bg-white text-black hover:bg-gray-200">
                Add Assignment
              </Button>
              <Button 
                onClick={() => setShowForm(false)} 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {sortedAssignments.length === 0 ? (
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">No assignments yet. Add one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          sortedAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className={`transition-all duration-200 hover:scale-[1.02] ${getPriorityColor(assignment.daysLeft)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getPriorityIcon(assignment.daysLeft)}
                      <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-1">{assignment.subject}</p>
                    <p className="text-sm text-gray-400">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        assignment.daysLeft < 0 ? 'text-red-400' :
                        assignment.daysLeft <= 3 ? 'text-orange-400' :
                        assignment.daysLeft <= 7 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {assignment.daysLeft < 0 ? 'Overdue' : `${assignment.daysLeft} days`}
                      </p>
                      <p className="text-sm text-gray-400">
                        {assignment.daysLeft < 0 ? 'Past due' : 'remaining'}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteAssignment(assignment.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DeadlineTracker;
