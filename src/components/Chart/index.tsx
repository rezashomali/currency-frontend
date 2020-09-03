import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
const CurrencyLayerClient = require("currencylayer-client");

const client = new CurrencyLayerClient({
  apiKey: "7cb2fa306d15983c0edcec597fa8234dd",
});

type Props = {
  selectedCurrencyFrom: string;
  selectedCurrencyTo: string;
};

const Chart: React.FC<Props> = ({
  selectedCurrencyFrom,
  selectedCurrencyTo,
}) => {
  const [twoWeeksArray, setTwoWeeksArray] = useState<string[]>(
    Array(2)
      .fill("")
      .map((_, i) => moment().subtract(i, "d").format("YYYY-MM-DD"))
  );

  const [
    historicalConvertionRateArray,
    setHistoricalConvertionRateArray,
  ] = useState([]);
  const [chartData, setChartData] = useState<
    Array<{
      id: string;
      color: string;
      data: any[];
    }>
  >();

  useEffect(() => {
    generateDailyConvertionRate(twoWeeksArray);
  }, []);

  useEffect(() => {
    if (historicalConvertionRateArray.length)
      generateChartDate(
        selectedCurrencyFrom,
        selectedCurrencyTo,
        historicalConvertionRateArray
      );
  }, [
    historicalConvertionRateArray.length,
    selectedCurrencyFrom,
    selectedCurrencyTo,
  ]);

  const getHistoryRate = (date: string) => {
    let rates: any = {};
    let allRates: any = {};

    return client
      .historical({ date, currencies: "CHF,EUR", source: "USD" })
      .then((data: any) => {
        console.log("fetched new data ", data);
        rates = data.quotes;

        allRates = {
          ...rates,
          EURUSD: Number((1 / rates.USDEUR).toFixed(3)),
          CHFUSD: Number((1 / rates.USDCHF).toFixed(3)),
          EURCHF: Number(((1 / rates.USDEUR) * rates.USDCHF).toFixed(3)),
          CHFEUR: Number(((1 / rates.USDCHF) * rates.USDEUR).toFixed(3)),
        };

        return allRates;
      })
      .catch((err: any) => {
        console.log(err.code); // 104
        console.log(err.message); // Your monthly usage limit has been reached...
      });
  };

  const generateDailyConvertionRate = async (array: string[]) => {
    const historicalConvertionRateDate: any = [];

    await array.map(async (item: any) => {
      let rates: any;
      await getHistoryRate(item).then((data: any) => {
        rates = data;

        historicalConvertionRateDate.push({
          date: item,
          rates: { ...rates },
        });
      });
    });
    setHistoricalConvertionRateArray(historicalConvertionRateDate);
  };

  const generateChartDate = (
    selectedCurrencyFrom: string,
    selectedCurrencyTo: string,
    historicalRateArray: object[]
  ) => {
    let data: Array<{ x: string; y: number }> = [];
    console.log(data);
    historicalRateArray.map((item: any) => {
      data.push({
        x: item.date,
        y: item.rates[selectedCurrencyFrom + selectedCurrencyTo],
      });
    });

    setChartData([
      {
        id: `${selectedCurrencyFrom} to ${selectedCurrencyTo}`,
        color: "hsl(11, 70%, 50%)",
        data: [...data],
      },
    ]);
  };

  return (
    <div style={{ height: "300px" }}>
      {chartData && (
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
            legendOffset: -40,
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
      )}
    </div>
  );
};

export default Chart;
