const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const userLogin = 'example@gmail.com'
const userCode = '123321'

const customers = [
  { customer_no: 'AB-321', name: 'Burger bar1', address: 'Second Street 3421 Geneva', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'BZ-889', name: 'Gyoza SS1', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'CB-124', name: 'Burger bar2', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'DZ-880', name: 'Gyoza SS2', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'BE-125', name: 'Burger bar3', address: 'Second Street 3421 Geneva', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'EZ-881', name: 'Gyoza SS3', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'JB-126', name: 'Burger bar4', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'GK-882', name: 'Gyoza SS4', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'BM-127', name: 'Burger bar5', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'GZ-883', name: 'Burger bar6', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'BK-127', name: 'Burger bar7', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'MZ-883', name: 'Gyoza SS5', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'LB-321', name: 'Burger bar8', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'GL-889', name: 'Burger bar9', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'OO-124', name: 'Burger bar10', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'I2-880', name: 'Gyoza SS6', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'F1-125', name: 'Burger bar11', address: 'Second Street 3421 Geneva', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'GZ-881', name: 'Gyoza SS7', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'BB-126', name: 'Burger bar12', address: 'Second Street 3421 Geneva', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'S3-882', name: 'Gyoza SS8', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'HG-127', name: 'Burger bar13', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
  { customer_no: 'SM-883', name: 'Gyoza SS9', address: 'Second Street 3421 Geneva', delivery_days: ['Tue', 'Thu'] },
  { customer_no: 'XL-127', name: 'Burger bar14', address: 'Zurich', delivery_days: ['Fri', 'Sat'] },
]
const allProducts = []
let catalog = [
  { product_code: 'APP123', name: 'Apple', unit: 'kg', price: 2.03, availability: 'In stock' },
  { product_code: 'TOM53', name: 'Tomatoes', unit: 'box', price: 12.03, availability: 'In stock' },
  { product_code: 'CUC997', name: 'Cucumbers', unit: 'pcs', price: 0.52, availability: 'Out of stock' },
  { product_code: 'PIN112', name: 'Pineaple', unit: 'pcs', price: 3.2, availability: 'Discontinued' },
  { product_code: 'APP125', name: 'Apple', unit: 'kg', price: 2.03, availability: 'In stock' },
  { product_code: 'TOM52', name: 'Tomatoes', unit: 'box', price: 12.03, availability: 'In stock' },
  { product_code: 'CUC991', name: 'Cucumbers', unit: 'pcs', price: 0.52, availability: 'Out of stock' },
  { product_code: 'PIN113', name: 'Pineaple', unit: 'pcs', price: 3.2, availability: 'Discontinued' },
]

const orders = [
  {
    order_no: '35322', customer_no: 'AB-321', items: 12, ordered_time: '2021-01-01T12:00:00Z', req_delivery: '2021-01-02T00:00:00Z', status: 'Active',
    details: {
      notes: 'Please deliver as soon as possible',
      products: [{ code: 'APP123', quantity: 12 }, { code: 'TOM53', quantity: 7 }, { code: 'CUC997', quantity: 12 }],
    }
  },
  {
    order_no: '32342', customer_no: 'BZ-889', items: 75, ordered_time: '2021-12-21T12:52:00Z', req_delivery: '2022-01-01T00:00:00Z', status: 'Confirmed',
    details: {
      notes: 'Confirmed',
      products: [{ code: 'PIN112', quantity: 22 }, { code: 'APP125', quantity: 5 }, { code: 'CUC991', quantity: 32 }],

    }
  },
  {
    order_no: '23424', customer_no: 'GL-889', items: 9, ordered_time: '2022-09-27T14:12:55Z', req_delivery: '2022-09-29T14:12:55Z', status: 'Confirmed',
    details: {
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      products: [{ code: 'APP125', quantity: 6 }, { code: 'PIN112', quantity: 2 }],
    }
  },
  {
    order_no: '35323', customer_no: 'GL-889', items: 12, ordered_time: '2021-01-01T12:00:00Z', req_delivery: '2021-01-02T00:00:00Z', status: 'Active',
    details: {
      notes: 'Please deliver as soon as possible',
      products: [{ code: 'APP123', quantity: 6 }, { code: 'TOM53', quantity: 2 }, { code: 'CUC997', quantity: 3 }],
    }
  },
  {
    order_no: '32343', customer_no: 'BZ-889', items: 75, ordered_time: '2021-12-21T12:52:00Z', req_delivery: '2022-01-01T00:00:00Z', status: 'Confirmed',
    details: {
      notes: 'Confirmed',
      products: [{ code: 'APP125', quantity: 3 }, { code: 'PIN112', quantity: 12 }, { code: 'CUC991', quantity: 33 }],
    }
  },
  {
    order_no: '23425', customer_no: 'AB-321', items: 9, ordered_time: '2022-09-27T14:12:55Z', req_delivery: '2022-09-29T14:12:55Z', status: 'Confirmed',
    details: {
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      products: [{ code: 'APP125', quantity: 5 }, { code: 'PIN113', quantity: 8 }],
    }
  },
]

function searchProducts(products_, searchStr) {
  let products = products_
  return products.filter(product =>
    product.name.toLowerCase().includes(searchStr.toLowerCase()) ||
    product.product_code.toLowerCase().includes(searchStr.toLowerCase())
  )
}

function searchOrders(orders_, searchStr) {
  let orders = orders_.map(order => { return { ...order, customer_name: customers.find(cus => cus.customer_no === order.customer_no).name || '' } })
  return orders.filter(order =>
    order.order_no.toString().includes(searchStr) ||
    order.customer_name.toLowerCase().includes(searchStr.toLowerCase()) ||
    order.customer_no.toLowerCase().includes(searchStr.toLowerCase()) ||
    order.details.notes.toLowerCase().includes(searchStr.toLowerCase())
  )
}

function searchCustomers(customers_, searchStr) {
  let customers = customers_
  return customers.filter(customer =>
    customer.customer_no.toLowerCase().includes(searchStr.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchStr.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchStr.toLowerCase())
  )
}

function applyQueryParams(query, items) {
  let responseArray = [...items]

  let filters = Object.fromEntries(Object.entries(query).filter(([key, value]) => key.includes('filter_')).map(([key, value]) => [key.split('filter_')[1], value]))
  const multiselects = Object.fromEntries(Object.entries(filters).filter(([key, value]) => key.includes('multiselect_')).map(([key, value]) => [key.split('multiselect_')[1], value]))
  const chipselects = Object.fromEntries(Object.entries(filters).filter(([key, value]) => key.includes('chipselect_')).map(([key, value]) => [key.split('chipselect_')[1], value]))
  const datepickers = Object.fromEntries(Object.entries(filters).filter(([key, value]) => key.includes('datepicker_')).map(([key, value]) => [key.split('datepicker_')[1], value]))

  responseArray = responseArray.filter(item => {
    return Object.entries(multiselects).filter(([key, value]) => value.includes(item[key])).map((el) => true).length === Object.keys(multiselects).length &&
      Object.entries(datepickers).filter(([key, value]) => {
        const [from, to] = value[0].split(',')
        dateFrom = new Date(from)
        dateTo = new Date(to)
        itemDate = new Date(item[key])
        return !!(dateFrom <= itemDate && dateTo >= itemDate)
      }).length === Object.keys(datepickers).length &&
      Object.entries(chipselects).filter(([key, value]) => {
        const customers_ = customers.filter(cus => value.includes(cus.name)).map(cus => cus.customer_no)
        return customers_.includes(item.customer_no)
      }).length === Object.keys(chipselects).length
  })

  if (query.sort)
    responseArray = responseArray.sort((a, b) => compare(a, b, query.sort))
  if (query.reverseorder)
    responseArray = responseArray.reverse()

  return [responseArray.length, responseArray.slice(query.pf, query.pt)]
}

function compare(a, b, field) {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
}

app.patch('/order/:id', function (req, res, next) {
  const { id } = req.params
  const order = orders.find(order => order.order_no === id)
  order.status = req.body.status
  res.send(order)
})

app.get('/orders/', function (req, res, next) {
  // console.log('orders')
  // console.log(req.query)
  let orders_ = [...orders]
  req.query.search && (orders_ = searchOrders(orders_, req.query.search))
  let [length, response] = applyQueryParams(req.query, orders_)
  response.forEach(el => {
    el.customer_name = customers.find(cus => cus.customer_no === el.customer_no)?.name || 'unknown'
    el.notes = el.details.notes.slice(0, 14) === el.details.notes ? el.details.notes : el.details.notes.slice(0, 14) + '...'
  })

  res.send({
    length,
    items: response.map(order => {
      const { details, ...ordersWithoutDetails } = order
      return ordersWithoutDetails
    })
  })
})

app.get('/order/:id/details', (req, res) => {
  const { id } = req.params
  const order = orders.find(order => order.order_no === id)
  if (!order) {
    res.status(400).send({ message: 'Record not found' })
    return
  }
  const customer = customers.find(cus => cus.customer_no === order.customer_no)
  const products = order.details.products.map(product => {
    let productsDetails = null
    itemInCatalog = catalog.find(prod => prod.product_code === product.code)
    itemInCatalog ? productsDetails = { ...itemInCatalog, quantity: product.quantity } :
      productsDetails = { ...allProducts.find(prod => prod.product_code === product.code), quantity: product.quantity }
    return productsDetails
  })
  const response = {
    notes: order.details.notes, delivery_address: customer.address, products: products.map(product => {
      return {
        product_code: product.product_code,
        product: product.name,
        unit: product.unit,
        quantity: product.quantity
      }
    })
  }
  res.send(response)
})

app.get('/orders/customers', function (req, res, next) {
  let response = [...customers].map(cus => cus.name)
  res.send(response)
})

app.get('/orders/length', function (req, res, next) {
  const length = orders.length
  res.send(length.toString())
})

app.post('/catalog/', (req, res) => {
  try {
    let { newCatalog } = req.body
    if (newCatalog.length) {
      allCodes = allProducts.map(product => product.product_code)
      catalog.forEach(product => { !allCodes.includes(product.product_code) && allProducts.push(product) })
      catalog = newCatalog
      res.send()
    }
    else
      res.status(400).send({ message: `Catalog is empty` })
  } catch (err) {
    res.status(400).send({ message: `Catalog is not valid` })
  }
})
app.post('/catalog/product', function (req, res, next) {
  let { item } = req.body
  if (!!catalog.find(prod => prod.product_code === item.product_code)) {
    res.status(400).send({ message: `Record with code ${item.product_code} already exists` })
  } else {
    catalog.push(item)
    res.send(item)
  }
})
app.get('/catalog/', function (req, res, next) {
  let catalog_ = [...catalog]
  // console.log('catalog: ')
  // console.log(catalog_)
  // console.log(req.query)
  req.query.search && (catalog_ = searchProducts(catalog_, req.query.search))
  let [length, response] = applyQueryParams(req.query, catalog_)
  res.send({ length, items: response })
})

app.delete('/catalog/:id', (req, res, next) => {
  const { id } = req.params
  deleteItem(id).then(el => { res.send(el) }).catch(err => res.status(400).send({ message: 'Record not found' }))
})

async function deleteItem(id) {
  const idx = catalog.findIndex(product => product.product_code === id)
  if (idx === -1) throw 'Record not found'
  else allProducts.push(catalog[idx])
  return catalog.splice(idx, 1)[0]
}

app.get('/catalog/example', function (req, res) {
  var options = {
    root: path.join(__dirname)
  };

  var fileName = 'test.csv';
  res.sendFile(fileName, options, function (err) {
    if (err)
      next(err);
  });
})
app.get('/catalog/length', function (req, res, next) {
  const length = catalog.length
  res.send(length.toString())
})

app.get('/customers', function (req, res, next) {
  let customers_ = [...customers]
  // console.log('customers')
  // console.log(req.query)

  req.query.search && (customers_ = searchCustomers(customers_, req.query.search))
  let [length, response] = applyQueryParams(req.query, customers_)
  res.send({ length, items: response })
})

app.get('/customers/catalog', function (req, res, next) {
  let response = [...catalog].map(product => product.product_code)
  res.send(response)
})

app.post('/customers', function (req, res, next) {
  let { item } = req.body
  if (!!customers.find(cus => cus.customer_no === item.customer_no)) {
    res.status(400).send({ message: `Record with code ${item.customer_no} already exists` })
  } else {
    customers.push(item)
    res.send(item)
  }
})

app.get('/customers/length', function (req, res, next) {
  const length = customers.length
  res.send(length.toString())
})

app.post('/login', function (req, res, next) {
  const { login } = req.body
  res.send(login === userLogin)
})

app.post('/login/code', function (req, res, next) {
  const { code } = req.body
  res.send(code === userCode)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});