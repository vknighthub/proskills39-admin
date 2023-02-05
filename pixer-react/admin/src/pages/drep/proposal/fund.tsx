import ErrorMessage from '@/components/ui/error-message';
import PopularProductList from '@/components/product/popular-product-list';
import { useTranslation } from 'next-i18next';
import { useAnalyticsQuery, usePopularProductsQuery } from '@/data/dashboard';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const {
    data: popularProductData,
    isLoading: popularProductLoading,
    error: popularProductError,
  } = usePopularProductsQuery({ limit: 10, language: locale });

  if (popularProductError) {
    return <ErrorMessage message={popularProductError?.message} />;
  }

  return (
    <>
      <div className="mb-6 w-full xl:mb-0">
        <PopularProductList
          products={popularProductData}
          title={t('table:popular-products-table-title')}
        />
      </div>
    </>
  );
}
