'use client';

import { useRouter } from 'next/navigation';

import { useGetInvitationCodeIsValid, usePostCommunityJoin } from '~/api/domain/community.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { Template } from '~/components/Template';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { setCookie } from '~/utils/cookie.util';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

const title = '당신을 디프만 행성으로\n 초대합니다';

const InvitationPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const invitationCode = params.code;

  // TODO: 잘못된 행성 코드인 경우, 에러 메시지 보여주기(후순위)
  const { data: validPlanet, isLoading: isValidPlanetLoading } = useGetInvitationCodeIsValid(
    params.code,
    {
      onError: () => {
        router.replace('/');
      },
    },
  );
  const communityId = validPlanet?.communityId;
  const userId = getUserIdClient();
  const {
    data: userInfo,
    isRefetching,
    isInitialLoading,
  } = useGetUserInfo({
    enabled: !!(communityId && userId),
  });
  const { mutateAsync } = usePostCommunityJoin();

  const onClick = async () => {
    if (communityId && userId) {
      await mutateAsync({ communityId });
      if (userInfo?.characterType) {
        router.push(`/planet/${communityId}`);
      } else {
        router.push('/onboarding');
      }
    } else {
      setCookie(ROUTE_COOKIE_KEYS.invitationCode, invitationCode);
      router.push('/auth/signin');
    }
  };
  if (isValidPlanetLoading) return null;

  return (
    <Template>
      <Template.Title className="text-grey-900">
        <h1>{title}</h1>
      </Template.Title>
      <Template.Content />
      <Template.Button disabled={isInitialLoading || isRefetching} onClick={onClick}>
        시작하기
      </Template.Button>
    </Template>
  );
};

export default InvitationPage;
