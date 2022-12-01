import Order from "./Order";
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination'

export default function OrderList(props) {

    return (
        <div>
            <Pagination size='sm'>
                <Pagination.First
                    onClick={() => { props.setCurrentPage(0); props.setLoading(true) }}
                    disabled={props.currentPage === 0}
                />

                {props.currentPage > 1 ?
                    <Pagination.Item
                        disabled={props.currentPage === 0}
                        onClick={() => { props.setCurrentPage(props.currentPage - 2); props.setLoading(true) }}>
                        {props.currentPage - 1}
                    </Pagination.Item> : null}

                {props.currentPage > 0 ?
                    <Pagination.Item
                        disabled={props.currentPage === 0}
                        onClick={() => { props.setCurrentPage(props.currentPage - 1); props.setLoading(true) }}>
                        {props.currentPage}
                    </Pagination.Item> : null}

                <Pagination.Item
                    active activeLabel=''>{props.currentPage + 1}
                </Pagination.Item>

                {props.currentPage < props.totalPages - 1 ?
                    <Pagination.Item onClick={() => { props.setCurrentPage(props.currentPage + 1); props.setLoading(true) }}>
                        {props.currentPage + 2}
                    </Pagination.Item> : null}

                {props.currentPage < props.totalPages - 2 ?
                    <Pagination.Item
                        onClick={() => { props.setCurrentPage(props.currentPage + 2); props.setLoading(true) }}>
                        {props.currentPage + 3}
                    </Pagination.Item> : null}

                <Pagination.Last
                    disabled={props.currentPage === props.totalPages - 1}
                    onClick={() => { props.setCurrentPage(props.totalPages - 1); props.setLoading(true); console.log("CHUJ") }}
                />
            </Pagination>
            <ListGroup>
                {!props.orders.length ? <h5>Empty</h5> : null}
                {props.orders.map(s => (<Order data={s} />))}
            </ListGroup>
        </div>

    )
}