import React, { useContext, useEffect, useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import credentialsContext from '../context/credentialsContext';

const Subscription = () => {
  const { fetchProducts } = useContext(credentialsContext);
  const [products, setProducts] = useState([]);

  const desiredOrder = ['Basic Plan', 'Standard Plan', 'Premium Plan'];

  async function getAndAssignProducts() {
    const data = await fetchProducts();

    if (data.data.status === 'success') {
      const productsArr = data.data.data.data;

      const transformedProducts = productsArr.map((product, i) => ({
        id: i,
        priceId: product.stripePriceId,
        heading: product.name,
        description: product.description,
        features: [
          `${product.metadata.messages} messages`,
          product.metadata.analytics,
          product.metadata.support,
        ],
      }));

      transformedProducts.sort(
        (a, b) =>
          desiredOrder.indexOf(a.heading) - desiredOrder.indexOf(b.heading),
      );

      setProducts(transformedProducts);
    }
  }

  useEffect(() => {
    getAndAssignProducts();
  }, []);

  return (
    <section id="subscriptions" className="px-10 py-40 align-middle">
      <h2 className="mb-20 text-center text-4xl font-bold text-violet-600">
        About Metered Messages
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {products.map((product) => (
          <SubscriptionCard
            key={product.id}
            priceId={product.priceId}
            heading={product.heading}
            description={product.description}
            features={product.features}
          />
        ))}
      </div>
    </section>
  );
};

export default Subscription;
