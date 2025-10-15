import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CalendarDays, DollarSign, Tag, FileText, X } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

const expenseCategories = [
  { value: 'food', label: 'Продукты', icon: '🛒' },
  { value: 'transport', label: 'Транспорт', icon: '🚇' },
  { value: 'entertainment', label: 'Развлечения', icon: '🎬' },
  { value: 'utilities', label: 'Коммунальные', icon: '🏠' },
  { value: 'health', label: 'Здоровье', icon: '💊' },
  { value: 'education', label: 'Образование', icon: '📚' },
  { value: 'shopping', label: 'Покупки', icon: '🛍️' },
  { value: 'other', label: 'Другое', icon: '📦' },
];

const incomeCategories = [
  { value: 'salary', label: 'Зар��лата', icon: '💼' },
  { value: 'freelance', label: 'Фриланс', icon: '💻' },
  { value: 'investments', label: 'Инвестиции', icon: '📈' },
  { value: 'business', label: 'Бизнес', icon: '🏢' },
  { value: 'gifts', label: 'Подарки', icon: '🎁' },
  { value: 'other', label: 'Другое', icon: '💰' },
];

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = transactionType === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) return;

    const selectedCategory = categories.find(cat => cat.value === category);
    
    const newTransaction = {
      id: Date.now().toString(),
      type: transactionType,
      category: selectedCategory?.label || '',
      amount: parseFloat(amount),
      description,
      date: new Date(date),
      icon: selectedCategory?.icon || '📄'
    };

    onAdd(newTransaction);
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setTransactionType('expense');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Добавить транзакцию
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="p-1 hover:bg-accent/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Transaction Type */}
                <div className="space-y-3">
                  <Label>Тип транзакции</Label>
                  <RadioGroup 
                    value={transactionType} 
                    onValueChange={(value) => {
                      setTransactionType(value as 'income' | 'expense');
                      setCategory(''); // Reset category when type changes
                    }}
                    className="flex gap-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value="expense" id="expense" />
                      <Label htmlFor="expense" className="cursor-pointer flex items-center gap-2">
                        <span className="text-red-500">📉</span>
                        Расход
                      </Label>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value="income" id="income" />
                      <Label htmlFor="income" className="cursor-pointer flex items-center gap-2">
                        <span className="text-green-500">📈</span>
                        Доход
                      </Label>
                    </motion.div>
                  </RadioGroup>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Категория
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            {cat.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Сумма (₽)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Описание
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Описание транзакции"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Дата
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Сохранить
                    </Button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}