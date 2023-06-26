import {
  NOTIFICATION_TYPE,
  NOTIFICATION_TYPE_ACTION,
  NotificationModel,
} from '~/types/notification';

import { UserProfile } from '../CommentList/CommentCommon';

export const NotificationItem = ({
  notificationType,
  notificationStatus,
  createdAt,
  communityDto,
  commentDto,
  userDto,
}: NotificationModel) => {
  return (
    <li className="flex list-none gap-3">
      <div className="relative">
        {notificationStatus === 'UNREAD' && (
          <span className="absolute -left-10pxr top-13pxr h-6pxr w-6pxr rounded-full bg-blue-500"></span>
        )}
        <UserProfile profileImageUrl={userDto.fromUserProfileImageUrl} />
      </div>
      <div>
        <p className="mb-2 text-b2 font-normal">
          <b className="font-medium">{userDto.fromUserNickname}</b>님 이{' '}
          <b className="font-medium">회원님의 {NOTIFICATION_TYPE[notificationType]}</b>
          {NOTIFICATION_TYPE_ACTION[notificationType]}: {commentDto.comment}
        </p>
        <div className="text-detail text-gray-500">
          <span className="mr-2">{communityDto.communityName}</span>
          {/* TODO: 시간 보여주는 방식 수정 */}
          <span>{createdAt}</span>
        </div>
      </div>
    </li>
  );
};
