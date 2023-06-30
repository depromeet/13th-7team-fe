'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useGetUnreadNotification } from '~/api/domain/notification.api';
import { Divider } from '~/components/Divider';
import { BellIcon, HomeIcon, PersonIcon } from '~/components/Icon';

type BottomNavigationPath = '/planet' | '/notification' | '/my-page';

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: BottomNavigationPath) => {
    router.push(path);
  };

  const getSvgcolor = (bottomNavigationPath: BottomNavigationPath) => {
    if (pathname.includes(bottomNavigationPath)) {
      return 'fill-primary-500 stroke-primary-500';
    } else {
      return 'fill-none stroke-grey-400';
    }
  };

  const hasUnreadNotification = useGetUnreadNotification();

  return (
    <nav className="fixed bottom-0 left-0 w-full">
      <Divider />
      <ul className="flex h-b-nav items-center justify-evenly bg-white">
        <li>
          <button onClick={() => handleNavigation('/planet')}>
            <HomeIcon className={getSvgcolor('/planet')} />
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/notification')} className="relative">
            {hasUnreadNotification.data?.data && (
              <div className="absolute right-2pxr h-2 w-2 rounded-full border bg-blue-500 outline-white"></div>
            )}
            <BellIcon height={26} className={getSvgcolor('/notification')} />
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/my-page')}>
            <PersonIcon className={getSvgcolor('/my-page')} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
