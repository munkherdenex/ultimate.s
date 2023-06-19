import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sendRequest } from '../../../services';
import { Error1, Overlay, Prompt } from '../../../components/all';
import { Main, List, ButtonRow } from '../../../components/management/adjust/add';

export function AdjustAdd(){
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(null);
  const [header, setHeader] = useState(null);
  const [detail, setDetail] = useState([]);
  const [siteId, setSiteId] = useState({ value: null });
  const [notes, setNotes] = useState({ value: '' });
  const [search, setSearch] = useState({ value: null });
  const [dItems, setDItems] = useState([]);
  const [saved, setSaved] = useState(false);
  const { user, token }  = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(saved) onClickCancel();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);


  const onClickCancel = () => navigate({ pathname: '/management/adjust' });

  const validateData = status => {
    let isSiteValid = siteId?.value || siteId?.value === 0;
    let length = detail?.filter(item => item?.qty)?.length;
    if(isSiteValid && length){
      let adjustNo = header?.adjustNo ?? 0;
      let inAdjust = { adjustNo, orderNo: 0, siteID: siteId?.value, status, descr: notes?.value, rowStatus: adjustNo ? 'U' : 'I' };
      let inAdjustItems = [];
      detail?.forEach(item => {
        if(item?.qty){
          item.adjustNo = adjustNo;
          inAdjustItems.push(item);
        }
      })
      dItems?.forEach(it => inAdjustItems?.push({...it, rowStatus: 'D'}));
      return { inAdjust, inAdjustItems };
    } else {
      if(!(siteId?.value || siteId?.value === 0)) setSiteId({ value: siteId?.value, error: t('error.not_empty') });
      if(!length) setSearch({ value: null, error: t('adjust.items_error') });
      return false;
    }
  }

  const onClickSave = async status => {
    let data = validateData(status);
    if(data){
      onLoad();
      const response = await dispatch(sendRequest(user, token, 'Txn/ModAdjust', data, null, 'GET'));
      if(response?.error) onError(response?.error, true);
      else onSuccess(t('adjust.add_success'));
    }
  }

  const onClickDelete = async () => {
    // comment
    // let data = validateData(0, true);
    // if(data){
    //   onLoad();
    //   const response = await dispatch(sendRequest(user, token, 'Txn/ModReceiptPO', data));
    //   if(response?.error) onError(response?.error, true);
    //   else onSuccess(t('order.order_delete_success'), header?.orderNo);
    // }
  }

  const onLoad = () => {
    setError(null);
    setLoading(true);
    setEdited(false);
  }

  const onError = (err, edited) => {
    setError(err);
    setEdited(edited);
    setLoading(false);
  }

  const onSuccess = msg => {
    if(msg){
      message.success(msg);
      setSaved(true);
    }
    setLoading(false);
  }


  let mainProps = { setError, setEdited, header, detail, siteId, setSiteId, notes, setNotes };
  let listProps = { detail, setDetail, search, setSearch, siteId, setEdited, setDItems };
  let btnProps = { onClickCancel, onClickSave: () => onClickSave(1), onClickDraft: () => onClickSave(0), onClickDelete, header };

  return (
    <Overlay className='i_container' loading={loading}>
      <Prompt edited={edited} />
      {error && <Error1 error={error} />}
      <div className='i_scroll'>
        <form>
          <Main {...mainProps} />
          <div className='gap' />
          <div className='po_back' id='po_back_invt'>
            <List {...listProps} />
          </div>
        </form>
      </div>
      <ButtonRow {...btnProps} />
    </Overlay>
  );
}

/**
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import '../../../css/invt.css';
import '../../../css/order.css';
import { sendRequest } from '../../../services';
import { Error1, Overlay, Prompt } from '../../../components/all';
import { Main, Items, Additional, ButtonRow } from '../../../components/management/order/add';
import { add } from '../../../helpers';

export function OrderAdd(){
  const { t } = useTranslation();
  const [loading1, setLoading1] = useState(false);
  const [vendId, setVendId] = useState({ value: null });
  const [orderDate, setOrderDate] = useState({ value: moment() });
  const [reqDate, setReqDate] = useState({ value: null });
  const [payType, setPayType] = useState({ value: null });
  const [items, setItems] = useState([]);
  const [adds, setAdds] = useState([]);
  const [dAdds, setDAdds] = useState([]);
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const [editing, setEditing] = useState(null);
  const [isOTC, setIsOTC] = useState(false);
  const [otcInfo, setOtcInfo] = useState(null);
  const [totals, setTotals] = useState({ discount: 0, to_pay: 0 });
  const [discount, setDiscount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    user?.msRole?.webManageItem !== 'Y' ? navigate({ pathname: '/' }) : getData();
    return () => setEdited(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const getData = async () => {
    let vendor = searchParams?.get('vendId');
    let orderNo = searchParams?.get('orderNo');
    let copying = searchParams?.get('copying');
    if(vendor){
      setOrder(null);
      setVendId({ value: parseInt(vendor) });
      // getItems(vendor);
    } else if(orderNo)
      getOrder(orderNo, !copying);
  }

  const getOrder = async (orderNo, editing) => {
    onLoad();
    const response = await dispatch(sendRequest(user, token, 'Txn/Order/Get?OrderNo=' + orderNo));
    if(response?.error) onError(response?.error, false);
    else {
      let order = response?.data && response?.data[0];
      setOrder(order?.poOrder);
      setEditing(editing);
      let total1 = 0, total2 = 0;
      order?.poOrderItems?.forEach(item => {
        item.rowStatus = editing ? 'U' : 'I';
        if(!editing) item.orderItemId = -1;
        item.name = item?.invtName;
        total1 += item?.totalCost ?? 0;
        item.allowDecimal = item?.isEach === 'N'
      });
      order?.poOrderAddCosts?.forEach(item => {
        item.rowStatus = editing ? 'U' : 'I';
        if(!editing) item.orderAdditionalId = -1;
        total2 += item?.addCostAmount ?? 0;
      });
      setItems(order?.poOrderItems);
      setAdds(order?.poOrderAddCosts);
      setTotal1(total1);
      setTotal2(total2);
      onSuccess();
    }
  }

  const getItems = async (vendor, site) => {
    onLoad();
    let filter = [{fieldName: "VendID", value: vendor}, {fieldName: "SiteID", value: site}]
    const response = await dispatch(sendRequest(user, token, 'Inventory/GetInventory/Custom', filter));
    if(response?.error) onError(response?.error, false);
    else {
      let items = response?.data?.map(item => {
        let invt = item?.msInventory;
        return { orderItemId: -1, invtId: invt?.invtId, name: invt?.name, orderQty: 0, totalCost: 0, cost: invt?.cost, siteQty: invt?.siteQty,
          siteOrderQty: invt?.siteOrderQty, invtCode: '', rowStatus: 'I', sku: invt?.sku, barCode: invt?.barCode, batchQty: invt?.batchQty ? invt?.batchQty : 1,
          orderTotalQty: 0, allowDecimal: invt?.isEach === 'N' };
      });
      setItems(items);
      onSuccess();
    }
  }

  const onClickCancel = () => {
    order?.orderNo
      ? navigate({ pathname: '/management/order_list/order', search: createSearchParams({ orderNo: order?.orderNo }).toString() })
      : navigate('/management/order_list');
  }

  

  
  

  let mainProps = { setError, setEdited, vendId, setVendId, siteId, setSiteId, orderDate, setOrderDate, reqDate, setReqDate, notes, setNotes, setLoading: setLoading1,
    order, editing, payType, setPayType, total: add(total1, total2), isOTC, setIsOTC, otcInfo, setOtcInfo, totals, setTotals, discount, setDiscount, getItems };
  let itemsProps = { items, setItems, setDItems, setEdited, total: total1, setTotal: setTotal1, search, setSearch };
  let addProps = { adds, setAdds, setDAdds, setEdited, total1, total2, setTotal: setTotal2 };
  

  return (
    
  );
}
 */