import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";
import { CurrencyLayerApiKey } from "../../config";
const CurrencyLayerClient = require("currencylayer-client");

const client = new CurrencyLayerClient({
  apiKey: CurrencyLayerApiKey,
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
      generateChartData(
        selectedCurrencyFrom,
        selectedCurrencyTo,
        historicalConvertionRateArray
      );
  }, [
    JSON.stringify(historicalConvertionRateArray),
    historicalConvertionRateArray.length,
    selectedCurrencyFrom,
    selectedCurrencyTo,
  ]);

  const getHistoryRate = (date: string) => {
    return client
      .historical({ date, currencies: "CHF,EUR", source: "USD" })
      .then((data: any) => {
        return {
          ...data.quotes,
          EURUSD: Number((1 / data.quotes.USDEUR).toFixed(3)),
          CHFUSD: Number((1 / data.quotes.USDCHF).toFixed(3)),
          EURCHF: Number(
            ((1 / data.quotes.USDEUR) * data.quotes.USDCHF).toFixed(3)
          ),
          CHFEUR: Number(
            ((1 / data.quotes.USDCHF) * data.quotes.USDEUR).toFixed(3)
          ),
        };
      })
      .catch((err: any) => {
        console.log(err);
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

  const generateChartData = (
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
