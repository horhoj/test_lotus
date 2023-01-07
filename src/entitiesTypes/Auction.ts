export interface AuctionData {
  name: string;
  startTime: number;
  participantsTurnTime: number;
  timeUntilEndOfTurn: number;
  timeHasElapsedSinceStartOfAuction: number;
  currentStep: number;
  currentParticipantId: number;
  currentTime: number;
  participantList: ParticipantItem[];
}

export interface ParticipantItem {
  id: number;
  name: string;
  isQualityStandard: boolean;
  productionTime: number;
  warrantyPeriod: number;
  termsOfPayment: number;
  totalCostCeil: number;
  totalCostMedium: number;
  totalCostFloor: number;
}
