import Layout from '@/components/layouts/admin';
import SummaryroposalForm from '@/components/proposal/proposal-form';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function UpdateProductPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Summary Proposal</h1>
      </div>
      <SummaryroposalForm initialValues={query.challengeSlug} />
    </>
  );
}
UpdateProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form'])),
  },
});
