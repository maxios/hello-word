import React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import * as d3 from 'd3-shape';
import {View} from 'tamagui';

interface Props {
  size: number;
  centerColor?: string;
  children?: React.ReactNode;
  series: {
    value: number;
    color: string;
  }[];
  coverRadius?: number;
}

const DoughnutChart: React.FC<Props> = (props) => {
  const radius = props.size / 2;
  const coverRadius = props.coverRadius || 0.8;

  const pieGenerator = d3.pie().sort(null);

  const arcs = pieGenerator(props.series.map((d) => d.value));
  return (
    <View
      position="relative"
      alignItems="center"
      justifyContent="center"
      width={props.size}
      height={props.size}
    >
      <Svg style={{}} width={props.size} height={props.size}>
        <G transform={`translate(${props.size / 2}, ${props.size / 2})`}>
          {arcs.map((arc, i) => {
            let arcGenerator = d3
              .arc()
              .outerRadius(radius)
              .startAngle(arc.startAngle)
              .endAngle(arc.endAngle);

            if (!coverRadius) {
              arcGenerator = arcGenerator.innerRadius(0);
            } else {
              arcGenerator = arcGenerator.innerRadius(coverRadius * radius);
            }
            return (
              <Path
                key={arc.index}
                fill={props.series[i].color}
                d={
                  arcGenerator({
                    endAngle: arc.endAngle,
                    startAngle: arc.startAngle,
                    innerRadius: 0,
                    outerRadius: radius,
                  }) as string
                }
              />
            );
          })}
          <Path
            key="cover"
            fill={props.centerColor}
            d={
              d3
                .arc()
                .outerRadius(coverRadius * radius)
                .innerRadius(0)
                .startAngle(0)
                .endAngle(360)({
                endAngle: 0,
                startAngle: 0,
                innerRadius: 0,
                outerRadius: radius,
              }) as string
            }
          />
        </G>
      </Svg>
      <View
        width={props.size}
        height={props.size}
        top={0}
        left={0}
        position="absolute"
      >
        {props.children}
      </View>
    </View>
  );
};

export {DoughnutChart};
