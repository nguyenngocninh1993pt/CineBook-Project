import { useState } from 'react';
import { seatLayout } from '@/data/movies';

const SeatSelection = ({ selectedSeats, onSeatSelect }) => {
  const { rows, seatsPerRow, vipRows, occupiedSeats } = seatLayout;

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const isVipRow = (row) => vipRows.includes(row);

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      onSeatSelect(selectedSeats.filter((s) => s !== seatId));
    } else {
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="relative">
        <div className="w-full h-2 bg-gradient-cinema rounded-full mb-2" />
        <div className="w-3/4 mx-auto h-8 bg-gradient-to-b from-primary/20 to-transparent rounded-t-[100%]" />
        <p className="text-center text-muted-foreground text-sm mt-2">Màn hình</p>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col items-center gap-2 py-8">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-center text-sm font-medium text-muted-foreground">
              {row}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = i + 1;
                const seatId = `${row}${seatNumber}`;
                const status = getSeatStatus(seatId);
                const isVip = isVipRow(row);
                
                // Add gap in the middle for aisle
                const hasAisle = seatNumber === 4 || seatNumber === 9;
                
                return (
                  <div key={seatId} className={`flex items-center ${hasAisle ? 'mr-4' : ''}`}>
                    <button
                      onClick={() => handleSeatClick(seatId)}
                      disabled={status === 'occupied'}
                      className={`seat ${
                        status === 'occupied' 
                          ? 'seat-occupied' 
                          : status === 'selected'
                            ? isVip ? 'seat-vip seat-selected' : 'seat-selected'
                            : isVip ? 'seat-vip' : 'seat-available'
                      }`}
                      title={`${seatId} ${isVip ? '(VIP)' : ''}`}
                    >
                      <span className="text-xs font-medium opacity-70">{seatNumber}</span>
                    </button>
                  </div>
                );
              })}
            </div>
            <span className="w-6 text-center text-sm font-medium text-muted-foreground">
              {row}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="seat seat-available scale-75" />
          <span className="text-sm text-muted-foreground">Ghế thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-vip scale-75" />
          <span className="text-sm text-muted-foreground">Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-selected scale-75" />
          <span className="text-sm text-muted-foreground">Đang chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-occupied scale-75" />
          <span className="text-sm text-muted-foreground">Đã bán</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
