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
        //href={item.href}
        //onClick={}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent "
      >
        {link(item.href)}
        {getIcon({
          iconList: sidebarIcons,
          iconName: item.icon,
          className: 'w-5 h-5 me-4',
        })}
        <div className="flex w-full justify-between">
          {t(item.label)}
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>

        <span onClick={item.subNav && showSubnav}></span>
      </a>
    </>
  );
};

export default SidebarItem;
