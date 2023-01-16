import Link from '@/components/ui/link';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = true;
const SidebarItem = ({ item }: any) => {
  const { t } = useTranslation();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const { closeSidebar } = useUI();

  return (
    <>
      <a
        href={!item.subNav && item.href}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
      >
        {/* {getIcon({
          iconList: sidebarIcons,
          iconName: item.icon,
          className: 'w-5 h-5 me-4',
        })} */}
        <FontAwesomeIcon icon={faCoffee} size="xs" />
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
            <Link href={item.path} key={index} className="m-4">
              {t(item.title)}
            </Link>
          );
        })}
    </>
  );
};

export default SidebarItem;
