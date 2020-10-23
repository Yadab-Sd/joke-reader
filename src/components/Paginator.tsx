import React, { useState, useEffect, ReactElement } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getData } from '../utils/store';
import { Keys, Limits } from '../utils/constants';

export interface JokeBody {
  id: string;
  category: string;
  type: string;
  flags: string[];
  content: string;
  delivery: string;
}

interface PaginationProps {
  page: number;
}

const Paginator = ({ page }: PaginationProps): ReactElement => {
  const [jokes, setJokes] = useState<JokeBody[]>([]);

  useEffect(() => {
    const gainedData = getData(Keys.jokes);
    if (gainedData?.length) setJokes(gainedData as any);
  }, [page]);

  return (
    <Container>
      <Row className='mt-10 pb-10'>
        <Col xs={12} className='d-flex'>
          <div className='pagination'>
            {/* pagination hold 3 pages at a time */}
            <Link
              to={`?page=${page > 1 ? page - 1 : page}`}
              className={page > 1 ? 'previous active' : 'previous'}
            >
              Previous
            </Link>
            {/* A single page can contain Limits.pageLimit itmes maximum */}
            {jokes
              ?.slice(0, Math.floor(jokes?.length / Limits.pageLimit))
              .map((joke, i) => (
                <Link
                  to={`?page=${Math.floor(page / Limits.pageLimit) + i + 1}`}
                  className={
                    Math.floor(page / Limits.pageLimit) + i + 1 == page
                      ? 'active'
                      : ''
                  }
                >
                  {Math.floor(page / Limits.pageLimit) + i + 1}
                </Link>
              ))}
            <Link
              to={`?page=${
                page < Math.ceil(jokes?.length / Limits.pageLimit)
                  ? page + 1
                  : page
              }`}
              className={
                page < Math.ceil(jokes?.length / Limits.pageLimit)
                  ? 'next active'
                  : 'next'
              }
            >
              Next
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Paginator;
