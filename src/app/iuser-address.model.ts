export interface IUserAddress {
  user_id: string;
  first_name: string;
  last_name?: string;
  email: string;
  mobile: number;
  address: IAddress;
}
export interface IAddress {
  house_building: string;
  road_area_colony: string;
  city: string;
  state: string;
  pincode: string;
}
