import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import { Check, PaginationTable, Money } from '../all/all_m';
import { Table  } from '../all/all_m';


export function List(props){
  const { onClickAdd, data, setData, loaded, setShow, autoResetExpanded, checked, setChecked, size} = props;
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState([]);



  useEffect(() => {
    const style = { display: 'flex', alignItems: 'center', justifyContent: 'center'};
    setColumns([
      {
        id: 'check', noSort: true, isBtn: true,
        Header: <div style={style}><Check checked={checked} onClick={onClickCheckAll} /></div>,
        Cell: ({ row }) => <div style={style}><Check checked={row?.original?.checked} onClick={e => onClickCheck(e, row)} /></div>,
      },
      { Header: t('customer.t_name'), accessor: 'custName' },
      { Header: t('customer.addr'), accessor: 'phone', customStyle: { width: 120 },
        Cell: props => <div >{props.value}</div>},
      { Header: t('customer.first_visit'), accessor: 'createdDate' , customStyle: { width: 150 }, 
        Cell: props => <div style={{fontSize: 13.5, paddingRight: 15}}>{props.value}</div>},
      { Header: t('customer.last_visit'), accessor: 'lastUpdate',customStyle: { width: 150 },
        Cell: props => <div style={{fontSize: 13.5, paddingRight: 15}}>{props.value}</div> },
      { Header: <div style={{textAlign: 'right'}}>{t('customer.visit_total')}</div>, accessor: 'total', customStyle: { width: 120 },
        Cell: props => <div style={{textAlign: 'right', paddingRight: 15}}>{props?.value ? props?.value : 0 }</div>},
      { Header: <div style={{textAlign: 'right'}}>{t('customer.total_spent')}</div>, accessor: 'total_spent', customStyle: { width: 150 }, 
        Cell: props => <div style={{textAlign: 'right', paddingRight: 15}}><Money value={props?.value} fontSize={15} /></div>},
      { Header: <div style={{textAlign: 'right'} }>{t('customer.total_balance')}</div> , accessor: 'total_balance' , customStyle: { width: 100 },
      Cell: props => <div style={{textAlign: 'right', paddingRight: 15}}>{props?.value ? props?.value : 0 }</div>},
    ]);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n?.language, loaded, checked]);

  const onClickCheckAll = () => {
    setShow(!checked);
    setChecked(!checked);
    setData(old => old.map((row, index) => {
      return { ...old[index], checked: !checked };
    }));
  }

  const onClickCheck = (e, item) => {
    e?.preventDefault();
    setChecked(false);
    let count = false;
    setData(old => old.map((row, index) => {
      if(index === item?.index){
        if(!row?.checked) count = true;
         console.log(row)
        return { ...old[item?.index], checked: !row?.checked };
      } else {
        if(row?.checked) count = true;
        return row;
      }
    }));
  
    setShow(count);
  }

 

  const maxHeight = size?.width > 780
  ? 'calc(100vh - var(--header-height) - var(--page-padding) * 3 - 7px - 51px - 10px - 37px)'
  : 'calc(100vh - var(--header-height) - var(--page-padding) * 3 - 7px - 105px - 10px - 37px)';
const tableInstance = useTable( { columns, data, autoResetPage: false, autoResetExpanded, initialState: { pageIndex: 0, pageSize: 25 },
    onClickCheckAll, checked, onClickCheck}, useSortBy, usePagination, useRowSelect);
  const tableProps = { tableInstance, onRowClick: onClickAdd, };

  return (
    <div >
      <div style={{overflowX: 'scroll'}} >
        <div id='paging' style={{marginTop: 10, overflowY: 'scroll', maxHeight, minWidth : 720}}>
              <Table {...tableProps} />
        </div>
      </div>
      <PaginationTable {...tableProps} />
    </div>
  )
}