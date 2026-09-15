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
    description: 'Syrupy and bold with dark chocolate sweetness and a clean finish.',
    itemsSold: 34,
    vendor: 'Blue Bottle',
  },
  {
    id: 2,
    title: 'Latte',
    image: Latte,
    price: 6.99,
    description: 'Silky steamed milk, balanced espresso, and a delicate layer of microfoam.',
    itemsSold: 10,
    vendor: 'Blue Bottle',
  },
  {
    id: 3,
    title: 'Cold Brew',
    image: ColdBrew,
    price: 7.49,
    description: 'Slow-steeped for a smooth, naturally sweet cup with very low acidity.',
    itemsSold: 87,
    vendor: 'Stumptown Roasters',
  },
  {
    id: 4,
    title: 'Ethiopian Yirgacheffe',
    description: 'A light, tea-like roast with jasmine aromatics and bright citrus notes.',
    price: 14.99,
    image: Ethiopian,
    itemsSold: 64,
    vendor: 'Counter Culture Coffee',
  },
  {
    id: 5,
    title: 'Colombian Dark Roast',
    description: 'Full-bodied and comforting with cocoa, toasted almond, and caramel.',
    price: 12.49,
    image: Colombian,
    itemsSold: 23,
    vendor: 'Counter Culture Coffee',
  },
  {
    id: 6,
    title: 'Guatemala Antigua',
    description: 'Balanced and gently smoky with baking spice and bittersweet chocolate.',
    price: 15.0,
    image: Gautemal,
    itemsSold: 45,
    vendor: 'Stumptown Roasters',
  },
];

export default products;
