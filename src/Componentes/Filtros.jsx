import React from "react";
import { Collapse, DatePicker } from "antd";
import locale from "antd/lib/date-picker/locale/es_ES";
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function Filtros({ onFilterByDate, data, recibirMes }) {
  dayjs.locale('es'); 
  const firstDayOfMonth = dayjs().startOf('month');
  const today = dayjs();
  const nombreDelMes = firstDayOfMonth.format('MMMM');

  recibirMes(nombreDelMes)

  const handleDateChange = (dates, dateStrings) => {
    const formattedDates = dateStrings.map((date) => {
      const [year, month, day] = date.split("-").map((item) => item.slice(-2));
      return `${day}/${month}/${year}`;
    });
    onFilterByDate(formattedDates);
  };

  return (
    <Collapse accordion>
      <Panel header="Filtros" key="1">
        <p>Selecciona un rango de fechas:</p>
        {Object.keys(data).length === 0 ? (
          <RangePicker disabled locale={locale}/>
        ) : (
          <RangePicker
            onChange={handleDateChange}
            locale={locale}
            defaultValue={[firstDayOfMonth, today]}
          />
        )}
      </Panel>
    </Collapse>
  );
}
