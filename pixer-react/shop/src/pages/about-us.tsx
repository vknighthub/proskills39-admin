import aboutCompany from '@/assets/images/about/about-proskills39-1.png';
import placeholder from '@/assets/images/placeholders/product.svg';
import teamThumbOne from '@/assets/images/team/1.jpg';
import teamThumbTwo from '@/assets/images/team/7.png';

import branchImage1 from '@/assets/images/brand/Catalyst-3.png';
import branchImage2 from '@/assets/images/brand/cardano.png';
import branchImage3 from '@/assets/images/brand/Cardano-Library-logo.png';
import branchImage4 from '@/assets/images/brand/vcoincheck.png';
import branchImage5 from '@/assets/images/brand/Fimi.png';
import branchImage6 from '@/assets/images/brand/Logo-New_Color03466e.png';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const benefitData = [
  {
    id: 1,
    title: 'Benefit 1',
    description: 'High-quality service',
  },
  {
    id: 2,
    title: 'Benefit 2',
    description: 'Reasonable expense',
  },
  {
    id: 3,
    title: 'Benefit 3',
    description: 'Adhere to deadlines, ensure project progress.',
  },
  {
    id: 4,
    title: 'Benefit 4',
    description: 'Experienced and knowledgeable Professionals',
  },
];

const brandData = [
  {
    id: 1,
    name: 'Catalyst',
    image: branchImage1,
  },
  {
    id: 2,
    name: 'Cardano',
    image: branchImage2,
  },
  {
    id: 3,
    name: 'Cardano Library',
    image: branchImage3,
  },
  {
    id: 4,
    name: 'vCoincheck',
    image: branchImage4,
  },
  {
    id: 5,
    name: 'FIMI',
    image: branchImage5,
  },
  {
    id: 6,
    name: 'Cardano Catalyst',
    image: branchImage6,
  },
];

const teamData = [
  {
    id: 1,
    image: teamThumbOne,
    name: 'Ha Nguyen',
    designation: 'Founder',
  },
  {
    id: 2,
    image: teamThumbTwo,
    name: 'Gia Hy Vuong',
    designation: 'Co. Founder',
  },
];

const AboutPage: NextPageWithLayout = () => {
  const { t } = useTranslation('about-us');
  return (
    <>
      <Seo
        title="About us"
        description="ProSkills39 is a project sponsored by Catalyst Fund – Fund for future development projects of Cardano Ecosystem."
        url={routes.about}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('about-us-page-title')}
          subtitle={t('about-us-page-subtitle')}
        />
        <div className="w-full space-y-8 md:space-y-10 lg:space-y-12 xl:px-20">
          <div className="block">
            <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
              {t('about-us-one-title')}
            </h3>
            <p className="leading-loose">{t('about-us-one-description')}</p>
          </div>
          <div className="grid grid-cols-6 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-1 lg:py-1 xl:-mx-20 xl:gap-7 xl:py-5">
            <div className="col-span-1 text-center">
              <div className="mb-3 flex min-h-[160px] h-[100px] w-full items-center justify-center rounded-md bg-light-500 p-5 text-brand dark:bg-dark-400 xs:min-h-[210px] md:mb-4 lg:min-h-[500px] xl:min-h-[600px]">
                <div className="relative h-[539px] w-full flex-shrink-0 text-brand">
                  <Image
                    alt="About ProSkills39"
                    layout="fill"
                    quality={100}
                    objectFit="cover"
                    src={aboutCompany}
                    className=" bg-light-500 dark:bg-dark-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
              {t('about-us-two-title')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:py-1 xl:-mx-20 xl:gap-7 xl:py-5">
              {benefitData.map((benefit) => (
                <div
                  className="col-span-1 text-center"
                  key={`feature--key${benefit.id}`}
                >
                  <div className="mb-3 flex min-h-[60px] w-full items-center justify-center  text-brand text-lg fs-14 xs:min-h-[60px] md:mb-4 lg:min-h-[60px] xl:min-h-[60px]">
                    {benefit.title}
                  </div>
                  <h4 className="text-sm font-medium text-dark dark:text-light md:text-15px">
                    {benefit.description}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <div className="border-y border-light-400 py-8 dark:border-dark-300 md:py-10 lg:py-12">
            <h3 className="mb-6 text-lg font-medium text-dark dark:text-light md:mb-8 lg:mb-10">
              {t('about-us-team-title')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-y-10 lg:gap-x-7 lg:gap-y-12">
              {teamData.map((team) => (
                <div
                  key={`team--key${team.id}`}
                  className="flex flex-col items-center text-center lg:flex-row lg:text-left"
                >
                  <div className="relative h-[100px] w-[100px] flex-shrink-0 text-brand">
                    <Image
                      alt={team.name}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={team.image ?? placeholder}
                      className="rounded-full bg-light-500 dark:bg-dark-300"
                    />
                  </div>
                  <div className="mt-3 lg:ml-5 lg:mt-0">
                    <h3 className="mb-1 text-15px font-medium text-dark dark:text-light">
                      {team.name}
                    </h3>
                    <p className="font-medium leading-[1.8em]">
                      {team.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="block">
            <h3 className="mb-2.5 text-base font-medium text-dark dark:text-light md:text-lg">
              {t('about-us-trusted-by')}
            </h3>
            <p className="leading-loose">{t('about-us-trust-by-description')}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-6 lg:py-1 xl:-mx-20 xl:gap-7 xl:py-5">
            {brandData.map((brand) => (
              <div
                className="col-span-1 text-center"
                key={`feature--key${brand.id}`}
              >
                <div className="mb-3 flex min-h-[160px] w-full items-center justify-center rounded-md  p-5 text-brand  xs:min-h-[143.33px] md:mb-4 lg:min-h-[143.33px] xl:min-h-[143.33px]">
                  <div className="relative h-[143.33px] w-full flex-shrink-0 text-brand">
                    <Image
                      alt={brand.name}
                      layout="fill"
                      quality={100}
                      objectFit="cover"
                      src={brand.image}
                      className="rounded-full bg-light-500 dark:bg-dark-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="block">
            <h3 className="mb-2 text-base font-medium text-dark dark:text-light md:text-lg">
              {t('about-us-contact-title')}
            </h3>
            <p className="leading-[1.75em]">
              {t('about-us-contact-subtitle')}
              <AnchorLink
                href={routes.contact}
                className="text-dark-100 no-underline hover:text-brand-dark hover:no-underline dark:text-light-600 dark:hover:text-brand"
              >
                {t('about-us-contact-link')}
              </AnchorLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

AboutPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'about-us'])),
    },
    revalidate: 60, // In seconds
  };
};

export default AboutPage;
