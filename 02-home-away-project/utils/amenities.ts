import { IconType } from 'react-icons';
export type Amenity = {
  name: string;
  icon: IconType;
  selected: boolean;
};
import {
  FiCloud,
  FiTruck,
  FiZap,
  FiWind,
  FiSun,
  FiCoffee,
  FiFeather,
  FiAirplay,
  FiTrello,
  FiBox,
  FiAnchor,
  FiDroplet,
  FiMapPin,
  FiSunrise,
  FiSunset,
  FiMusic,
  FiHeadphones,
  FiRadio,
  FiFilm,
  FiTv,
} from 'react-icons/fi';

export const amenities: Amenity[] = [
  { name: 'unlimited cloud storage', icon: FiCloud, selected: false },
  { name: 'VIP parking for squirrels', icon: FiTruck, selected: false },
  { name: 'self-lighting fire pit', icon: FiZap, selected: false },
  {
    name: 'bbq grill with a masterchef diploma',
    icon: FiWind,
    selected: false,
  },
  { name: 'outdoor furniture (tree stumps)', icon: FiSun, selected: false },
  { name: 'private bathroom (bushes nearby)', icon: FiCoffee, selected: false },
  { name: 'hot shower (sun required)', icon: FiFeather, selected: false },
  { name: 'kitchenette (aka fire pit)', icon: FiAirplay, selected: false },
  { name: 'natural heating (bring a coat)', icon: FiTrello, selected: false },
  {
    name: 'air conditioning (breeze from the west)',
    icon: FiBox,
    selected: false,
  },
  { name: 'bed linens (leaves)', icon: FiAnchor, selected: false },
  { name: 'towels (more leaves)', icon: FiDroplet, selected: false },
  {
    name: 'picnic table (yet another tree stump)',
    icon: FiMapPin,
    selected: false,
  },
  { name: 'hammock (two trees and a rope)', icon: FiSunrise, selected: false },
  { name: 'solar power (daylight)', icon: FiSunset, selected: false },
  { name: 'water supply (river a mile away)', icon: FiMusic, selected: false },
  {
    name: 'cooking utensils (sticks and stones)',
    icon: FiHeadphones,
    selected: false,
  },
  { name: 'cool box (hole in the ground)', icon: FiRadio, selected: false },
  { name: 'lanterns (fireflies)', icon: FiFilm, selected: false },
  { name: 'first aid kit (hope and prayers)', icon: FiTv, selected: false },
];

export const conservativeAmenities: Amenity[] = [
  { name: 'cloud storage', icon: FiCloud, selected: false },
  { name: 'parking', icon: FiTruck, selected: false },
  { name: 'fire pit', icon: FiZap, selected: false },
  { name: 'bbq grill', icon: FiWind, selected: false },
  { name: 'outdoor furniture', icon: FiSun, selected: false },
  { name: 'private bathroom', icon: FiCoffee, selected: false },
  { name: 'hot shower', icon: FiFeather, selected: false },
  { name: 'kitchenette', icon: FiAirplay, selected: false },
  { name: 'heating', icon: FiTrello, selected: false },
  { name: 'air conditioning', icon: FiBox, selected: false },
  { name: 'bed linens', icon: FiAnchor, selected: false },
  { name: 'towels', icon: FiDroplet, selected: false },
  { name: 'picnic table', icon: FiMapPin, selected: false },
  { name: 'hammock', icon: FiSunrise, selected: false },
  { name: 'solar power', icon: FiSunset, selected: false },
  { name: 'water supply', icon: FiMusic, selected: false },
  { name: 'cooking utensils', icon: FiHeadphones, selected: false },
  { name: 'cool box', icon: FiRadio, selected: false },
  { name: 'lanterns', icon: FiFilm, selected: false },
  { name: 'first aid kit', icon: FiTv, selected: false },
];
