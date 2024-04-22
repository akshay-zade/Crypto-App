import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { baseUrl } from "./baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import coinImg from "../coin.png";
import './coinDetails.css'

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="coin-detail">
            <div className="coin-info">
              <div className="time">{coin.last_updated}</div>
              <div className="coin-image">
                <img style={{ height: "120px" }} src={coin.image.large} alt="" />
              </div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">{`₹${coin.price_change_24h}`}</div>
              <div className="coin-profit">1.30545 %</div>
              <div className="market-rank">{`#${coin.market_cap_rank}`}</div>
              <div className="coin-desc">
                <p>
                 {coin.description['en'].split('.')[0]}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinDetails;
