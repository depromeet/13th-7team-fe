'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import {
  Content,
  Header,
  LikeCount,
  LikeIcon,
  ReplyHideButton,
  ReplyShowButton,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
import { CommentReplyList } from '~/modules/CommentList/CommentReplyList';
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  commentId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
  commentReplyInfos,
}: CommentProps) => {
  const { userId, profileImageUrl, nickname } = writerInfo;
  const [isShowReplyList, setIsShowReplyList] = useState(false);

  const onClickShowReplyList = () => {
    setIsShowReplyList(true);
  };

  const onClickHideReplyList = () => {
    setIsShowReplyList(false);
  };

  return (
    <li className="flex w-full gap-12pxr px-layout-sm">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount commentReplyLikeInfo={commentReplyLikeInfo} />
              <ReplySubmitButton />
            </div>
          </div>
          <div>
            <LikeIcon commentReplyLikeInfo={commentReplyLikeInfo} />
          </div>
        </div>
        <ReplyShowButton
          isShowReplyList={isShowReplyList}
          onClickShowReplyList={onClickShowReplyList}
          commentReplyInfos={commentReplyInfos}
        />
        <CommentReplyList isShowReplyList={isShowReplyList} commentReplyInfos={commentReplyInfos} />
        <div className="mt-24pxr">
          <ReplyHideButton
            isShowReplyList={isShowReplyList}
            onClickHideReplyList={onClickHideReplyList}
          />
        </div>
      </div>
    </li>
  );
};
