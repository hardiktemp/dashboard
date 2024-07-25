import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';


type DateRange = {
  from: Date;
  to: Date;
};

type CalProps = {
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
};

export const Cal: React.FC<CalProps> = ({ setDateRange }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges : any) => {
    console.log(ranges);
    setSelectionRange(ranges.selection);
    
    if (ranges.selection.startDate === null || ranges.selection.endDate === null) {
      return;
    }
    
    // Check if ranges.selection.endDate is today's date
    let endDate = new Date(ranges.selection.endDate);
    // const today = new Date();
    // if(endDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
    //   console.log("End date is today's date");
    //   endDate = new Date();
    //   console.log(endDate);
    //   console.log(ranges.selection.startDate);
    // }

    setDateRange({
      from : new Date(ranges.selection.startDate),
      to : endDate,
    });
  };

  return (
    <DateRangePicker
      className='align-middle'
      ranges={[selectionRange]}
      onChange={handleSelect}
    />
  );
};
