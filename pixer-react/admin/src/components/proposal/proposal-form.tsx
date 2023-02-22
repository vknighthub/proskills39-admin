import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTranslation } from 'next-i18next';
import Alert from '@/components/ui/alert';
import { useState } from 'react';
import { useSummaryProposalMutation } from '@/data/proposal';
import { toast } from 'react-toastify';
import SelectInput from '../ui/select-input';
import * as yup from 'yup';

const Language = [{ lang: 'VN' }, { lang: 'JP' }, { lang: 'EN' }];

const proposalSchema = yup.object().shape({
  //language: yup.string().required('form:error-old-password-required'),
  proposalId: yup.string().required('form:error-password-required'),
  summary: yup.string().required('form:error-user-name-required'),
});

interface SummaryProposal {
  proposalId: number;
  language: { lang: string };
  summary: string;
}

export default function SummaryroposalForm(value: any) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const methods = useForm<SummaryProposal>({
    resolver: yupResolver(proposalSchema),
  });
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const { mutate: summaryProposal, isLoading: summaring } =
    useSummaryProposalMutation();

  async function onSubmits(values: SummaryProposal) {
    summaryProposal(
      {
        proposalId: value.initialValues,
        language: values.language?.lang ?? 'VN',
        summary: values.summary,
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            });
          });
        },
        onSuccess: (data) => {
          console.log(data);
          if (data?.errorcode != 0) {
            setError('proposalId', {
              type: 'manual',
              message: data?.message ?? '',
            });
          } else {
            toast.success(t('common:summary-proposal-successfully'));
            //reset();
          }
        },
      }
    );
  }

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      {/* <FormProvider {...methods}> */}
      <form onSubmit={handleSubmit(onSubmits)} noValidate>
        <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('form:form-summary-proposal')}
            // details={t('form:type-and-category-help-text')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="mb-5">
              <Label>{t('form:input-language-type')}</Label>
              <SelectInput
                lab
                name="language"
                control={control}
                getOptionLabel={(option: any) => option.lang}
                getOptionValue={(option: any) => option.lang}
                options={Language!}
              />
            </div>
            <Input
              label={`${t('form:input-label-proposal-id')}`}
              {...register('proposalId')}
              value={value.initialValues}
              error={t(errors.proposalId?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={`${t('form:input-label-summary')}*`}
              {...register('summary')}
              error={t(errors.summary?.message!)}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>

        <div className="mb-4 text-end">
          <Button loading={summaring} disabled={summaring}>
            {t('form:button-label-add-product')}
          </Button>
        </div>
      </form>
      {/* </FormProvider> */}
    </>
  );
}
