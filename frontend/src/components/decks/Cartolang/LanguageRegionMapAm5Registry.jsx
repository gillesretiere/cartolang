import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import geoJsonRegistry from './geoJsonRegistry';

const LanguageRegionMapAm5Registry = ({ countryCode, vkRegionName, vkPointSeries, vkMapConfig }) => {
  useEffect(() => {
    // Get GeoJSON from registry
    const geoJSON = geoJsonRegistry[countryCode];

    if (!geoJSON) {
      console.error(`GeoJSON for country code "${countryCode}" not found in registry.`);
      return;
    }

    // Create root element
    const root = am5.Root.new('chartdiv');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        homeGeoPoint: vkMapConfig?.homeGeoPoint || { longitude: 54, latitude: 35 }, // Default: Iran
        homeZoomLevel: vkMapConfig?.homeZoomLevel || 4,
        minZoomLevel: vkMapConfig?.minZoomLevel || 2,
        maxZoomLevel: vkMapConfig?.maxZoomLevel || 10,
      })
    );

    // Create main polygon series for the map
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: geoJSON,
        idField: 'id',
        fill: am5.color(0x68aa79),
        stroke: am5.color(0xffffff),
        strokeWidth: 0.5,
      })
    );

    // Add tooltip for regions
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    });

    // Highlight specified regions in the main series
    polygonSeries.events.on('datavalidated', () => {
      polygonSeries.dataItems.forEach((dataItem, index) => {
        const regionName = dataItem.dataContext?.properties?.name || dataItem.dataContext?.name;
        const polygon = dataItem.get('mapPolygon');
        /*
        console.log(`DataItem ${index}:`, {
          context: dataItem.dataContext,
          hasPolygon: !!polygon,
          regionName,
        });
        */
        if (polygon && vkRegionName.includes(regionName)) {
          polygon.setAll({
            fill: am5.color(0xf25f4b), // Orange for specified regions
            fillOpacity: 0.8,
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
          });
        }
      });
    });

    // Add point series for specified coordinates
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        autoCreateSprites: true,
      })
    );
    pointSeries.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 10,
          fill: am5.color(0xf25f4b),
          stroke: am5.color(0xffffff),
          strokeWidth: 1,
        }),
      })
    );
    pointSeries.data.setAll([
      {
        geometry: {
          type: 'Point',
          coordinates: vkPointSeries,
        },
      },
    ]);

    // Add zoom control
    chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, [countryCode, vkRegionName, vkPointSeries, vkMapConfig]);

  return (
    <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default LanguageRegionMapAm5Registry;