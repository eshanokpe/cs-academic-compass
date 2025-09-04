import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Home</h1>
          <Button onClick={handleLogout} variant="outline">
            Sign Out
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Welcome to your application dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have successfully authenticated with Firebase! This is your protected home page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;