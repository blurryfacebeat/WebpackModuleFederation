import { type FC, lazy, type LazyExoticComponent } from 'react';

const AboutLazy: LazyExoticComponent<FC> = lazy(
  async () => await import('./about'),
);

export default AboutLazy;
