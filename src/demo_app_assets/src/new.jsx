import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { demo_app } from '../../declarations/demo_app';

const New = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState(0);

  async function registerItem() {
    const body = {
      date,
      category,
      content,
      amount: Number(amount),
    };

    console.log('CALL: new at\t', Date.now());
    demo_app.new(body).then(() => {
      console.log('Succeeded at\t', Date.now());
      // location.href = '/';
    });
  }

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
        <button className="button is-primary is-light" onClick={registerItem}>
          登録
        </button>
      </div>
    </div>
  );
};

export default New;
