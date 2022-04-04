import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { demo_app } from '../../declarations/demo_app';

const Edit = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(0);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState(0);

  async function updateItem() {
    const body = {
      id,
      date,
      category,
      content,
      amount: Number(amount),
    };

    console.log('CALL: update at\t', Date.now());
    demo_app.update(id, body).then(() => {
      console.log('Succeeded at\t', Date.now());
      // location.href = '/';
    });
  }

  async function deleteItem() {
    const body = {
      id,
      date,
      category,
      content,
      amount: Number(amount),
    };

    console.log('CALL: delete at\t', Date.now());
    demo_app.delete(id, body).then(() => {
      console.log('Succeeded at\t', Date.now());
      // location.href = '/';
    });
  }

  async function fetchItem() {
    const getItem = async () => {
      console.log('CALL: getItem at\t', Date.now());
      return demo_app.getItem(itemId).then((items) => {
        console.log('Succeeded at\t', Date.now());
        return items[0];
      });
    };

    const param = searchParams.get('id');
    const itemId = Number(param);
    setId(itemId);

    const item = await getItem();
    setDate(item.date);
    setCategory(item.category);
    setContent(item.content);
    setAmount(Number(item.amount));
  }

  useEffect(async () => {
    fetchItem();
  }, []);

  return (
    <div>
      <div className="field">
        <label className="label">日付</label>
        <div className="control">
          <input
            className="input"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            placeholder="YYYY/MM/DD"
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">カテゴリ</label>
        <div className="control">
          <input
            className="input"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">内容</label>
        <div className="control">
          <input
            className="input"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
          ></input>
        </div>
        <p className="help">30字以内</p>
      </div>
      <div className="field">
        <label className="label">金額</label>
        <div className="control">
          <input
            className="input"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
          ></input>
        </div>
      </div>
      <div className="is-flex mt-5">
        <button
          className="button is-primary is-light mr-2"
          onClick={updateItem}
        >
          更新
        </button>
        <button className="button is-danger is-light" onClick={deleteItem}>
          削除
        </button>
      </div>
    </div>
  );
};

export default Edit;
