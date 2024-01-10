import React from 'react';
import { useTranslation } from 'react-i18next';

import { Money } from '../../../../all';

export function Footer(props){
  const { detail } = props;
  const { t } = useTranslation();

  let sum = 0;
  detail?.map(item => {
    sum += item?.amount
  })

  return (
    <div className='bo_footer_back'>
      <div className='bo_footer'>
        <div className='bo_footer0' />
        <p className='bo_footer1'>{t('order_bill.t_total')}</p>
        <p className='bo_footer2'><Money value={sum} fontSize={13} currency='₮' /></p>
      </div>
    </div>
  );
}