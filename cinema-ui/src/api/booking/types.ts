export interface BillHisToryVO {
  id: string | number;
  movieName: string;
  cinemaName: string;
  genre: string;
  province: string;
  hallName: string;
  seatId: string[];
  bookingId: string | number;
  promotionId: string | number;
  movieImg: string;
  price: number;
  startTime: string;
}
