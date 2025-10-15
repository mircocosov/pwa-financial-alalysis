import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { TrendingUp, TrendingDown, Plus, Filter } from 'lucide-react'

const holdings = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 150,
    price: 175.23,
    change: '+2.34%',
    value: 26284.5,
    allocation: '25.2%',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 75,
    price: 138.45,
    change: '-1.12%',
    value: 10383.75,
    allocation: '15.8%',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    shares: 100,
    price: 334.78,
    change: '+0.89%',
    value: 33478.0,
    allocation: '32.1%',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 50,
    price: 248.92,
    change: '+5.67%',
    value: 12446.0,
    allocation: '11.9%',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 25,
    price: 142.33,
    change: '-0.45%',
    value: 3558.25,
    allocation: '3.4%',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    shares: 40,
    price: 456.78,
    change: '+3.21%',
    value: 18271.2,
    allocation: '17.5%',
  },
]

export function Portfolio() {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 sm:p-6 pb-20 lg:pb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl text-foreground">Портфель</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground text-xs sm:text-sm"
          >
            <Filter size={14} className="mr-1 sm:mr-2" />
            Фильтр
          </Button>
          <Button
            size="sm"
            className="bg-primary text-black hover:bg-primary/90 text-xs sm:text-sm"
          >
            <Plus size={14} className="mr-1 sm:mr-2" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Сводка портфеля</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Общая стоимость</p>
                <p className="text-2xl text-foreground">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Изменение за день
                </p>
                <p className="text-2xl text-green-500">+$1,234.56</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Общая доходность
                </p>
                <p className="text-2xl text-green-500">+15.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-foreground text-base sm:text-lg">
              Активы
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <Table className="w-full table-auto border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-foreground text-xs sm:text-sm">
                      Символ
                    </TableHead>
                    <TableHead className="text-foreground text-xs sm:text-sm">
                      Компания
                    </TableHead>
                    <TableHead className="text-right text-foreground text-xs sm:text-sm">
                      Акции
                    </TableHead>
                    <TableHead className="text-right text-foreground text-xs sm:text-sm">
                      Цена
                    </TableHead>
                    <TableHead className="text-right text-foreground text-xs sm:text-sm">
                      Изменение
                    </TableHead>
                    <TableHead className="text-right text-foreground text-xs sm:text-sm">
                      Стоимость
                    </TableHead>
                    <TableHead className="text-right text-foreground text-xs sm:text-sm">
                      Доля
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {holdings.map((holding, index) => (
                    <motion.tr
                      key={holding.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.3 + index * 0.05 },
                      }}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="text-foreground text-xs sm:text-sm font-medium break-words">
                        {holding.symbol}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs sm:text-sm break-words">
                        {holding.name}
                      </TableCell>
                      <TableCell className="text-right text-foreground text-xs sm:text-sm">
                        {holding.shares}
                      </TableCell>
                      <TableCell className="text-right text-foreground text-xs sm:text-sm">
                        ${holding.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="secondary"
                          className={`text-xs whitespace-nowrap ${
                            holding.change.startsWith('+')
                              ? 'bg-green-500/20 text-green-500 border-green-500/30'
                              : 'bg-red-500/20 text-red-500 border-red-500/30'
                          }`}
                        >
                          {holding.change.startsWith('+') ? (
                            <TrendingUp size={10} className="mr-1" />
                          ) : (
                            <TrendingDown size={10} className="mr-1" />
                          )}
                          {holding.change}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-foreground text-xs sm:text-sm">
                        ${holding.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-foreground text-xs sm:text-sm">
                        {holding.allocation}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Лучшие активы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings
                  .filter((h) => h.change.startsWith('+'))
                  .sort(
                    (a, b) =>
                      parseFloat(b.change.replace('%', '')) -
                      parseFloat(a.change.replace('%', ''))
                  )
                  .slice(0, 3)
                  .map((holding, index) => (
                    <motion.div
                      key={holding.symbol}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.7 + index * 0.1 },
                      }}
                      className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30"
                    >
                      <div>
                        <p className="text-foreground">{holding.symbol}</p>
                        <p className="text-sm text-muted-foreground">
                          {holding.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-500">{holding.change}</p>
                        <p className="text-sm text-muted-foreground">
                          ${holding.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">
                Крупнейшие активы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 3)
                  .map((holding, index) => (
                    <motion.div
                      key={holding.symbol}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.8 + index * 0.1 },
                      }}
                      className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-border"
                    >
                      <div>
                        <p className="text-foreground">{holding.symbol}</p>
                        <p className="text-sm text-muted-foreground">
                          {holding.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-foreground">{holding.allocation}</p>
                        <p className="text-sm text-muted-foreground">
                          ${holding.value.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
