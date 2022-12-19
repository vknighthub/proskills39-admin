import Card from '@/components/common/card';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import FileInput from '@/components/ui/file-input';
import Input from '@/components/ui/input';
import { useUpdateNRCMutation } from '@/data/user';
import pick from 'lodash/pick';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

type FormValues = {
  nrc: {
    nid: string;
    front_image: string;
    back_image: string;
  };
  passport: {
    nid: string;
    front_image: string;
    back_image: string;
  };
};

export default function NRCUpdate({ me }: any) {
  const { t } = useTranslation();
  const { mutate: UpdateNRC, isLoading: loading } = useUpdateNRCMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me &&
        pick(me, [
          'nrc.nid',
          'nrc.front_image',
          'nrc.back_image',
          'passport.nid',
          'passport.front_image',
          'passport.back_image',
        ])),
    },
  });

  async function onSubmit(values: FormValues) {
    const { nrc, passport } = values;
    UpdateNRC({
      id: me?.id,
      input: {
        nrc: {
          nid: nrc?.nid,
          front_image: nrc?.front_image,
          back_image: nrc?.back_image,
        },
        passport: {
          nid: passport?.nid,
          front_image: passport?.front_image,
          back_image: passport?.back_image,
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:form-nrc-title-information')}
          details={t('form:nrc-info-help-text')}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        />

        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-nationalid')}
            {...register('nrc.nid')}
            error={t(errors.nrc?.nid?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="mx-5 flex ">
            <Card className="w-full sm:w-8/12 md:w-2/3 mb-5 mx-2">
              <FileInput
                name="nrc.front_image"
                control={control}
                multiple={false}
              />
            </Card>
            <Card className="w-full sm:w-8/12 md:w-2/3 mb-5 mx-2">
              <FileInput
                name="nrc.back_image"
                control={control}
                multiple={false}
              />
            </Card>
          </div>

          <Input
            label={t('form:input-label-passport')}
            {...register('passport.nid')}
            error={t(errors.passport?.nid?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Card className="w-full mb-5">
            <FileInput
              name="passport.back_image"
              control={control}
              multiple={false}
            />
          </Card>
        </Card>

        <div className="text-end w-full">
          <Button loading={loading} disabled={loading}>
            {t('form:button-label-save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
