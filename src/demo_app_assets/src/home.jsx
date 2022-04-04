import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { demo_app } from '../../declarations/demo_app';

const Home = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const getItems = async (length) => {
      const promises = [];
      for (let i = 1; i <= length; i++) {
        promises.push(demo_app.getItem(i));
      }
      console.log('CALL: getItems at\t', Date.now());
      return Promise.all(promises).then((res) => {
        console.log('Succeeded at\t', Date.now());
        return res.map((item) => {
          if (item !== null) {
            return item[0];
          }
        });
      });
    };

    const length = await demo_app.length();
    let res = await getItems(length);

    res = res.filter((item) => {
      return item !== undefined;
    });

    const items = res.map((item) => {
      const id = Number(item.id);
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dateObject = new Date(item.date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const yearMonth = `${year}.${month}`;
      const date = dateObject.getDate().toString();
      const day = weekdays[dateObject.getDay()];
      const category = item.category;
      const content = item.content;
      const amount = Number(item.amount).toLocaleString('ja');

      return {
        id,
        calendar: {
          yearMonth,
          date,
          day,
        },
        category,
        content,
        amount,
      };
    });
    setItems(items);
  }

  function getURL(symbol) {
    const canisterId = searchParams.get('canisterId');
    return !canisterId ? '' : `${symbol}canisterId=${canisterId}`;
  }

  return (
    <div>
      {items.map((item) => (
        <a key={Number(item.id)} href={`/edit?id=${item.id}${getURL('&')}`}>
          <div
            className="is-flex p-2 mb-1"
            style={{ backgroundColor: '#eef', borderRadius: '4px' }}
          >
            <div>
              <div className="is-flex" style={{ width: '4.5rem' }}>
                <p style={{ width: '1.5rem' }}>{item.calendar.date}</p>
                <p style={{ width: '2.5rem' }}>{item.calendar.day}</p>
              </div>
              <p style={{ fontSize: '0.75rem' }}>{item.calendar.yearMonth}</p>
            </div>
            <p className="is-align-self-center" style={{ width: '6rem' }}>
              {item.category}
            </p>
            <p className="is-align-self-center" style={{ width: '9rem' }}>
              {item.content}
            </p>
            <p
              className="is-align-self-center has-text-right"
              style={{ width: '7rem' }}
            >
              ￥{item.amount}
            </p>
          </div>
        </a>
      ))}
      <a
        className="button is-primary is-rounded floating"
        href={`/new${getURL('?')}`}
      >
        <span className="icon">
          <i className="fa-solid fa-pen"></i>
        </span>
      </a>
    </div>
  );
};

export default Home;
