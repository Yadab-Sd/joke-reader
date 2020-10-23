import React, { ReactElement, useEffect, useState } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getData, setData, updateData } from '../../utils/store';
import { Flags, Keys } from '../../utils/constants';
import { JokeBody } from '../Home';

const NewJoke = ({ match }: any): ReactElement => {
  const [singleType, setSingleType] = useState<boolean>(true);
  const [resultMsg, setResultMsg] = useState<string>('');
  const [joke, setJoke] = useState<JokeBody>();
  const { register, handleSubmit, setValue } = useForm();

  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (id) {
      const data = getData(Keys.jokes, id);
      setJoke(data);
      setValue('category', data?.category);
      setValue('type', data?.type);
      if (data?.type === 'Two Part') setSingleType(false);
    }
  }, [resultMsg, id]);

  const onSubmit = (formData: any): void => {
    const { category, type, flags, content, delivery } = formData;
    const filteredData = {
      category,
      type,
      flags,
      content,
      delivery: delivery ? delivery : '',
    };
    const newId = id
      ? updateData(Keys.jokes, { id: id, ...filteredData })
      : setData(Keys.jokes, filteredData);

    if (newId) {
      setResultMsg(id ? 'Updated Successfully' : 'New Joke Added Successfully');
    } else {
      setResultMsg('Submission Failed!');
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='single-joke'>
      <h4 className='my-heading'>{id ? 'Edit Joke' : 'Add New Joke'}</h4>
      <p className='my-msg'>{resultMsg}</p>
      <Link to='/'>
        <FontAwesomeIcon icon={faHome} /> Back to Home
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='single-joke-inne'>
          <div className='input-field'>
            <label>Category</label>
            <select
              name='category'
              ref={register}
              defaultValue={joke?.category}
            >
              <option>Miscellaneous</option>
              <option>Pun</option>
              <option>Programming</option>
              <option>Dark</option>
            </select>
          </div>
          <div className='input-field'>
            <label>Type</label>
            <select
              name='type'
              onChange={(): void => setSingleType(!singleType)}
              ref={register}
              defaultValue={joke?.type}
            >
              <option>Single</option>
              <option>Two Part</option>
            </select>
          </div>
          <div className='input-field'>
            <label>Flags</label>
            <div className='my-flex-l'>
              <div className='my-flex mr-10'>
                <input
                  type='checkbox'
                  name='flags'
                  ref={register}
                  className='mr-10'
                  value='NSFW'
                  defaultChecked={joke?.flags?.includes(Flags.NSFW)}
                />
                NSFW
              </div>
              <div className='my-flex mr-10'>
                <input
                  type='checkbox'
                  name='flags'
                  ref={register}
                  className='mr-10'
                  value='Religious'
                  defaultChecked={joke?.flags?.includes(Flags.Religious)}
                />
                Religious
              </div>
              <div className='my-flex mr-10'>
                <input
                  type='checkbox'
                  name='flags'
                  ref={register}
                  className='mr-10'
                  value='Political'
                  defaultChecked={joke?.flags?.includes(Flags.Political)}
                />
                Political
              </div>
              <div className='my-flex mr-10'>
                <input
                  type='checkbox'
                  name='flags'
                  ref={register}
                  className='mr-10'
                  value='Racist'
                  defaultChecked={joke?.flags?.includes(Flags.Racist)}
                />
                Racist
              </div>
            </div>
          </div>
          <div className='input-field'>
            <label>Content</label>
            <textarea
              name='content'
              ref={register}
              defaultValue={joke?.content}
            ></textarea>
          </div>
          {!singleType ? (
            <div className='input-field'>
              <label>Delivery</label>
              <textarea
                name='delivery'
                ref={register}
                defaultValue={joke?.delivery}
              ></textarea>
            </div>
          ) : undefined}
          <Button type='submit' className='my-btn'>
            {id ? 'DONE' : 'ADD'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewJoke;
