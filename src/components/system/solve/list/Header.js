import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getConstants } from '../../../../services';
import { PlainRange, PlainSelect } from '../../../all';

export function Header(props){
  const { setError, onSearch, size } = props;
  const { t } = useTranslation();
  const [status, setStatus] = useState(-1);
  const [states, setStates] = useState([{valueNum: -1, valueStr1: t('order.all_status')}]);
  const [date, setDate] = useState([moment().startOf('month'), moment()]);
  const [loading, setLoading] = useState(false);
  const [classH, setClassH] = useState('th_header1');
  const { user, token }  = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    onFocusStatus();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(size?.width >= 870) setClassH('th_header1');
    else if(size?.width < 870 && size?.width >= 660) setClassH('th_header2');
    else setClassH('th_header3');
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size?.width]);

  const onFocusStatus = async () => {
    if(!states?.length || states?.length === 1){
      setError && setError(null);
      setLoading('status');
      const response = await dispatch(getConstants(user, token, 'msVATrequest_Status'));
      if(response?.error) setError && setError(response?.error);
      else {
        let data = [...[{valueNum: -1, valueStr1: t('order.all_status')}], ...response?.data];
        setStates(data?.sort((a, b) => a.valueNum - b.valueNum));
      }
      setLoading(null);
    }
  }

  const onHide = () => {
    let query = '?BeginDate=' + date[0]?.format('yyyy.MM.DD') + '&EndDate=' + date[1]?.format('yyyy.MM.DD');
    if(status !== -1) query += '&Status=' + status;
    onSearch(query);
  }

  const onChangeStatus = value => {
    setStatus(value);
    let query = '?BeginDate=' + date[0]?.format('yyyy.MM.DD') + '&EndDate=' + date[1]?.format('yyyy.MM.DD');
    if(value !== -1) query += '&Status=' + value;
    onSearch(query)
  }

  const id = size?.width > 870 ? 'ih_large' : 'ih_small';

  const classBack = 'th_select_back', classLabel = 'ih_select_lbl', className = 'ih_select';
  const dateProps = { label: t('page.date'), value: date, setValue: setDate, placeholder: t('time.select_date'), onHide,
    className: 'rh_date' };
  const bStyle = { maxWidth: size?.width > 780 ? 180 : ((size?.width - 52) / 2) };
  const statProps = { value: status, setValue: onChangeStatus, data: states, s_value: 'valueNum', s_descr: 'valueStr1',
    label: t('order.status'), onFocus: onFocusStatus, loading: loading === 'status', classBack, classLabel, className, bStyle };

  return (
    <div className='ih_header' id={id} style={{paddingTop: 0}}>
      <div className={classH} style={{marginTop: 0}}>
        <PlainRange {...dateProps} />
        <div className='th_header_s'>
          <PlainSelect {...statProps} />
        </div>
      </div>
    </div>
  );
}