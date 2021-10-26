import {BOAT_TYPE, OWNER_TYPE} from '../app.constants';

export interface Boat {
  id: number;
  title: string;
  ownerType: OWNER_TYPE;
  image: string;
  type: BOAT_TYPE;
  length?: number;
  width?: number;
  foil?:boolean;
  draught?: number;
  crew?: boolean;
  annex?: boolean;
}
