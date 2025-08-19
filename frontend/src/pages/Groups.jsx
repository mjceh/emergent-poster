import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Clock,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockGroups } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('members');
  const { toast } = useToast();

  const filteredGroups = mockGroups
    .filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || 
        (filter === 'joined' && group.joined) || 
        (filter === 'available' && !group.joined);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'members') return b.members - a.members;
      if (sortBy === 'activity') {
        const activityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return activityOrder[b.activity] - activityOrder[a.activity];
      }
      return a.name.localeCompare(b.name);
    });

  const handleJoinGroup = (groupId) => {
    toast({
      title: "Group Joined",
      description: "Successfully joined the group!",
    });
  };

  const handleLeaveGroup = (groupId) => {
    toast({
      title: "Group Left",
      description: "Successfully left the group.",
    });
  };

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Management</h1>
          <p className="text-gray-600">Discover and manage Facebook groups for your posting campaigns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Joined Groups</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockGroups.filter(g => g.joined).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Groups</CardTitle>
              <Plus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockGroups.filter(g => !g.joined).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {mockGroups.filter(g => g.joined).reduce((sum, g) => sum + g.members, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Activity</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {mockGroups.filter(g => g.activity === 'High').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="joined">Joined Groups</SelectItem>
                  <SelectItem value="available">Available Groups</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="members">Members Count</SelectItem>
                  <SelectItem value="activity">Activity Level</SelectItem>
                  <SelectItem value="name">Group Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {group.members.toLocaleString()}
                      </div>
                      <Badge className={getActivityColor(group.activity)}>
                        {group.activity}
                      </Badge>
                    </div>
                  </div>
                  {group.joined && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Badge variant="outline" className="mr-2">
                      {group.type}
                    </Badge>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last post: {group.lastPost}</span>
                  </div>

                  <div className="flex space-x-2">
                    {group.joined ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleLeaveGroup(group.id)}
                          className="flex-1"
                        >
                          Leave Group
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => handleJoinGroup(group.id)} 
                        className="w-full"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Join Group
                      </Button>
                    )}
                  </div>

                  {group.activity === 'High' && (
                    <div className="flex items-center text-xs text-green-600 bg-green-50 p-2 rounded">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      High engagement potential
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms or filters.' : 'No groups available with the current filter settings.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Groups;