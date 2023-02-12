import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useUpdateUserMutation } from '@/data/user';
import TextArea from '@/components/ui/text-area';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import pick from 'lodash/pick';

type FormValues = {
  username: string;
  email: string;
  phone: string;
  fullname: string;
  profile: {
    id: string;
    bio: string;
    contact: string;
    avatar: {
      thumbnail: string;
      original: string;
      id: string;
    };
  };
};

export default function ProfileUpdate({ me }: any) {
  const { t } = useTranslation();
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me && pick(me, ['fullname', 'phone', 'email'])),
    },
  });

  async function onSubmit(values: FormValues) {
    const { username, profile, email } = values;
    updateUser({
      id: me?.usrid,
      input: {
        name: username,
        email: email,
        profile: {
          id: me?.usrid,
          bio: profile?.bio,
          contact: me.phone,
          avatar: {
            thumbnail: profile?.avatar?.thumbnail,
            original: me.avatar,
            id: profile?.avatar?.id,
          },
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-avatar')}
          details={t('form:avatar-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="profile.avatar" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:profile-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('fullname')}
            error={t(errors.fullname?.message!)}
            variant="outline"
            className="mb-5"
          />
          {/* <TextArea
            label={t('form:input-label-bio')}
            {...register('profile.bio')}
            error={t(errors.profile?.bio?.message!)}
            variant="outline"
            className="mb-6"
          /> */}
          <Input
            label={t('form:input-label-contact')}
            {...register('phone')}
            error={t(errors.phone?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            error={t(errors.email?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>

        <div className="w-full text-end">
          <Button loading={loading} disabled={loading}>
            {t('form:button-label-save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
