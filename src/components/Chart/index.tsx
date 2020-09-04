import React, { useState, useEffect } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";
import getHistoricalRate from "../../services/currenylayer/getHistoricalRate";

type RatesType = { [key: string]: number };

type HistoricalConvertionRateType = Array<{
  date: string;
  rates: RatesType;
}>;

type Props = {
  selectedCurrencyFrom: string;
  selectedCurrencyTo: string;
};

const datesArray = Array(14)
  .fill("")
  .map((_, i) => moment().subtract(i, "d").format("YYYY-MM-DD"))
  .reverse();

const Chart: React.FC<Props> = ({
  selectedCurrencyFrom,
  selectedCurrencyTo,
}) => {
  const [
    historicalConvertionRateArray,
    setHistoricalConvertionRateArray,
  ] = useState<HistoricalConvertionRateType>([]);
  const [chartData, setChartData] = useState<Array<Serie>>([]);

  useEffect(() => {
    // run only once and generate all currency rates
    Promise.all(
      datesArray.map((date) =>
        getHistoricalRate(date).then((data) => ({
          date,
          rates: data,
        }))
      )
    ).then((hitoricalData) => {
      setHistoricalConvertionRateArray(hitoricalData);
    });
  }, []);

  useEffect(() => {
    // run everytime selected currencies change and generate new data for chart
    if (historicalConvertionRateArray.length)
      generateChartData(
        selectedCurrencyFrom,
        selectedCurrencyTo,
        historicalConvertionRateArray
      );
  }, [
    historicalConvertionRateArray.length,
    selectedCurrencyFrom,
    selectedCurrencyTo,
  ]);

  // generate data for chart base of selected currencies
  const generateChartData = (
    selectedCurrencyFrom: string,
    selectedCurrencyTo: string,
    historicalRateArray: HistoricalConvertionRateType
  ) => {
    setChartData([
      {
        id: `${selectedCurrencyFrom} to ${selectedCurrencyTo}`,
        color: "hsl(11, 70%, 50%)",
        data: historicalRateArray.map((item) => ({
          x: moment(item.date).format("MM-DD"),
          y: item.rates[`${selectedCurrencyFrom}${selectedCurrencyTo}`],
        })),
      },
    ]);
  };

  return (
    <div style={{ height: "300px" }}>
      {selectedCurrencyFrom === selectedCurrencyTo ? (
        <Alert severity="error">please select diffrent currency</Alert>
      ) : (
        chartData && (
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Price",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableSlices="x"
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )
      )}
    </div>
  );
};

export default Chart;
