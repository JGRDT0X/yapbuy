import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Receipt, RefreshCcw } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  icon: string;
}

const CRYPTOCURRENCIES: Cryptocurrency[] = [
    { 
    id: 'yap', 
    name: 'Yap', 
    symbol: '$YAP', 
    price: 0.0036,
    icon: '🗣️'
    },
    { 
    id: 'wif', 
    name: 'Wif', 
    symbol: '$WIF', 
    price: 2.42,
    icon: '🧢'
    },
    { 
    id: 'goat', 
    name: 'Goat', 
    symbol: '$GOAT', 
    price: 0.6912,
    icon: '📀'
    },

    { 
    id: 'bitcoin', 
    name: 'Bitcoin', 
    symbol: '$BTC', 
    price: 66000,
    icon: '₿'
  },
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    symbol: '$ETH', 
    price: 2500,
    icon: 'Ξ'
  },
  { 
    id: 'solana', 
    name: 'Solana', 
    symbol: '$SOL', 
    price: 170,
    icon: '🟣'
  },

];

const ITEMS: Omit<Item, 'quantity'>[] = [
    { id: '1', name: 'Big Mac', price: 2, image: '/items/big-mac.jpg' },
    { id: '2', name: 'Flip Flops', price: 3, image: '/items/flip-flops.jpg' },
    { id: '3', name: 'Coca-Cola Pack', price: 5, image: '/items/coca-cola-pack.jpg' },
    { id: '4', name: 'Movie Ticket', price: 12, image: '/items/movie-ticket.jpg' },
    { id: '5', name: 'Book', price: 15, image: '/items/book.jpg' },
    { id: '6', name: 'Lobster Dinner', price: 45, image: '/items/lobster-dinner.jpg' },
    { id: '7', name: 'Video Game', price: 60, image: '/items/video-game.jpg' },
    { id: '8', name: 'Amazon Echo', price: 99, image: '/items/amazon-echo.jpg' },
    { id: '9', name: 'Year of Netflix', price: 100, image: '/items/year-of-netflix.jpg' },
    { id: '10', name: 'Air Jordans', price: 125, image: '/items/air-jordans.jpg' },
    { id: '11', name: 'Airpods', price: 199, image: '/items/airpods.jpg' },
    { id: '12', name: 'Gaming Console', price: 299, image: '/items/gaming-console.jpg' },
    { id: '13', name: 'Drone', price: 350, image: '/items/drone.jpg' },
    { id: '14', name: 'Smartphone', price: 699, image: '/items/smartphone.jpg' },
    { id: '15', name: 'Bike', price: 800, image: '/items/bike.jpg' },
    { id: '16', name: 'Kitten', price: 1500, image: '/items/kitten.jpg' },
    { id: '17', name: 'Puppy', price: 1500, image: '/items/puppy.jpg' },
    { id: '18', name: 'Auto Rickshaw', price: 2300, image: '/items/auto-rickshaw.jpg' },
    { id: '19', name: 'Horse', price: 2500, image: '/items/horse.jpg' },
    { id: '20', name: 'Acre of Farmland', price: 3000, image: '/items/acre-of-farmland.jpg' },
    { id: '21', name: 'Designer Handbag', price: 5500, image: '/items/designer-handbag.jpg' },
    { id: '22', name: 'Hot Tub', price: 6000, image: '/items/hot-tub.jpg' },
    { id: '23', name: 'Luxury Wine', price: 7000, image: '/items/luxury-wine.jpg' },
    { id: '24', name: 'Diamond Ring', price: 10000, image: '/items/diamond-ring.jpg' },
    { id: '25', name: 'Jet Ski', price: 12000, image: '/items/jet-ski.jpg' },
    { id: '26', name: 'Rolex', price: 15000, image: '/items/rolex.jpg' },
    { id: '27', name: 'Ford F-150', price: 30000, image: '/items/ford-f-150.jpg' },
    { id: '28', name: 'Tesla', price: 75000, image: '/items/tesla.jpg' },
    { id: '29', name: 'Monster Truck', price: 150000, image: '/items/monster-truck.jpg' },
    { id: '30', name: 'Ferrari', price: 250000, image: '/items/ferrari.jpg' },
    { id: '31', name: 'Single Family Home', price: 300000, image: '/items/single-family-home.jpg' },
    { id: '32', name: 'Gold Bar', price: 700000, image: '/items/gold-bar.jpg' },
    { id: '33', name: 'McDonalds', price: 1500000, image: '/items/mcdonalds-franchise.jpg' },
    { id: '34', name: 'Superbowl Ad', price: 5250000, image: '/items/superbowl-ad.jpg' },
    { id: '35', name: 'Yacht', price: 7500000, image: '/items/yacht.jpg' },
    { id: '36', name: 'M1 Abrams', price: 8000000, image: '/items/m1-abrams.jpg' },
    { id: '37', name: 'Formula 1 Car', price: 15000000, image: '/items/formula-1-car.jpg' },
    { id: '38', name: 'Apache Helicopter', price: 31000000, image: '/items/apache-helicopter.jpg' },
    { id: '39', name: 'Mansion', price: 45000000, image: '/items/mansion.jpg' },
    { id: '40', name: 'Make a Movie', price: 100000000, image: '/items/make-a-movie.jpg' },
    { id: '41', name: 'Boeing 747', price: 148000000, image: '/items/boeing-747.jpg' },
    { id: '42', name: 'Mona Lisa', price: 780000000, image: '/items/mona-lisa.jpg' },
    { id: '43', name: 'Skyscraper', price: 850000000, image: '/items/skyscraper.jpg' },
    { id: '44', name: 'Cruise Ship', price: 930000000, image: '/items/cruise-ship.jpg' },
    { id: '45', name: 'NBA Team', price: 2120000000, image: '/items/nba-team.jpg' },
  ];

const CryptoSpender = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency>(CRYPTOCURRENCIES[0]);
  const [cryptoAmount, setCryptoAmount] = useState<string>('1000000000000000'); // 10,000,000 / 0.0036
  const [items, setItems] = useState<Item[]>(
    ITEMS.map(item => ({ ...item, quantity: 0 }))
  );

  const balance = useMemo(() => {
    return Math.floor((parseFloat(cryptoAmount) || 0) * selectedCrypto.price);
  }, [cryptoAmount, selectedCrypto]);

  const purchasedItems = useMemo(() => {
    return items.filter(item => item.quantity > 0);
  }, [items]);

  const total = useMemo(() => {
    return purchasedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [purchasedItems]);

  const buyItem = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId && balance >= item.price) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const sellItem = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const resetGame = () => {
    setCryptoAmount('');
    setItems(items.map(item => ({ ...item, quantity: 0 })));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <Card className="lg:col-span-2 rounded-none border-b-0">
          <CardHeader className=''>
            <CardTitle className="flex items-center justify-center gap-2">
              <span className='text-[#0000FF]'>${balance.toLocaleString()}</span>
              {cryptoAmount && (
                <div className="text-sm text-zinc-400">
                  ({parseFloat(cryptoAmount).toFixed(6)} {selectedCrypto.symbol})
                </div>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className='rounded-none'>
          <CardContent className="pt-6 ">
            <div className="flex gap-4">
              <div className="flex-grow">
                <Select
                  value={selectedCrypto.id}
                  onValueChange={(value) => {
                    const crypto = CRYPTOCURRENCIES.find(c => c.id === value);
                    if (crypto) setSelectedCrypto(crypto);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRYPTOCURRENCIES.map(crypto => (
                      <SelectItem key={crypto.id} value={crypto.id}>
                        <span className="flex items-center gap-2">
                          <span>{crypto.icon}</span>
                          <span>{crypto.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-grow">
                <Input
                  type="number"
                  step="0.000001"
                  min="0"
                  placeholder={`Enter amount`}
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                />
              </div>

              <Button 
                onClick={resetGame}
                variant="outline"
                size="icon"
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {items.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow shadow-none rounded">
            <CardContent className="p-4">
              <div className="flex flex-col items-center">

                <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-60 mb-4"
                />
                </div>

                <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-green-600 font-bold">
                  ${item.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ({(item.price / selectedCrypto.price).toFixed(6)} {selectedCrypto.symbol})
                </p>
                
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => sellItem(item.id)}
                    disabled={item.quantity === 0}
                    variant="destructive"
                    size="sm"
                  >
                    Sell
                  </Button>
                  
                  <span className="font-mono text-lg min-w-[2ch] text-center">
                    {item.quantity}
                  </span>
                  
                  <Button
                    onClick={() => buyItem(item.id)}
                    disabled={balance < item.price}
                    variant="default"
                    size="sm"
                  >
                    Buy
                  </Button>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {purchasedItems.length > 0 && (
        <Card className="fixed top-4 right-4 w-96 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Your Receipt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {purchasedItems.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span className=''>{item.name} x{item.quantity}</span>
                  <span className="font-bold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </ScrollArea>
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>In {selectedCrypto.symbol}:</span>
                <span>{(total / selectedCrypto.price).toFixed(6)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CryptoSpender;
