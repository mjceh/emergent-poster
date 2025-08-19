import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  Plus, 
  FileText, 
  Image, 
  Video, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Calendar
} from 'lucide-react';
import { mockContent } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const Content = () => {
  const [contents, setContents] = useState(mockContent);
  const [filter, setFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newContent, setNewContent] = useState({
    type: 'text',
    title: '',
    content: '',
    description: ''
  });
  const { toast } = useToast();

  const filteredContents = contents.filter(content => 
    filter === 'all' || content.type === filter
  );

  const handleCreateContent = () => {
    if (!newContent.title || !newContent.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const content = {
      id: `content_${Date.now()}`,
      ...newContent,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };

    setContents([content, ...contents]);
    setNewContent({ type: 'text', title: '', content: '', description: '' });
    setIsCreateOpen(false);

    toast({
      title: "Success",
      description: "Content created successfully!",
    });
  };

  const handleCopyContent = (content) => {
    navigator.clipboard.writeText(content.content);
    toast({
      title: "Copied",
      description: "Content copied to clipboard!",
    });
  };

  const handleDeleteContent = (id) => {
    setContents(contents.filter(c => c.id !== id));
    toast({
      title: "Deleted",
      description: "Content deleted successfully!",
    });
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'text': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'text': return 'text-blue-600 bg-blue-100';
      case 'image': return 'text-green-600 bg-green-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
            <p className="text-gray-600">Manage your reusable content templates</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
                <DialogDescription>
                  Add a new content template to your library
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select 
                    value={newContent.type} 
                    onValueChange={(value) => setNewContent({...newContent, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Post</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                    placeholder="Enter content title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">
                    {newContent.type === 'text' ? 'Content' : 'URL'}
                  </Label>
                  {newContent.type === 'text' ? (
                    <Textarea
                      id="content"
                      value={newContent.content}
                      onChange={(e) => setNewContent({...newContent, content: e.target.value})}
                      placeholder="Enter your content..."
                      rows={4}
                    />
                  ) : (
                    <Input
                      id="content"
                      value={newContent.content}
                      onChange={(e) => setNewContent({...newContent, content: e.target.value})}
                      placeholder={`Enter ${newContent.type} URL`}
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={newContent.description}
                    onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                    placeholder="Brief description..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateContent}>Create Content</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contents.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Text Posts</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {contents.filter(c => c.type === 'text').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Images</CardTitle>
              <Image className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {contents.filter(c => c.type === 'image').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos</CardTitle>
              <Video className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {contents.filter(c => c.type === 'video').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Content
              </Button>
              <Button 
                variant={filter === 'text' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('text')}
              >
                <FileText className="h-4 w-4 mr-1" />
                Text
              </Button>
              <Button 
                variant={filter === 'image' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('image')}
              >
                <Image className="h-4 w-4 mr-1" />
                Images
              </Button>
              <Button 
                variant={filter === 'video' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('video')}
              >
                <Video className="h-4 w-4 mr-1" />
                Videos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => {
            const IconComponent = getContentIcon(content.type);
            
            return (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <CardTitle className="text-lg truncate">{content.title}</CardTitle>
                    </div>
                    <Badge className={getTypeColor(content.type)}>
                      {content.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {content.type === 'text' ? (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {content.content}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {content.type === 'image' && (
                          <img 
                            src={content.content} 
                            alt={content.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                        {content.description && (
                          <p className="text-sm text-gray-600">{content.description}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Used {content.usageCount} times</span>
                      <span>Created {content.createdAt}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleCopyContent(content)}>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Use
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteContent(content.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600 mb-4">
                Create your first content template to get started.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Content;