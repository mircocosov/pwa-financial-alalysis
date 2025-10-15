import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Globe, Search, RefreshCw } from 'lucide-react';

const marketData = [
  { time: '09:30', sp500: 4420, nasdaq: 13750, dow: 34200 },
  { time: '10:00', sp500: 4425, nasdaq: 13780, dow: 34180 },
  { time: '10:30', sp500: 4415, nasdaq: 13760, dow: 34150 },
  { time: '11:00', sp500: 4435, nasdaq: 13800, dow: 34220 },
  { time: '11:30', sp500: 4445, nasdaq: 13820, dow: 34250 },
  { time: '12:00', sp500: 4440, nasdaq: 13810, dow: 34240 },
];

const topMovers = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 456.78, change: '+12.34', percent: '+2.78%' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 175.23, change: '+3.45', percent: '+2.01%' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 248.92, change: '+11.23', percent: '+4.72%' },
  { symbol: 'AMZN', name: 'Amazon.com', price: 142.33, change: '-2.34', percent: '-1.62%' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 138.45, change: '-1.67', percent: '-1.19%' },
];

const sectors = [
  { name: 'Technology', performance: '+2.4%', trend: 'up' },
  { name: 'Healthcare', performance: '+1.2%', trend: 'up' },
  { name: 'Financial', performance: '-0.8%', trend: 'down' },
  { name: 'Energy', performance: '+3.1%', trend: 'up' },
  { name: 'Consumer', performance: '-0.3%', trend: 'down' },
  { name: 'Industrial', performance: '+1.8%', trend: 'up' },
];

const volumeData = [
  { symbol: 'AAPL', volume: 45230000 },
  { symbol: 'TSLA', volume: 38450000 },
  { symbol: 'NVDA', volume: 32120000 },
  { symbol: 'MSFT', volume: 28900000 },
  { symbol: 'AMZN', volume: 25670000 },
];

export function MarketAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Market Analysis</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search size={16} className="mr-2" />
            Search
          </Button>
          <Button size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'S&P 500', value: '4,440.25', change: '+0.45%', trend: 'up' },
          { name: 'NASDAQ', value: '13,810.33', change: '+0.62%', trend: 'up' },
          { name: 'Dow Jones', value: '34,240.18', change: '+0.12%', trend: 'up' },
        ].map((index_item, index) => (
          <motion.div
            key={index_item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: index * 0.1 }
            }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{index_item.name}</p>
                    <p className="text-xl font-bold">{index_item.value}</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={`${
                      index_item.trend === 'up' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}
                  >
                    {index_item.trend === 'up' ? (
                      <TrendingUp size={12} className="mr-1" />
                    ) : (
                      <TrendingDown size={12} className="mr-1" />
                    )}
                    {index_item.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Market Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Intraday Market Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sp500" stroke="#FFD700" strokeWidth={2} name="S&P 500" />
                <Line type="monotone" dataKey="nasdaq" stroke="#000000" strokeWidth={2} name="NASDAQ" />
                <Line type="monotone" dataKey="dow" stroke="#666666" strokeWidth={2} name="Dow Jones" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Movers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMovers.map((stock, index) => (
                    <motion.tr
                      key={stock.symbol}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.5 + index * 0.05 }
                      }}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${stock.price}</TableCell>
                      <TableCell className="text-right">
                        <div className={`${
                          stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <p className="font-medium">{stock.change}</p>
                          <p className="text-xs">{stock.percent}</p>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sector Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sectors.map((sector, index) => (
                  <motion.div
                    key={sector.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.6 + index * 0.05 }
                    }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <span className="font-medium">{sector.name}</span>
                    <div className={`flex items-center gap-2 ${
                      sector.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {sector.trend === 'up' ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="font-medium">{sector.performance}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Volume Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Volume']} />
                <Bar dataKey="volume" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}