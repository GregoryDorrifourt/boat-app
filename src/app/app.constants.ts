export enum BOAT_TYPE {
  CATAMARAN = 0,
  SAILBOAT = 1,
  OTHER = 2
}

export enum OWNER_TYPE {
  INDIVIDUAL= 0,
  PROFESSIONAL= 1
}

export const BoatTypeLabel = {
  [BOAT_TYPE.CATAMARAN]: 'Catamaran',
  [BOAT_TYPE.SAILBOAT]: 'Voilier',
  [BOAT_TYPE.OTHER]: 'Autre',
}

export const OwnerTypeLabel = {
  [OWNER_TYPE.INDIVIDUAL]: 'particulier',
  [OWNER_TYPE.PROFESSIONAL]: 'professionnel'
}
