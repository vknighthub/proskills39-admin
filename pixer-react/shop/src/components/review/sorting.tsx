// import Select from '@/components/ui/select/select';
import { Listbox } from '@/components/ui/list-box';
import { Transition } from '@/components/ui/transition';
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { ChevronLeft } from '../icons/chevron-left';
import { useTranslation } from 'react-i18next';
// import { useIsRTL } from '@/lib/locals';
interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: string;
  orderBy: string;
  sortedBy: 'ASC' | 'DESC';
}
const plans: Plan[] = [
  {
    id: '1',
    key: 'sorting',
    label: 'text-recent',
    value: 'created_at',
    orderBy: 'created_at',
    sortedBy: 'DESC',
  },
  {
    id: '2',
    key: 'sorting',
    label: 'text-ratings-low-to-high',
    value: 'l2h',
    orderBy: 'rating',
    sortedBy: 'ASC',
  },
  {
    id: '3',
    key: 'sorting',
    label: 'text-ratings-high-to-low',
    value: 'h2l',
    orderBy: 'rating',
    sortedBy: 'DESC',
  },
];

const Sorting = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  // const { isRTL } = useIsRTL();
  const [selected, setSelected] = useState(
    () =>
      plans.find((plan) => plan.orderBy === router.query.orderBy) ?? plans[0]
  );

  useEffect(() => {
    if (!router.query.orderBy) {
      setSelected(plans[0]);
    }
  }, [router.query.orderBy]);

  function handleChange(values: Plan) {
    const { orderBy, sortedBy } = values;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          orderBy,
          sortedBy,
        },
      },
      undefined,
      { scroll: false }
    );
    setSelected(values);
  }

  return (
    <div className="flex items-center">
      {/* <span className="text-body min-w-[50px] text-sm ltr:mr-2 rtl:ml-2">
        {t('text-sort-by')} :
      </span> */}
      <div className="w-44">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative">
            <Listbox.Button className="group flex w-full items-center justify-between text-13px text-dark dark:text-light sm:text-sm">
              <span className="block truncate">{t(selected?.label)}</span>
              <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 rtl:left-0">
                <ChevronLeft className="h-4 w-4 -rotate-90" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-4 max-h-60 w-full cursor-pointer overflow-auto rounded-md bg-light pt-1 pb-2 text-base dark:bg-dark-200">
                {plans.map((plan) => (
                  <Listbox.Option
                    key={plan?.id}
                    value={plan}
                    className={({ active }) =>
                      `flex items-center border-b border-light-400 px-4 py-2.5 text-13px last:border-0 hover:bg-light-300 hover:text-dark focus:text-dark dark:border-dark-400 hover:dark:bg-dark-300 dark:hover:text-light dark:focus:text-light sm:px-5 ${
                        active
                          ? 'bg-light-400 text-dark dark:bg-dark-400 dark:text-light'
                          : 'text-dark-500 dark:text-light-600'
                      }`
                    }
                  >
                    <span className="block truncate"> {t(plan?.label)}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {/* <Select
        defaultValue={selected}
        isRtl={isRTL}
        isMinimal={true}
        isSearchable={false}
        options={plans}
        width={200}
        // @ts-ignore
        onChange={handleChange}
      /> */}
    </div>
  );
};

export default Sorting;
