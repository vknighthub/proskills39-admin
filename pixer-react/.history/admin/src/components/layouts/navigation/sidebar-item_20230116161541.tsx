import Link from '@/components/ui/link';
// import { Link } from 'react-router-dom';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
let test = false;

const SidebarItem = ({ item }: any) => {
  const { t } = useTranslation();
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(test);
  const { closeSidebar } = useUI();

  const link = (path: string) => {
    return <Link href={path}></Link>;
  };
  return (
    <>
      <Link
        href={'#'}
        // onClick={item.subNav && showSubnav}
        className="flex w-full cursor-pointer items-center text-base text-body-dark text-start focus:text-accent"
      >
        {/* {link(item.href)} */}
        {getIcon({
          iconList: sidebarIcons,
          iconName: item.icon,
          className: 'w-5 h-5 me-4',
        })}
        <div
          className="flex w-full justify-between"
          onClick={() => {
            closeSidebar();
            if (item.subNav) {
              test = !test;
              showSubnav();
            }
          }}
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
        {test &&
          item.subNav.map((item: any, index: number) => {
            return (
              <li key={index}>
                <span>{t(item.label)}</span>
              </li>
            );
          })}
        <span onClick={item.subNav && showSubnav}></span>
      </Link>
    </>
  );
};

export default SidebarItem;
