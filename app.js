const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

class MenuItem {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    getPrice() {
      return this.price;
    }
  
    getDescription() {
      return this.name;
    }
  }
  
  class ExtraCheese extends MenuItem {
    constructor(menuItem) {
      super(menuItem.name, menuItem.price);
      this.menuItem = menuItem;
    }
  
    getPrice() {
      return this.menuItem.getPrice() + 1.0; 
    }
  
    getDescription() {
      return `${this.menuItem.getDescription()} con queso extra`;
    }
  }
  
  class ExtraSauce extends MenuItem {
    constructor(menuItem) {
      super(menuItem.name, menuItem.price);
      this.menuItem = menuItem;
    }
  
    getPrice() {
      return this.menuItem.getPrice() + 0.5; 
    }
  
    getDescription() {
      return `${this.menuItem.getDescription()} con salsa extra`;
    }
  }
  
  app.post('/menu/order', (req, res) => {
    const { items } = req.body;
  
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in the order' });
    }
  
    let total = 0;
    const decoratedItems = items.map((item) => {
      let menuItem = new MenuItem(item.name, item.price);
  
      if (item.extraCheese) {
        menuItem = new ExtraCheese(menuItem);
      }
      if (item.extraSauce) {
        menuItem = new ExtraSauce(menuItem);
      }
  
      total += menuItem.getPrice();
      return {
        name: menuItem.getDescription(),
        price: menuItem.getPrice()
      };
    });
  
    const order = {
      id: currentOrderId++,
      items: decoratedItems,
      total: total
    };
  
    orders.push(order);
    console.log('Order created:', order);
    res.status(200).json(order);
  });
  