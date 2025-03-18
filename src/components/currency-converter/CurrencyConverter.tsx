import React, { useEffect, useState } from "react";
import classes from './CurrencyConverter.module.css';

type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP';

const currencies: Currency[] = ['USD', 'EUR', 'JPY', 'GBP'];

const baseUrl = 'http://localhost:3001/api/exchange-rate';

export const CurrencyConverter = () => {
  const [convertRate, setConvertRate] = useState<number | undefined>(undefined);
  const [userAmount, setUserAmount] = useState(0);
  const [baseCurr, setBaseCurr] = useState<Currency>('USD');
  const [targetCurr, setTargetCurr] = useState<Currency>('EUR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      try {
        if (currencies.includes(baseCurr) && currencies.includes(targetCurr)) {
          const res = await fetch(`${baseUrl}?base=${baseCurr}&target=${targetCurr}`);
          const { rate } = await res.json();
          if (rate) {
            setConvertRate(rate);
            setError('');
          } else {
            throw "Could not fetch rates.";
          }
        } else {
          setError('Currency not supported');
          setConvertRate(undefined);
        }
      } catch (er) {
        console.log(er);
        setError('Could not fetch rates.')
        setConvertRate(undefined);
      }
      setLoading(false);
    };

    fetchRate();
  }, [baseCurr, targetCurr]);

  const handleAmountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserAmount(Number(target.value));
  };

  const handleBaseCurrChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseCurr(target.value as Currency);
  };

  const handleTargetCurrChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetCurr(target.value as Currency);
  };

  const handleSwap = () => {
    setBaseCurr(targetCurr);
    setTargetCurr(baseCurr);
  };

  const convertedValue = convertRate ? userAmount * convertRate : userAmount;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form className={classes.converterForm} onSubmit={handleFormSubmit}>
      <label htmlFor="currVal">Enter the amount:</label>
      <input
        type="number"
        id="currVal"
        value={userAmount}
        onChange={handleAmountChange}
      />
      <label htmlFor="baseCurr">Base Currency:</label>
      <select id="baseCurr" onChange={handleBaseCurrChange} value={baseCurr}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
      </select>
      <label htmlFor="targetCurr">Target Currency:</label>
      <select id="targetCurr" onChange={handleTargetCurrChange} value={targetCurr}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="JPY">JPY</option>
        <option value="GBP">GBP</option>
      </select>
      { convertRate ? <div>Exchange Rates: 1 {baseCurr} = {convertRate} {targetCurr}</div> : null }
      <button onClick={handleSwap}>Swap Currencies</button>
      {
        loading ? "loading..." : <span>Coverted: {convertedValue}</span>
      }
      {
        error ? <span className={classes.error}>{error}</span> : null
      }
    </form>
  );
};
