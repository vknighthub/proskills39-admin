import Link from '@/components/ui/link';
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
  return (
    <>
      <Link
        href={item.href}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: item.icon,
          className: 'w-5 h-5 me-4',
        })}
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
        <span onClick={item.subNav && showSubnav}>{item.label}</span>
        {/* <span onClick={() => closeSidebar()}>{t(item.label)}</span> */}
      </Link>
      {subnav &&
        item.subNav.map((item: any, index: number) => {
          return (
            <Link href={item.href} key={index}>
              {item.icon}
              {/* <span>{t(item.label)}</span> */}
            </Link>
          );
        })}
    </>
  );
};

export default SidebarItem;
