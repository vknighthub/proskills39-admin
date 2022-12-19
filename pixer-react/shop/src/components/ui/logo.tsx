import cn from 'classnames';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { siteSettings } from '@/data/static/site-settings';
import { useSettings } from '@/data/settings';

export default function Logo({
  className = 'w-30',
  ...props
}: React.AnchorHTMLAttributes<{}>) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  const { lightLogo, darkLogo } = siteSettings;
  const { settings }: any = useSettings();

  return (
    <AnchorLink
      href={routes.home}
      className={cn(
        'relative flex items-center text-dark focus:outline-none dark:text-light',
        className
      )}
      {...props}
    >
      <span
        className="relative overflow-hidden"
        style={{
          width: siteSettings?.width,
          height: siteSettings?.height,
        }}
      >
        {isMounted && isDarkMode && (
          <Image
            src={settings?.dark_logo?.original ?? darkLogo}
            layout="fill"
            objectFit="contain"
            loading="eager"
            alt={settings?.siteTitle ?? 'Dark Logo'}
          />
        )}
        {isMounted && !isDarkMode && (
          <Image
            src={settings?.logo?.original ?? lightLogo}
            layout="fill"
            objectFit="contain"
            loading="eager"
            alt={settings?.siteTitle ?? 'Light Logo'}
          />
        )}
      </span>
    </AnchorLink>
  );
}
