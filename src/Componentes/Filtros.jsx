import React from 'react';
import { Collapse, DatePicker } from 'antd';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function Filtros({ onFilterByDate, data }) {
    const handleDateChange = (dates, dateStrings) => {
        const formattedDates = dateStrings.map((date) => {
        const [year, month, day] = date.split('-').map((item) => item.slice(-2)); 
        return `${day}/${month}/${year}`;
      });
      console.log(formattedDates)
      onFilterByDate(formattedDates);
    };
  
    return (
      <Collapse accordion>
        <Panel header="Filtros" key="1">
          <p>Selecciona un rango de fechas:</p>
          {Object.keys(data).length === 0 ? (
            <RangePicker disabled />
          ) : (
            <RangePicker onChange={handleDateChange} />
          )}
        </Panel>
      </Collapse>
    );
  }