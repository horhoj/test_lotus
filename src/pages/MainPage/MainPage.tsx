import { FC, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuctionData } from '@entitiesTypes/Auction';
import { AuctionView } from '@components/AuctionView';
import styles from './MainPage.module.scss';

const SERVER_MSG_ID = 'message';

const HOST = process.env.REACT_APP_HOST || 'localhost:7777';

export const MainPage: FC = () => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [socketError, setSocketError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(HOST);

    socket.on(SERVER_MSG_ID, (msg: AuctionData) => {
      setAuctionData(msg);
      setSocketError(null);
    });

    socket.on('connect_error', (err) => {
      setSocketError(err.message);
      setAuctionData(null);
    });
    socket.on('connect_failed', (err) => {
      setSocketError(err.message);
      setAuctionData(null);
    });
    socket.on('disconnect', (err) => {
      setSocketError(err);
      setAuctionData(null);
    });

    setSocket(socket);

    return () => {
      socket.off(SERVER_MSG_ID);
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      {socket && (
        <div>
          <strong>Статус подключения по сокету: </strong>
          {socket.connected ? 'Активно' : 'отключено'}
        </div>
      )}
      {!auctionData && (
        <div className={styles.loader}>
          <strong> Ждем данные по аукциону...</strong>
        </div>
      )}
      {socketError && (
        <div>
          <strong>Ошибка соединения с сервером: </strong>
          {socketError}
        </div>
      )}
      {auctionData && !socketError && <AuctionView auctionData={auctionData} />}
    </div>
  );
};
