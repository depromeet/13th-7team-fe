/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '~/components/Button';
import { useConfirmPopup } from '~/components/ConfirmPopup';

import { CopyInvitation } from './index';

const meta: Meta<typeof CopyInvitation> = {
  title: 'components/CopyInvitation',
  component: CopyInvitation,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CopyInvitation>;

export const Primary: Story = {
  render: () => {
    const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();
    const [confirmResult, setConfirmResult] = useState('Init');

    const onClickConfirm = async () => {
      const isOk = await openPopup();
      setConfirmResult(() => (isOk ? 'Ok' : 'Cancel'));
      closePopup();
    };

    return (
      <div className="flex w-full flex-col items-center justify-center gap-20pxr">
        <Button onClick={onClickConfirm} type="button" size="medium" color="primary">
          Confirm팝업 실행하기
        </Button>
        <h1 className="text-h1">{confirmResult}</h1>
        {isOpen && <CopyInvitation confirm={confirm} />}
      </div>
    );
  },
};
