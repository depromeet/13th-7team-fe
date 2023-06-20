import Image from 'next/image';

import { CommunityLogoImage } from '~/modules/CommunityProfile';
import { CommunityDetailModel } from '~/types/community';

type CommunityDetailProps = Omit<CommunityDetailModel, 'communityId'>;

export const CommunityDetail = ({
  logoImageUrl,
  coverImageUrl,
  title,
  idCardCount,
  description,
}: CommunityDetailProps) => {
  return (
    <div>
      <div className="relative h-[calc(100vw*0.48)]">
        <Image
          fill
          src={coverImageUrl}
          alt={`${title} cover image`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="w-full">
        <div className="absolute mx-[20px] -mt-60pxr flex items-center gap-12pxr rounded-3xl border border-grey-100 bg-white p-16pxr">
          <CommunityLogoImage logoImageUrl={logoImageUrl} />
          <div className="flex w-full flex-col gap-8pxr">
            <p className="text-sm font-medium text-gray-800">{`주민 ${idCardCount}`}</p>
            <p className="text-detail text-gray-800">{`${description}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
