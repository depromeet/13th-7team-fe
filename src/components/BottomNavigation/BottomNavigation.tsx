'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Divider } from '@/components/Divider';
import { BellIcon, HomeIcon, PersonIcon } from '@/components/Icon';

type BottomNavigationPath = '/communities' | '/notification' | '/my-page';

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: BottomNavigationPath) => {
    router.push(path);
  };

  const getSvgcolor = (bottomNavigationPath: BottomNavigationPath) => {
    if (bottomNavigationPath === pathname) {
      return 'fill-primary-500 stroke-primary-500';
    } else {
      return 'fill-none stroke-grey-400';
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full">
      <Divider />
      <ul className="flex h-[52px] items-center justify-evenly">
        <li onClick={() => handleNavigation('/communities')}>
          <HomeIcon className={getSvgcolor('/communities')} />
        </li>
        <li onClick={() => handleNavigation('/notification')}>
          <BellIcon height={26} className={getSvgcolor('/notification')} />
        </li>
        <li onClick={() => handleNavigation('/my-page')}>
          <PersonIcon className={getSvgcolor('/my-page')} />
        </li>
      </ul>
    </nav>
  );
};
