'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker/locale/ko';
import Image from 'next/image';
import { useState } from 'react';

import { DashIcon, HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentReply } from '~/modules/CommentReply';
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  commentId,
  content,
  createdAt,
  commentReplyLikeInfo,
  commentReplyInfos,
}: CommentProps) => {
  const [isShowReplyList, setIsShowReplyList] = useState(false);
  const profileImageUrl = faker.image.avatar();
  const nickname = faker.person.fullName();

  const onClickShowReplyList = () => {
    setIsShowReplyList(true);
  };

  const onClickHideReplyList = () => {
    setIsShowReplyList(false);
  };

  return (
    <div className="flex w-full gap-12pxr px-layout-sm">
      <div className="h-32pxr w-32pxr flex-shrink-0 overflow-hidden rounded-full">
        <Image width={32} height={32} src={profileImageUrl} alt="profile image" />
      </div>
      <div>
        <h4 className="flex gap-4pxr">
          <span className="text-b3 text-gray-800">{nickname}</span>
          <span className="text-b3 text-grey-500">1분전</span>
        </h4>
        <div className="flex gap-12pxr">
          <div>
            <p className="text-b3 text-black "> {content}</p>
            <button className="mt-4pxr text-b3 text-grey-600">자세히보기</button>
            <div className="mt-8pxr flex gap-16pxr">
              <span className="text-detail text-grey-500">좋아요 N개</span>
              <button className="text-detail text-grey-500">답글 달기</button>
            </div>
          </div>
          <div>
            {commentReplyLikeInfo.isLikedByCurrentUser ? (
              <HeartFillIcon className="fill-blue-500" />
            ) : (
              <HeartIcon className="fill-grey-400" />
            )}
          </div>
        </div>
        {isShowReplyList ? (
          <button type="button" onClick={onClickHideReplyList} className="mt-24pxr flex gap-8pxr">
            <DashIcon />
            <span className="text-detail font-semibold text-grey-500">답글 숨기기</span>
          </button>
        ) : (
          <button type="button" onClick={onClickShowReplyList} className="mt-24pxr flex gap-8pxr">
            <DashIcon />
            <span className="text-detail font-semibold text-grey-500">
              답글 {commentReplyInfos.length}개 더보기
            </span>
          </button>
        )}
        {isShowReplyList && (
          <ul className="mt-24pxr flex flex-col gap-24pxr">
            {commentReplyInfos.map(commentReply => (
              <CommentReply key={commentReply.commentReplyId} {...commentReply} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
