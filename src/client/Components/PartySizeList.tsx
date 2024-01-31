import { useState } from "react";
import { PartySize } from "../Pages/ShopBookingPage/PartySize";

// As per requirement found in README.md
const MAX_QTY = 10;

type Props = {
  partySize: PartySize;
};

type CounterProps = {
  reservation: Reservation;
  setReservation: (reservations: Reservation) => void;
  maxQty: number;
}

type Reservation = {
  adult: number;
  children: number;
  babies: number;
  seniors: number;
}

const getReservationTotal = (reservation: Reservation) => Object.values(reservation).reduce((acc, curValue) => acc + curValue, 0);

// Duplicated code for scaling purposes 
// When more business logic are required for each counter
const AdultCounter = ({ reservation, setReservation, maxQty }: CounterProps): JSX.Element => <>
  <button data-testid="Counter Subtract Button" disabled={reservation.adult === 0} onClick={() => setReservation({ ...reservation, adult: reservation.adult - 1 })}>-</button>
  <select data-testid="Party Size List Adult Counter" value={reservation.adult} onChange={event => setReservation({ ...reservation, adult: parseInt(event.target.value) })}>
    {Array.from(new Array(MAX_QTY + 1)).map((_, index) => <option key={`adult_option_${index}`} disabled={index > maxQty - getReservationTotal(reservation)}>{index}</option>)}
  </select>
  <button data-testid="Counter Add Button" disabled={getReservationTotal(reservation) === maxQty} onClick={() => setReservation({ ...reservation, adult: reservation.adult + 1 })}>+</button>
</>

const ChildrenCounter = ({ reservation, setReservation, maxQty }: CounterProps): JSX.Element => <>
  <button data-testid="Counter Subtract Button" disabled={reservation.children === 0} onClick={() => setReservation({ ...reservation, children: reservation.children - 1 })}>-</button>
  <select data-testid="Party Size List Children Counter" value={reservation.children} onChange={event => setReservation({ ...reservation, children: parseInt(event.target.value) })}>
    {Array.from(new Array(MAX_QTY + 1)).map((_, index) => <option key={`children_option_${index}`} disabled={index > maxQty - getReservationTotal(reservation)}>{index}</option>)}
  </select>
  <button data-testid="Counter Add Button" disabled={getReservationTotal(reservation) === maxQty} onClick={() => setReservation({ ...reservation, children: reservation.children + 1 })}>+</button>
</>

const BabiesCounter = ({ reservation, setReservation, maxQty }: CounterProps): JSX.Element => <>
  <button data-testid="Counter Subtract Button" disabled={reservation.babies === 0} onClick={() => setReservation({ ...reservation, babies: reservation.babies - 1 })}>-</button>
  <select data-testid="Party Size List Babies Counter" value={reservation.babies} onChange={event => setReservation({ ...reservation, babies: parseInt(event.target.value) })}>
    {Array.from(new Array(MAX_QTY + 1)).map((_, index) => <option key={`babies_option_${index}`} disabled={index > maxQty - getReservationTotal(reservation)}>{index}</option>)}
  </select>
  <button data-testid="Counter Add Button" disabled={getReservationTotal(reservation) === maxQty} onClick={() => setReservation({ ...reservation, babies: reservation.babies + 1 })}>+</button>
</>

const SeniorsCounter = ({ reservation, setReservation, maxQty }: CounterProps): JSX.Element => <>
  <button data-testid="Counter Subtract Button" disabled={reservation.seniors === 0} onClick={() => setReservation({ ...reservation, seniors: reservation.seniors - 1 })}>-</button>
  <select data-testid="Party Size List Seniors Counter" value={reservation.seniors} onChange={event => setReservation({ ...reservation, seniors: parseInt(event.target.value) })}>
    {Array.from(new Array(MAX_QTY + 1)).map((_, index) => <option key={`seniors_option_${index}`} disabled={index > maxQty - getReservationTotal(reservation)}>{index}</option>)}
  </select>
  <button data-testid="Counter Add Button" disabled={getReservationTotal(reservation) === maxQty} onClick={() => setReservation({ ...reservation, seniors: reservation.seniors + 1 })}>+</button>
</>


export const PartySizeList = ({ partySize }: Props): JSX.Element => {
  const [reservation, setReservation] = useState<Reservation>({
    adult: 0,
    children: 0,
    babies: 0,
    seniors: 0,
  })
  const groupOrderMenuItems = partySize.getMenu().filter(({ isGroupOrder }) => isGroupOrder)

  // Assumes that there could be multiple maxOrderQty and we will take the lowest
  const maxOrderQty = Math.min(...groupOrderMenuItems.map(({ maxOrderQty }) => maxOrderQty).filter(qty => typeof (qty) === 'number'));
  const shop = partySize.getShop();

  const maxQty = Math.min(maxOrderQty, partySize.getShop().maxNumPeople, MAX_QTY + 1);
  return <div data-testid="Party Size List">
    <AdultCounter reservation={reservation} setReservation={setReservation} maxQty={maxQty} />
    {shop.showChild ? <ChildrenCounter reservation={reservation} setReservation={setReservation} maxQty={maxQty} /> : <></>}
    {shop.showBaby ? <BabiesCounter reservation={reservation} setReservation={setReservation} maxQty={maxQty} /> : <></>}    
    {shop.showSenior ? <SeniorsCounter reservation={reservation} setReservation={setReservation} maxQty={maxQty} /> : <></>}
  </div>;
};
