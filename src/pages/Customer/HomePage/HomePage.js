import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import React from 'react';
import HomePageBanner from './HomeBanner';
import ProductNewList from 'layout/CustomerLayout/ProductNewList';
import BannerProduct from 'layout/CustomerLayout/BannerProduct';

const HomePage = () => {
  return (
    <CustomerPage>
      <HomePageBanner />
      <ProductNewList />
      <BannerProduct />
    </CustomerPage>
  );
};

export default HomePage;
