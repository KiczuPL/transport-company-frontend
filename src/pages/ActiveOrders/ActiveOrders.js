import React from 'react'

import TopNavbar from '../../components/navbar'
import OrderList from '../../components/OrderList'

export default function ActiveOrders(props) {

    return (
        <div>
            <TopNavbar />
            <OrderList orderTypes={['PLACED', 'IN_REALIZATION']} label='Active orders' />
        </div>
    )
}