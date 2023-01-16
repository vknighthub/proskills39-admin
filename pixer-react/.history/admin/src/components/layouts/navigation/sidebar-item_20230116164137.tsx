import Link from '@/components/ui/link';
// import { Link } from 'react-router-dom';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const SidebarItem = ({ item }: any) => {
  const { t } = useTranslation();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const { closeSidebar } = useUI();

  const link = (path: string) => {
    return <Link href={path}></Link>;
  };
  return (
    <>
      <a
        href={'#'}
        // onClick={item.subNav && showSubnav}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: item.icon,
          className: 'w-5 h-5 me-4',
        })}
        <div
          className="flex w-full justify-between"
          onClick={item.subNav && showSubnav}
        >
          {t(item.label)}
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>
      </a>
      {subnav &&
        item.subNav.map((item: any, index: number) => {
          return (
            <Link
              href={item.path}
              key={index}
              className="flex w-full items-center"
              title={t(item.title)}
            >
              {t(item.title)}
            </Link>
          );
        })}
    </>
  );
};

export default SidebarItem;
