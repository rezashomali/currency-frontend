import React from "react";
import { ResponsiveLine } from "@nivo/line";

const Chart = () => {
  const data = [
    {
      id: "Euro to USD",
      color: "hsl(11, 70%, 50%)",
      data: [
        {
          x: "2020-09-01",
          y: 285,
        },
        {
          x: "2020-08-31",
          y: 114,
        },
        {
          x: "2020-08-30",
          y: 229,
        },
        {
          x: "2020-08-29",
          y: 267,
        },
        {
          x: "2020-08-28",
          y: 236,
        },
        {
          x: "2020-08-27",
          y: 199,
        },
        {
          x: "2020-08-26",
          y: 281,
        },
        {
          x: "2020-08-25",
          y: 133,
        },
        {
          x: "2020-08-24",
          y: 140,
        },
        {
          x: "2020-08-23",
          y: 96,
        },
        {
          x: "2020-08-22",
          y: 270,
        },
        {
          x: "2020-08-21",
          y: 244,
        },
      ],
    },
    {
      id: "Euro to CHF",
      color: "hsl(270, 70%, 50%)",
      data: [
        {
          x: "2020-09-01",
          y: 291,
        },
        {
          x: "2020-08-31",
          y: 287,
        },
        {
          x: "2020-08-30",
          y: 217,
        },
        {
          x: "2020-08-29",
          y: 80,
        },
        {
          x: "2020-08-28",
          y: 0,
        },
        {
          x: "2020-08-27",
          y: 185,
        },
        {
          x: "2020-08-26",
          y: 219,
        },
        {
          x: "2020-08-25",
          y: 59,
        },
        {
          x: "2020-08-24",
          y: 25,
        },
        {
          x: "2020-08-23",
          y: 3,
        },
        {
          x: "2020-08-22",
          y: 260,
        },
        {
          x: "2020-08-21",
          y: 83,
        },
      ],
    },
  ];

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
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
    </div>
  );
};

export default Chart;
