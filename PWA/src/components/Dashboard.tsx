import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, DollarSign, Activity, Plus } from 'lucide-react';
// Simple date formatter to avoid dependencies
const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

interface DashboardProps {
  onAddTransaction: () => void;
}

// Mock data
const capitalData = [
  { name: 'Янв', value: 450000 },
  { name: 'Фев', value: 470000 },
  { name: 'Мар', value: 462000 },
  { name: 'Апр', value: 485000 },
  { name: 'Май', value: 508000 },
  { name: 'Июн', value: 525000 },
  { name: 'Июл', value: 540000 },
  { name: 'Авг', value: 558000 },
  { name: 'Сен', value: 571000 },
  { name: 'Окт', value: 585000 },
  { name: 'Ноя', value: 602000 },
  { name: 'Дек', value: 625000 },
];

const stats = [
  { 
    title: 'Общий капитал', 
    value: '625 000 ₽', 
    change: '+12.5%', 
    trend: 'up',
    icon: Wallet,
    description: 'Общая стоимость активов'
  },
  { 
    title: 'Доходы (мес.)', 
    value: '95 400 ₽', 
    change: '+5.2%', 
    trend: 'up',
    icon: TrendingUp,
    description: 'Доходы за текущий месяц'
  },
  { 
    title: 'Расходы (мес.)', 
    value: '73 250 ₽', 
    change: '+2.8%', 
    trend: 'up',
    icon: TrendingDown,
    description: 'Расходы за текущий месяц'
  },
  { 
    title: 'Итог', 
    value: '+22 150 ₽', 
    change: '+8.4%', 
    trend: 'up',
    icon: DollarSign,
    description: 'Разница доходы-расходы'
  },
];

const recentTransactions = [
  { 
    id: '1',
    description: 'Основная зарплата', 
    category: 'Зарплата',
    amount: 85000,
    type: 'income',
    date: new Date(2024, 11, 15),
    icon: '💼'
  },
  { 
    id: '2',
    description: 'Покупки в Ашане', 
    category: 'Продукты',
    amount: -12500,
    type: 'expense',
    date: new Date(2024, 11, 14),
    icon: '🛒'
  },
  { 
    id: '3',
    description: 'Пополнение карты Тройка', 
    category: 'Транспорт',
    amount: -3200,
    type: 'expense',
    date: new Date(2024, 11, 13),
    icon: '🚇'
  },
  { 
    id: '4',
    description: 'Веб-разработка', 
    category: 'Фриланс',
    amount: 25000,
    type: 'income',
    date: new Date(2024, 11, 12),
    icon: '💻'
  },
  { 
    id: '5',
    description: 'Кино и ужин', 
    category: 'Развлечения',
    amount: -8000,
    type: 'expense',
    date: new Date(2024, 11, 11),
    icon: '🎬'
  },
];

export function Dashboard({ onAddTransaction }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6 pb-20 lg:pb-6" // Extra padding for mobile navigation
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl"
          >
            Привет! 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1 text-sm sm:text-base"
          >
            Обзор ваших финансов
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0"
        >
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
            <Activity size={12} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Обновлено </span>сейчас
          </Badge>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 + 0.3 }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs sm:text-sm text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon size={16} className="text-primary sm:w-5 sm:h-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg sm:text-2xl font-bold truncate">{stat.value}</span>
                      <div className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
                        stat.trend === 'up' 
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                          : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp size={10} className="sm:w-3 sm:h-3" /> : <TrendingDown size={10} className="sm:w-3 sm:h-3" />}
                        <span className="whitespace-nowrap">{stat.change}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Capital Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Динамика капитала
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={capitalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 10 }}
                  className="sm:text-xs"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 10 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  className="sm:text-xs"
                />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toLocaleString('ru-RU')} ₽`, 'Капитал']}
                  labelStyle={{ color: 'var(--foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FFD700" 
                  strokeWidth={2}
                  dot={{ fill: '#FFD700', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: '#FFD700' }}
                  className="sm:stroke-[3px]"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Последние транзакции</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary" onClick={onAddTransaction}>
                Все транзакции →
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.9 + index * 0.05 }
                  }}
                  className="flex items-center justify-between p-3 sm:p-4 hover:bg-accent/5 transition-colors group gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                      {transaction.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className={`font-bold text-sm sm:text-base whitespace-nowrap ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating Action Button - Desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden lg:block fixed bottom-8 right-8 z-40"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          <Button
            onClick={onAddTransaction}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus size={24} />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}