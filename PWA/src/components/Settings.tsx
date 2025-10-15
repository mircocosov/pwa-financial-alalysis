import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Bell, Shield, Palette, Database, User, CreditCard } from 'lucide-react';

export function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 sm:p-6 pb-20 lg:pb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-foreground">Настройки</h1>
        <Button className="bg-primary text-black hover:bg-primary/90 text-sm sm:text-base">Сохранить</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="account" className="space-y-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <TabsList className="grid w-full grid-cols-5 min-w-[600px] sm:min-w-0">
              <TabsTrigger value="account" className="text-xs sm:text-sm">Аккаунт</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">Уведом.</TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm">Безопас.</TabsTrigger>
              <TabsTrigger value="preferences" className="text-xs sm:text-sm">Настр.</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs sm:text-sm">Оплата</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="bio">Investment Bio</Label>
                    <Input 
                      id="bio" 
                      defaultValue="Conservative long-term investor focused on dividend growth" 
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={20} />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { title: 'Price Alerts', description: 'Get notified when stocks reach target prices', enabled: true },
                    { title: 'Market News', description: 'Receive important market updates and news', enabled: true },
                    { title: 'Portfolio Updates', description: 'Daily portfolio performance summaries', enabled: false },
                    { title: 'Dividend Payments', description: 'Notifications for upcoming dividend payments', enabled: true },
                    { title: 'Risk Alerts', description: 'Warnings when portfolio risk exceeds limits', enabled: true },
                    { title: 'Research Reports', description: 'New analyst reports and recommendations', enabled: false },
                  ].map((notification, index) => (
                    <motion.div
                      key={notification.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.3 + index * 0.1 }
                      }}
                      className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base">{notification.title}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.enabled} className="flex-shrink-0" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield size={20} />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">SMS Authentication</p>
                        <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Use Google Authenticator or similar</p>
                      </div>
                      <Button variant="outline" size="sm">Setup</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Session Management</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-muted-foreground">iPhone • Last active 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">Revoke</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette size={20} />
                    App Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Display Options</h3>
                    {[
                      { title: 'Dark Mode', description: 'Use dark theme for better viewing', enabled: false },
                      { title: 'Compact View', description: 'Show more data in less space', enabled: true },
                      { title: 'Real-time Updates', description: 'Live price updates (may affect performance)', enabled: true },
                      { title: 'Animation Effects', description: 'Enable smooth transitions and animations', enabled: true },
                    ].map((option, index) => (
                      <motion.div
                        key={option.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.3 + index * 0.1 }
                        }}
                        className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base">{option.title}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{option.description}</p>
                        </div>
                        <Switch defaultChecked={option.enabled} className="flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard size={20} />
                    Billing & Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Professional Plan</h3>
                        <p className="text-sm text-muted-foreground">Advanced analytics and unlimited portfolios</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold">$29.99/month</span>
                      <Button variant="outline">Manage Plan</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-primary rounded flex items-center justify-center">
                          <span className="text-xs text-primary-foreground font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: 'Jun 1, 2024', amount: '$29.99', status: 'Paid' },
                        { date: 'May 1, 2024', amount: '$29.99', status: 'Paid' },
                        { date: 'Apr 1, 2024', amount: '$29.99', status: 'Paid' },
                      ].map((bill, index) => (
                        <motion.div
                          key={bill.date}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: 0.3 + index * 0.1 }
                          }}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">{bill.date}</p>
                            <p className="text-sm text-muted-foreground">Professional Plan</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{bill.amount}</span>
                            <Badge 
                              variant="secondary" 
                              className="bg-green-100 text-green-800 border-green-200"
                            >
                              {bill.status}
                            </Badge>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}