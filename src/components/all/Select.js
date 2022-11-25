import React from 'react';
import { Select as AntSelect } from 'antd';
import { BsCheckLg } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

import { Button } from './Button';
const { Option } = AntSelect;

export function Select(props){
  const { value, setValue, label, placeholder, data, setError, setEdited, s_value, s_descr, mode, inRow, onFocus, loading, disabled } = props;
  const { t } = useTranslation();
  
  let maxTagPlaceholder = value?.value?.length === data?.length ? t('cashier.pay_shop3') : (value?.value?.length + t('cashier.pay_shop4'));

  const handleChange = e => {
    setValue({ value: e });
    setError && setError(null);
    setEdited && setEdited(true);
  }

  const renderItem = (item, index) => {
    return (<Option key={index} value={item[s_value ?? 'value']}>{item[s_descr ?? 'label']}</Option>);
  }

  const style = value?.error ? { borderColor: '#e41051', color: '#e41051' } : {};
  const backStyle = inRow ? {...style, ...{ margin: '0 0 0 0' }} : style;

  return (
    <div style={inRow ? { flex: 1 } : {}}>
      <div className='select_back' style={backStyle}>
        <p className='select_lbl' style={style}>{label}</p>
        <AntSelect
          mode={mode}
          loading={loading}
          disabled={disabled}
          className='select_m'
          showSearch
          filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={handleChange}
          value={value?.value}
          onFocus={onFocus}
          maxTagCount={0}
          maxTagPlaceholder={maxTagPlaceholder}
          // suffixIcon={<DynamicAIIcon name='AiFillCaretDown' className='select_icon' style={style} />}
          placeholder={placeholder}>
          {data?.map(renderItem)}
        </AntSelect>
      </div>
      {value?.error && <p className='f_input_error'>{label} {value?.error}</p>}
    </div>
  );
}

export function PlainSelect(props){
  const { value, setValue, placeholder, data, s_value, s_descr, className, classBack, label, onFocus, loading, isIndex, classLabel } = props;
  
  const renderItem = (item, index) => {
    return (<Option key={index} value={isIndex ? index : item[s_value ?? 'value']}>{item[s_descr ?? 'label']}</Option>);
  }

  return (
    <div className={classBack}>
      {label && <p className={classLabel ?? 'p_select_lbl'}>{label}</p>}
      <AntSelect
        className={className}
        showSearch
        filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={setValue}
        value={value}
        loading={loading}
        onFocus={onFocus}
        // suffixIcon={<DynamicAIIcon name='AiFillCaretDown' className='select_icon' />}
        placeholder={placeholder}>
        {data?.map(renderItem)}
      </AntSelect>
    </div>
  );
}

export function CustomSelect(props){
  const { value, setValue, placeholder, data, className, classBack, label, onFocus, loading, renderItem, filterOption, setError, setEdited } = props;

  const handleChange = e => {
    setValue({ value: e });
    setError && setError(null);
    setEdited && setEdited(true);
  }

  const style = value?.error ? { borderColor: '#e41051', color: '#e41051' } : {};
  
  return (
    <div className={classBack}>
      <div className='input_border' style={style}>
        {label && <p className='p_select_lbl' style={style}>{label}</p>}
        <AntSelect
          className={className}
          showSearch
          filterOption={filterOption}
          onChange={handleChange}
          value={value?.value}
          loading={loading}
          onFocus={onFocus}
          placeholder={placeholder}>
          {data?.map(renderItem)}
        </AntSelect>
      </div>
      {value?.error && <p className='f_input_error'>{label} {value?.error}</p>}
    </div>
  );
}

export function MultiSelect(props){
  const { value, setValue, placeholder, data, s_value, s_descr, className, classBack, label, onFocus, loading, isIndex, maxTag, onHide } = props;
  const { t } = useTranslation();
  
  const renderItem = (item, index) => {
    return (<Option key={index} value={isIndex ? index : item[s_value ?? 'value']}>{item[s_descr ?? 'label']}</Option>);
  }

  const onClick = () => {
    let all = data?.map(item => item[s_value ?? 'value']);
    setValue(all);
  }

  const onDropdownVisibleChange = show => {
    if(!show) onHide();
  }

  const dropdownRender = menu => {
    return (
      <>
        <Button className='multi_btn' text={t('time.all')} onClick={onClick} />
        {menu}
      </>
    );
  }

  return (
    <div className={classBack}>
      {label && <p className='p_select_lbl'>{label}</p>}
      <AntSelect
        className={className}
        showSearch
        filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={setValue}
        value={value}
        loading={loading}
        onFocus={onFocus}
        mode='multiple'
        menuItemSelectedIcon={<BsCheckLg />}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownRender={dropdownRender}
        maxTagCount={0}
        maxTagPlaceholder={maxTag}
        placeholder={placeholder}>
        {data?.map(renderItem)}
      </AntSelect>
    </div>
  );
}