import { FC } from 'react';
import { AuctionData } from '@entitiesTypes/Auction';
import { getTimeInHumanUnderstandableForm } from '@components/AuctionView/helpers';
import styles from './AuctionView.module.scss';

interface AuctionViewProps {
  auctionData: AuctionData;
}

export const AuctionView: FC<AuctionViewProps> = ({ auctionData }) => {
  return (
    <div className={styles.wrap}>
      <div>
        <strong>Наименование торгов: </strong>
        {auctionData.name}
      </div>
      <div>
        <strong>Дата начала торгов: </strong>
        {new Date(auctionData.startTime).toLocaleString()}
      </div>
      <div>
        <strong>Текущая дата сервера торгов: </strong>
        {new Date(auctionData.currentTime).toLocaleString()}
      </div>
      <div>
        <strong>Время на ход участника: </strong>
        {getTimeInHumanUnderstandableForm(auctionData.participantsTurnTime)}
      </div>
      <div>
        <strong>Текущий ход: </strong>
        {auctionData.currentStep + 1}
      </div>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Ход</th>
            {auctionData.participantList.map((participantItem) => (
              <th key={participantItem.id}>
                {participantItem.id === auctionData.currentParticipantId && (
                  <span className={styles.timeUntilEndOfTurn}>
                    {getTimeInHumanUnderstandableForm(
                      auctionData.timeUntilEndOfTurn,
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
          <tr>
            <th>Параметры и требования</th>
            {auctionData.participantList.map((participantItem, index) => (
              <th key={participantItem.id}>
                <span className={styles.participantItemThNumber}>
                  УЧАСТНИК №{index + 1}
                </span>
                <span className={styles.participantItemThName}>
                  {participantItem.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Наличие комплекса мероприятий, повышающих стандарты качества
              изготовления
            </td>
            {auctionData.participantList.map((participantItem) => (
              <td key={participantItem.id}>
                {participantItem.isQualityStandard ? 'ДА' : '-'}
              </td>
            ))}
          </tr>
          <tr>
            <td>срок изготовления лота, дней</td>
            {auctionData.participantList.map((participantItem) => (
              <td key={participantItem.id}>{participantItem.productionTime}</td>
            ))}
          </tr>
          <tr>
            <td>Гарантийные обязательства, месяцев</td>
            {auctionData.participantList.map((participantItem) => (
              <td key={participantItem.id}>{participantItem.warrantyPeriod}</td>
            ))}
          </tr>
          <tr>
            <td>Условия оплаты</td>
            {auctionData.participantList.map((participantItem) => (
              <td key={participantItem.id}>
                {participantItem.termsOfPayment}%
              </td>
            ))}
          </tr>
          <tr>
            <td>Стоимость изготовления лота, руб. (без НДС)</td>
            {auctionData.participantList.map((participantItem) => (
              <td key={participantItem.id}>
                <span className={styles.totalCostCeil}>
                  {participantItem.totalCostCeil.toLocaleString()} руб.
                </span>
                <span className={styles.totalCostMedium}>
                  {participantItem.totalCostMedium.toLocaleString()} руб.
                </span>
                <span className={styles.totalCostFloor}>
                  {participantItem.totalCostFloor.toLocaleString()} руб.
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className={styles.dev}>
        <strong>
          Это данные полученные от сокета, (сделано для удобства проверки
          тестового задания)
        </strong>
      </div>
      <pre>{JSON.stringify(auctionData, null, 2)}</pre>
    </div>
  );
};
