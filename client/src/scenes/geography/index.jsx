import React from 'react';
import Header from 'components/Header';
import { Box, useTheme } from '@mui/material';
import { useGetGeographyQuery } from 'state/api';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'state/geoData';

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  console.log('🚀 ~ file: index.jsx:11 ~ Geography ~ data:', data);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='GEOGRAPHY' subtitle='Map of your customers by location' />
      <Box
        mt='40px'
        height='75vh'
        border={`1px solid ${theme.palette.secondary[900]}`}
        borderRadius='4px'
        backgroundColor={theme.palette.secondary[300]}
      >
        {data ? (
          <ResponsiveChoropleth
            data={data.formattedLocations}
            theme={{
              textColor: 'black',
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[900],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[900],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[300],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.secondary[200],
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, data.maxValue]}
            unknownColor='#666666'
            label='properties.name'
            valueFormat='.2s'
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={1.0}
            borderColor='#ffffff'
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.primary[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: 'black',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
