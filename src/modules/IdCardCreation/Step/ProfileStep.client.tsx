'use client';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const fieldTitleStyle = 'text-b2  text-grey-500';
const fieldStyle =
  'border-[0.5px] border-solid mt-2px rounded-[6px] border-grey-100 bg-grey-50 w-full text-b1 focus:outline-none focus:border-primary-500';
const title = '이웃 주민에게\n 자신을 소개해주세요!';
const TEXT_MAX_LENGTH = 50;

export const ProfileStep = () => {
  const { register, watch } = useFormContext();
  const [textCount, setTextCount] = useState(0);
  const onTextareaHandler = useCallback(e => {
    e.target.value = e.target.value.slice(0, TEXT_MAX_LENGTH);
    setTextCount(e.target.value.length);
  }, []);
  console.log(watch());
  return (
    <div>
      <h1 className="text-h1">{title}</h1>
      <div className="mx-auto mt-20px h-[88px] w-[92px] rounded-full bg-amber-500" />
      <div className={`${fieldTitleStyle}`}>이름</div>
      <input {...register('nickname', { required: true })} className={`${fieldStyle} p-12px`} />
      <div className={`${fieldTitleStyle} mt-16px`}>소개</div>
      <textarea
        {...register('aboutMe', { maxLength: TEXT_MAX_LENGTH })}
        onChange={onTextareaHandler}
        className={`${fieldStyle} p-12px`}
      />
      <div className="text-right text-detail text-grey-500">{textCount}/50</div>
    </div>
  );
};
