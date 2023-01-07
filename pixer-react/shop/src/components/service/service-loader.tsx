import { useTranslation } from 'next-i18next';
import { useTypes } from '@/data/type';
import isEmpty from 'lodash/isEmpty';
import ServiceCarousel from './service-carousel';

function PololarServiceSlider() {
  const { types } = useTypes({ limit: 100 });
  return !isEmpty(types) ? <ServiceCarousel types={types} /> : null;
}

export default function ServiceCardLoader(props: any) {
  const { t } = useTranslation('common');
  return (
    <div className="w-full space-y-8 md:space-y-10 lg:space-y-12 xl:px-20">
      <div className="block">
        <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
          {t('text-popular-professional-services')}
        </h3>
        <PololarServiceSlider /> 
      </div>

      <div className="block">
        <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
          {t('text-promotion-services')}
        </h3>
        <PololarServiceSlider /> 
      </div>

      <div className="block">
        <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
          {t('text-most-ordered-services')}
        </h3>
        <PololarServiceSlider /> 
      </div>

      <div className="block">
        <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
          {t('text-new-post-services')}
        </h3>
        <PololarServiceSlider /> 
      </div>

    </div>
  );
}
