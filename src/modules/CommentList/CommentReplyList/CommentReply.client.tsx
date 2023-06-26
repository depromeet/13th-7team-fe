/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Content,
  Header,
  LikeCount,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';


import { CommentModel, CommentReplyDeleteRequest, CommentReplyModel } from '~/types/comment';

import { CommentReplyDeleteButton } from './CommentReplyDeleteButton.client';
import { CommentReplyLike } from '~/modules/CommentList/CommentReplyList/CommentReplyLike.client';

type CommentProps = Pick<CommentModel, 'idCardId' | 'commentId'> & CommentReplyModel;

export const CommentReply = ({
  idCardId,
  commentId,
  commentReplyId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
}: CommentProps) => {
  const { userId, profileImageUrl, nickname } = writerInfo;

  return (
    <li className="flex w-full gap-12pxr px-[calc(layout-sm+42px)]">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount commentReplyLikeInfo={commentReplyLikeInfo} />
              <ReplySubmitButton />
              <CommentReplyDeleteButton
                idCardsId={idCardsId}
                commentId={commentId}
                commentReplyId={commentReplyId}
              />
            </div>
          </div>
          <div>
            <CommentReplyLike
              idCardId={idCardId}
              commentId={commentId}
              commentReplyId={commentReplyId}
              commentReplyLikeInfo={commentReplyLikeInfo}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
