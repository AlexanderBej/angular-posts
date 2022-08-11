import { GeoLoc } from "./geo-location.interface";

export interface Address {
    street: string;
    suite: string;
    city: string,
    zipcode: string,
    geo: GeoLoc,
}