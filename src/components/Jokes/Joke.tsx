import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { faClock, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getData, setData, updateData } from '../../utils/store';
import { Keys } from '../../utils/constants';
import { JokeBody } from '../Home';
import { randomIdSelection } from '../../utils/idGenerator';

const getDelivery = (data: string): Promise<string> => {
  return new Promise((r) => setTimeout(() => r(data), 3000));
};

const Joke = ({ match }: any): ReactElement => {
  const [joke, setJoke] = useState<JokeBody>();
  const [deliveryData, setDeliveryData] = useState<string>('');

  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (id) {
      const data = getData(Keys.jokes, id);
      setJoke(data);
      if (data?.delivery) {
        getDelivery(data?.delivery as string).then((r) => setDeliveryData(r));
      }
    }
  }, []);

  return (
    <div className=''>
      <h4 className='my-heading'>Joke</h4>
      <Link to='/'>
        <FontAwesomeIcon icon={faHome} /> Back to Home
      </Link>
      <div className='single-joke-inner'>
        <Card className='my-cart'>
          <i className='cart-arrow shadow my-flex'></i>
          <Card.Header as='h5' bg='primary'>
            <Card.Title className='pb-10'> {joke?.content}</Card.Title>
            <div className='my-flex-sb mt-10'>
              <Card.Subtitle className='text-muted'>
                {joke?.category}
              </Card.Subtitle>
              <div>
                {joke?.flags.length
                  ? joke?.flags.map((flag: string, i: number) => (
                      <img
                        className='mr-10'
                        src={require(`../../assets/img/${flag.toLowerCase()}.jpg`)}
                        key={i}
                      />
                    ))
                  : undefined}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <FontAwesomeIcon icon={faClock} />
          </Card.Body>
          <Card.Footer>
            <div className='d-flex justify-content-between align-items-center'>
              <b>{deliveryData}</b>
            </div>
          </Card.Footer>
        </Card>
        {randomIdSelection(id) ? (
          <a
            href={`../${randomIdSelection(id)}/play`}
            className='my-btn-primary'
          >
            Next
          </a>
        ) : undefined}
      </div>
    </div>
  );
};

export default Joke;
