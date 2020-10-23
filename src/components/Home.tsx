import React, { useState, useEffect, ReactElement } from 'react';
import { faEdit, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getData } from '../utils/store';
import { Keys, Limits } from '../utils/constants';
import Paginator from './Paginator';
import { randomIdSelection } from '../utils/idGenerator';

export interface JokeBody {
  id: string;
  category: string;
  type: string;
  flags: string[];
  content: string;
  delivery: string;
}

const Home = (): ReactElement => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  const [jokes, setJokes] = useState<JokeBody[]>([]);

  useEffect(() => {
    const gainedData = getData(Keys.jokes);
    if (gainedData?.length) setJokes(gainedData as any);
  }, [page]);

  return (
    <Container>
      <Row className='align-items-md-center justify-content-md-center my-flex mt-10 mb-10 pb-10'>
        <Col xs={12} sm={6}>
          <h4 className='my-heading'>Jokes ({jokes?.length})</h4>
        </Col>
        <Col
          xs={12}
          sm={6}
          className='justify-content-md-end justify-content-sm-start my-flex mt-10 mb-10'
        >
          <Link className='my-btn mr-10 d-in-block' to='./jokes/add'>
            <Button type='button' className='my-btn'>
              + Create new Joke
            </Button>
          </Link>
          <Link
            className='my-btn d-in-block'
            to={`./jokes/${randomIdSelection()}/play`}
          >
            <Button type='button' className='my-btn'>
              Play Joke
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className='align-items-md-center my-flex-sb'>
        <Col xs={6}>
          <b>Jokes</b>
        </Col>
        <Col xs={4}>
          <b>Flags</b>
        </Col>
        <Col xs={2}>
          <b>Action</b>
        </Col>
      </Row>
      <p className='my-border-bottom mt-10'></p>

      {jokes.length > 0 ? (
        jokes
          ?.slice(
            ((parseInt(page as string) || 1) - 1) * Limits.pageLimit,
            ((parseInt(page as string) || 1) - 1) * Limits.pageLimit +
              Limits.pageLimit
          )
          ?.map(
            (joke: JokeBody, i: number): ReactElement => (
              <Row className='cart-item my-border-bottom' key={joke.id}>
                <Col xs={6}>
                  <div className='my-flex-l'>
                    <div className='cart-item-content mr-10'>
                      {joke.content} -{' '}
                    </div>
                    <div className='cart-item-title'>
                      <b>{joke.category}</b>
                    </div>
                  </div>
                  {joke.delivery ? (
                    <b>{joke.delivery ? joke.delivery : undefined}</b>
                  ) : undefined}
                </Col>
                <Col xs={4} className='cart-item-img'>
                  {joke.flags.length
                    ? joke.flags.map((flag: string, i: number) => (
                        <img
                          src={require(`../assets/img/${flag.toLowerCase()}.jpg`)}
                          alt='Flag'
                          key={i}
                        />
                      ))
                    : undefined}
                </Col>
                <Col xs={2} className='cart-item-btn my-flex'>
                  <Link to={`./jokes/${joke.id}/edit`}>
                    <FontAwesomeIcon icon={faEdit} />{' '}
                  </Link>
                  <Link to={`./jokes/${joke.id}/play`}>
                    <FontAwesomeIcon icon={faPlay} />{' '}
                  </Link>
                </Col>
              </Row>
            )
          )
      ) : (
        <p className='my-msg'>No Jokes to show</p>
      )}
      <p className='my-border-bottom mt-10'></p>
      <Row>
        {jokes?.length > Limits.itemLimit ? (
          <Paginator page={parseInt(page as string) || 1} />
        ) : undefined}
      </Row>
    </Container>
  );
};

export default Home;
