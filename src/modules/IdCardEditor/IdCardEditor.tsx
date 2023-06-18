/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useEditIdCardDetail } from '~/api/domain/idCard.api';
import { TopNavigation } from '~/components/TopNavigation';
import { IdCardEditorForm } from '~/modules/IdCardEditor/Form';
import { editorSteps, KEYWORD_CONTENT_STEP } from '~/modules/IdCardEditor/IdCardEditor.constant';
import { EditorSteps, IdCardEditorFormValues } from '~/modules/IdCardEditor/IdCardEditor.type';
import { IdCardEditorFormModel } from '~/types/idCard';

type IdCardEditorProps = IdCardEditorFormModel;

export const IdCardEditor = ({
  idCardId,
  profileImageUrl,
  nickname,
  aboutMe,
  keywords,
}: IdCardEditorProps) => {
  const { mutate: mutateEditIdCardDetail } = useEditIdCardDetail();

  const methods = useForm<IdCardEditorFormValues>({
    defaultValues: {
      nickname,
      aboutMe,
      profileImageUrl,
      keywords,
    },
  });

  const onSubmit = async (idCardInfo: IdCardEditorFormValues) => {
    mutateEditIdCardDetail({ idCardId, ...idCardInfo });
  };

  const router = useRouter();
  const [stepOrder, setStepOrder] = useState<number>(KEYWORD_CONTENT_STEP);

  const title = editorSteps[stepOrder] === 'PROFILE' ? '주민 정보 수정' : '주민증 수정';
  const isEntry = stepOrder === KEYWORD_CONTENT_STEP;

  const onClickMoveTargetStep = (targetStep: EditorSteps) => {
    const stepIndex = editorSteps.findIndex(step => step === targetStep);
    setStepOrder(stepIndex);
  };

  const onClickBackButton = () => {
    if (isEntry) {
      router.back();
      return;
    }
    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  const onClickCompleteButton = () => {
    if (isEntry) {
      methods.handleSubmit(onSubmit)();
      // TODO: onSubmit이 정상 실행될 때만 뒤로 가기: useMutation 정상 실행여부 판단하기
      router.back();
      return;
    }
    setStepOrder(KEYWORD_CONTENT_STEP);
  };

  return (
    <FormProvider {...methods}>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton onClickBackButton={onClickBackButton} />
        </TopNavigation.Left>
        <TopNavigation.Title>{title}</TopNavigation.Title>
        <TopNavigation.Right>
          <button onClick={onClickCompleteButton} className="text-h5 font-semibold text-blue-500">
            완료
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      {['PROFILE', 'KEYWORD', 'KEYWORD_CONTENT'].includes(editorSteps[stepOrder]) && (
        <div className="pt-28pxr">
          <IdCardEditorForm
            steps={editorSteps}
            stepOrder={stepOrder}
            onClickMoveTargetStep={onClickMoveTargetStep}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </FormProvider>
  );
};
