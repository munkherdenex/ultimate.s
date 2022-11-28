import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, DynamicAIIcon } from '../../all';
import { SearchInput } from '../../invt/inventory/list/SearchInput';

export function List(props){
  const { size } = props;
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const onClickSearch = () => setShowSearch(!showSearch);

  const handleEnter = value => {
    console.log(value);
  }

  const width = showSearch ? 0 : 50;
  const width1 = !showSearch ? 0 : (size?.width > 465 ? 320 : (size?.width - 30));
  console.log('width1', width1);
  const style = { width, overflow: 'hidden', transition: 'width 0.2s ease-in' };
  const exportProps = { label: t('page.export'), className: 'rp_list_select', data: t('report_receipt.export') };
  const searchProps = { className: 'ih_search', name: 'AiOutlineSearch', onClick: onClickSearch };
  const inputProps = { showSearch, setShowSearch, handleEnter, search, setSearch, width: width1, className: 'rp_list_search_back' };

  return (
    <div className='rp_list'>
      <div className='rp_list_filter'>
        <Dropdown {...exportProps}  />
        <div className='rp_list_filter_icon' style={style}><DynamicAIIcon {...searchProps} /></div>
        <SearchInput {...inputProps} />
      </div>
    </div>
  );
}