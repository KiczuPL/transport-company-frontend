import { Pagination } from "react-bootstrap";

export default function PaginationBlock(props) {
  return (
    <Pagination size="sm">
      <Pagination.First
        onClick={() => {
          props.setCurrentPage(0);
          props.setLoading(true);
        }}
        disabled={props.currentPage === 0}
      />

      {props.currentPage - 3 > 0 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage - 4);
            props.setLoading(true);
          }}
        >
          {props.currentPage - 3}
        </Pagination.Item>
      ) : null}
      {props.currentPage - 2 > 0 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage - 3);
            props.setLoading(true);
          }}
        >
          {props.currentPage - 2}
        </Pagination.Item>
      ) : null}

      {props.currentPage - 1 > 0 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage - 2);
            props.setLoading(true);
          }}
        >
          {props.currentPage - 1}
        </Pagination.Item>
      ) : null}

      {props.currentPage > 0 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage - 1);
            props.setLoading(true);
          }}
        >
          {props.currentPage}
        </Pagination.Item>
      ) : null}

      <Pagination.Item active activeLabel="">
        {props.currentPage + 1}
      </Pagination.Item>

      {props.currentPage < props.totalPages - 1 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage + 1);
            props.setLoading(true);
          }}
        >
          {props.currentPage + 2}
        </Pagination.Item>
      ) : null}

      {props.currentPage < props.totalPages - 2 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage + 2);
            props.setLoading(true);
          }}
        >
          {props.currentPage + 3}
        </Pagination.Item>
      ) : null}

      {props.currentPage < props.totalPages - 3 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage + 3);
            props.setLoading(true);
          }}
        >
          {props.currentPage + 4}
        </Pagination.Item>
      ) : null}

      {props.currentPage < props.totalPages - 4 ? (
        <Pagination.Item
          onClick={() => {
            props.setCurrentPage(props.currentPage + 4);
            props.setLoading(true);
          }}
        >
          {props.currentPage + 5}
        </Pagination.Item>
      ) : null}

      <Pagination.Last
        disabled={
          props.currentPage === props.totalPages - 1 || props.totalPages === 0
        }
        onClick={() => {
          props.setCurrentPage(props.totalPages - 1);
          props.setLoading(true);
        }}
      />
    </Pagination>
  );
}
