import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  User, 
  Award, 
  TrendingUp, 
  Calendar, 
  Target, 
  Star,
  Edit,
  Camera,
  MapPin,
  Briefcase
} from 'lucide-react';

const performanceHistory = [
  { month: 'Jan', return: 8.2 },
  { month: 'Feb', return: 12.1 },
  { month: 'Mar', return: 6.8 },
  { month: 'Apr', return: 15.3 },
  { month: 'May', return: 9.7 },
  { month: 'Jun', return: 11.4 },
];

const skillsData = [
  { skill: 'Risk Management', level: 85, color: '#FFD700' },
  { skill: 'Market Analysis', level: 72, color: '#000000' },
  { skill: 'Diversification', level: 90, color: '#666666' },
  { skill: 'Technical Analysis', level: 68, color: '#999999' },
];

const achievements = [
  { title: 'First Investment', date: 'Jan 2020', icon: Star },
  { title: 'Consistent Performer', date: 'Mar 2022', icon: TrendingUp },
  { title: 'Risk Manager', date: 'Dec 2022', icon: Award },
  { title: 'Dividend Master', date: 'Jun 2023', icon: Target },
];

const goals = [
  { title: 'Retirement Fund', target: 500000, current: 65420, progress: 13 },
  { title: 'Emergency Fund', target: 25000, current: 18500, progress: 74 },
  { title: 'House Down Payment', target: 100000, current: 32000, progress: 32 },
];

export function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Profile</h1>
        <Button>
          <Edit size={16} className="mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera size={14} />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Conservative Growth Investor</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    New York, NY
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} />
                    Software Engineer
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    Member since Jan 2020
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Verified Investor
                  </Badge>
                  <Badge variant="outline">
                    Level 3 Trader
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    4.8★ Risk Score
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-sm text-muted-foreground">Months Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Positions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">+15.3%</p>
                  <p className="text-sm text-muted-foreground">Total Return</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Performance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                  <Line 
                    type="monotone" 
                    dataKey="return" 
                    stroke="#FFD700" 
                    strokeWidth={3}
                    dot={{ fill: '#FFD700', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Investment Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={20} />
                Investment Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.4 + index * 0.1 }
                    }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: 0.5 + index * 0.1 }
                    }}
                    className="flex flex-col items-center p-4 rounded-lg border text-center hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-3">
                      <Icon size={20} className="text-accent-foreground" />
                    </div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.7 + index * 0.1 }
                  }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{goal.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{goal.progress}% complete</span>
                    <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+$1,234</p>
                <p className="text-sm text-muted-foreground">This Month's Gains</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Trades This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}