import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Badge } from './ui/badge'
import {
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
} from 'lucide-react'
// Simple date formatter to avoid dependencies
const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getFullYear()}`
}

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: Date
  icon: string
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Зарплата',
    amount: 85000,
    description: 'Основная зарплата',
    date: new Date(2024, 11, 15),
    icon: '💼',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Продукты',
    amount: 12500,
    description: 'Покупки в супермаркете',
    date: new Date(2024, 11, 14),
    icon: '🛒',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Транспорт',
    amount: 3200,
    description: 'Метро и автобус',
    date: new Date(2024, 11, 13),
    icon: '🚇',
  },
  {
    id: '4',
    type: 'income',
    category: 'Фриланс',
    amount: 25000,
    description: 'Веб-разработка',
    date: new Date(2024, 11, 12),
    icon: '💻',
  },
  {
    id: '5',
    type: 'expense',
    category: 'Развлечения',
    amount: 8000,
    description: 'Кино и ресторан',
    date: new Date(2024, 11, 11),
    icon: '🎬',
  },
  {
    id: '6',
    type: 'expense',
    category: 'Коммунальные',
    amount: 15000,
    description: 'Электричество и интернет',
    date: new Date(2024, 11, 10),
    icon: '🏠',
  },
  {
    id: '7',
    type: 'income',
    category: 'Инвестиции',
    amount: 5400,
    description: 'Дивиденды',
    date: new Date(2024, 11, 9),
    icon: '📈',
  },
  {
    id: '8',
    type: 'expense',
    category: 'Здоровье',
    amount: 4500,
    description: 'Лекарства',
    date: new Date(2024, 11, 8),
    icon: '💊',
  },
]

const categories = [
  'Все',
  'Зарплата',
  'Фриланс',
  'Инвестиции',
  'Продукты',
  'Транспорт',
  'Развлечения',
  'Коммунальные',
  'Здоровье',
]

export function Transactions() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedType, setSelectedType] = useState('all')
  const [transactions] = useState(mockTransactions)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'Все' || transaction.category === selectedCategory
      const matchesType =
        selectedType === 'all' || transaction.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })
  }, [transactions, searchQuery, selectedCategory, selectedType])

  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-20 lg:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl"
        >
          Транзакции
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        ></motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Доходы
                </p>
                <p className="text-lg sm:text-2xl font-bold text-green-500">
                  {totalIncome.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Расходы
                </p>
                <p className="text-lg sm:text-2xl font-bold text-red-500">
                  {totalExpense.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Баланс
                </p>
                <p
                  className={`text-lg sm:text-2xl font-bold ${
                    totalIncome - totalExpense >= 0
                      ? 'text-primary'
                      : 'text-red-500'
                  }`}
                >
                  {(totalIncome - totalExpense).toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                  totalIncome - totalExpense >= 0
                    ? 'bg-primary/20'
                    : 'bg-red-500/20'
                }`}
              >
                <span className="text-base sm:text-lg">
                  {totalIncome - totalExpense >= 0 ? '📈' : '📉'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск транзакций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="income">Доходы</SelectItem>
            <SelectItem value="expense">Расходы</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Список транзакций
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence mode="popLayout">
            {filteredTransactions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center text-muted-foreground"
              >
                <p>Транзакции не найдены</p>
              </motion.div>
            ) : (
              <div className="divide-y divide-border">
                {filteredTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 sm:p-4 flex items-center justify-between hover:bg-accent/5 transition-colors group gap-2"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                        {transaction.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                          <Badge
                            variant={
                              transaction.type === 'income'
                                ? 'default'
                                : 'secondary'
                            }
                            className="text-xs"
                          >
                            {transaction.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(transaction.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <span
                        className={`font-bold text-sm sm:text-base whitespace-nowrap ${
                          transaction.type === 'income'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString('ru-RU')} ₽
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded hidden sm:block"
                        title="Удалить"
                      >
                        ❌
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
