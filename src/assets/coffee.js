import Espresso from './espresso.jpg';
import Latte from './latte.jpg';
import ColdBrew from './cold-brew.jpg';
import Ethiopian from './ethiopian.webp';
import Colombian from './colombian.webp';
import Gautemal from './guatemal.webp';

const products = [
  {
    id: 1,
    title: 'Espresso Coffee',
    image: Espresso,
    price: 5.99,
    description: 'A strong and bold espresso shot to kickstart your day.',
    itemsSold: 34,
    vendor: 'Blue Bottle',
  },
  {
    id: 2,
    title: 'Latte',
    image: Latte,
    price: 6.99,
    description: 'A creamy cappuccino with a perfect blend of espresso and milk foam.',
    itemsSold: 10,
    vendor: 'Blue Bottle',
  },
  {
    id: 3,
    title: 'Cold Brew',
    image: ColdBrew,
    price: 7.49,
    description: 'A smooth and creamy latte made with steamed milk and espresso.',
    itemsSold: 87,
    vendor: 'Stumptown Roasters',
  },
  {
    id: 4,
    title: 'Ethiopian Yirgacheffe',
    description: 'Light roast with floral and citrus notes',
    price: 14.99,
    image: Ethiopian,
    itemsSold: 64,
    vendor: 'Counter Culture Coffee',
  },
  {
    id: 5,
    title: 'Colombian Dark Roast',
    description: 'Full body, chocolate & nutty tones',
    price: 12.49,
    image: Colombian,
    itemsSold: 23,
    vendor: 'Counter Culture Coffee',
  },
  {
    id: 6,
    title: 'Guatemala Antigua',
    description: 'Balanced, smoky & chocolaty',
    price: 15.0,
    image: Gautemal,
    itemsSold: 45,
    vendor: 'Stumptown Roasters',
  },
];

export default products;
