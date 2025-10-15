import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';

const performanceData = [
  { month: 'Jan', portfolio: 8.2, benchmark: 6.5 },
  { month: 'Feb', portfolio: 12.1, benchmark: 9.3 },
  { month: 'Mar', portfolio: 6.8, benchmark: 7.1 },
  { month: 'Apr', portfolio: 15.3, benchmark: 11.2 },
  { month: 'May', portfolio: 9.7, benchmark: 8.9 },
  { month: 'Jun', portfolio: 11.4, benchmark: 10.1 },
];

const riskData = [
  { category: 'Low Risk', value: 35, color: '#22C55E' },
  { category: 'Medium Risk', value: 45, color: '#FFD700' },
  { category: 'High Risk', value: 20, color: '#EF4444' },
];

const dividendData = [
  { month: 'Jan', dividends: 245 },
  { month: 'Feb', dividends: 320 },
  { month: 'Mar', dividends: 180 },
  { month: 'Apr', dividends: 290 },
  { month: 'May', dividends: 380 },
  { month: 'Jun', dividends: 425 },
];

const reports = [
  { title: 'Monthly Performance Report', date: 'June 2024', status: 'completed', type: 'performance' },
  { title: 'Risk Assessment Analysis', date: 'May 2024', status: 'completed', type: 'risk' },
  { title: 'Tax Loss Harvesting', date: 'Q2 2024', status: 'pending', type: 'tax' },
  { title: 'Asset Allocation Review', date: 'April 2024', status: 'completed', type: 'allocation' },
];

export function Reports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 sm:p-6 pb-20 lg:pb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-foreground">Отчеты</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border text-foreground text-xs sm:text-sm">
            <Calendar size={14} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Период</span>
          </Button>
          <Button size="sm" className="bg-primary text-black hover:bg-primary/90 text-xs sm:text-sm">
            <Download size={14} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Экспорт</span>
          </Button>
        </div>
      </div>

      {/* Report Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="performance" className="space-y-6">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <TabsList className="grid w-full grid-cols-4 min-w-[600px] sm:min-w-0">
              <TabsTrigger value="performance" className="text-xs sm:text-sm">Производ.</TabsTrigger>
              <TabsTrigger value="risk" className="text-xs sm:text-sm">Риски</TabsTrigger>
              <TabsTrigger value="income" className="text-xs sm:text-sm">Доход</TabsTrigger>
              <TabsTrigger value="generated" className="text-xs sm:text-sm">Отчеты</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <TrendingUp size={20} className="text-primary" />
                    Портфель vs бенчмарк
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[350px]">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} className="sm:text-xs" />
                      <YAxis tick={{ fontSize: 10 }} className="sm:text-xs" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Return']} contentStyle={{ fontSize: '12px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        stroke="#FFD700" 
                        strokeWidth={2}
                        name="Portfolio"
                        className="sm:stroke-[3px]"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#9CA3AF" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="S&P 500"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'YTD Return', value: '+12.8%', benchmark: '+9.4%' },
                { title: 'Sharpe Ratio', value: '1.42', benchmark: '1.18' },
                { title: 'Max Drawdown', value: '-3.2%', benchmark: '-5.1%' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.3 + index * 0.1 }
                  }}
                >
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-lg sm:text-2xl text-green-500">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">vs {metric.benchmark}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">Распределение рисков</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">Метрики риска</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { metric: 'Portfolio Beta', value: '0.85', status: 'good' },
                        { metric: 'Value at Risk (95%)', value: '-2.1%', status: 'warning' },
                        { metric: 'Volatility', value: '14.2%', status: 'good' },
                        { metric: 'Correlation to Market', value: '0.78', status: 'neutral' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.metric}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.4 + index * 0.1 }
                          }}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <span className="text-foreground">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-foreground">{item.value}</span>
                            <Badge 
                              variant="secondary"
                              className={`${
                                item.status === 'good' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                                item.status === 'warning' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                                'bg-muted text-foreground'
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Dividend Income Trend</CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                    <BarChart data={dividendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} className="sm:text-xs" />
                      <YAxis tick={{ fontSize: 10 }} className="sm:text-xs" />
                      <Tooltip formatter={(value) => [`${value}`, 'Dividends']} contentStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="dividends" fill="#FFD700" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'YTD Dividends', value: '$2,140' },
                { title: 'Dividend Yield', value: '3.2%' },
                { title: 'Growth Rate', value: '+8.5%' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.3 + index * 0.1 }
                  }}
                >
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-lg sm:text-2xl font-bold">{metric.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="generated" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report, index) => (
                      <motion.div
                        key={report.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.3 + index * 0.1 }
                        }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={report.status === 'completed' ? 'default' : 'secondary'}
                            className={report.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          >
                            {report.status}
                          </Badge>
                          {report.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <Download size={14} className="mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
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