import { type FC, lazy, type LazyExoticComponent } from 'react';

const ShopLazy: LazyExoticComponent<FC> = lazy(
  async () => await import('./shop'),
);

export default ShopLazy;
