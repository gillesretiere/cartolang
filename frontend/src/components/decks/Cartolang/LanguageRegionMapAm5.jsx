import React, { useEffect, useState, } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_iranLow from '@amcharts/amcharts5-geodata/iranLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const LanguageRegionMapAm5 = ({ countryCode, vkRegionName, vkPointSeries }) => {

    const [geoJSON, setGeoJSON] = useState(null);
    /*
    useEffect(() => {
        // Dynamically import GeoJSON based on countryCode
        import(`@amcharts/amcharts5-geodata/${countryCode}`)
            .then((module) => {
                setGeoJSON(module.default);
            })
            .catch((error) => {
                console.error(`Failed to load GeoJSON for ${countryCode}:`, error);
            });
    }, [countryCode]);
    */
   
    useEffect(() => {
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
                homeGeoPoint: { longitude: 54, latitude: 35 }, // Center on Iran
                homeZoomLevel: 4,
                minZoomLevel: 2,
                maxZoomLevel: 10,
            })
        );

        // Create main polygon series for the map
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_iranLow,
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

        // Highlight Turkmen-speaking regions in the main series
        polygonSeries.events.on('datavalidated', () => {
            /*
            console.log('GeoJSON features:', am5geodata_iranLow.features.map(f => f.properties.name));
            console.log('Data items:', polygonSeries.dataItems.length);
            */
            polygonSeries.dataItems.forEach((dataItem, index) => {
                const regionName = dataItem.dataContext?.properties?.name || dataItem.dataContext?.name;
                const polygon = dataItem.get('mapPolygon'); // Use 'mapPolygon' instead of 'geometry'
                console.log(`DataItem ${index}:`, {
                    context: dataItem.dataContext,
                    hasPolygon: !!polygon,
                    regionName,
                });
                if (polygon && vkRegionName.includes(regionName)) {
                    polygon.setAll({
                        fill: am5.color(0xf25f4b), // Orange for Turkmen regions
                        fillOpacity: 0.8,
                        stroke: am5.color(0xffffff),
                        strokeWidth: 1,
                    });
                }
            });
        });


        // Alternative: Add point for Turkmen region (e.g., Gonbad-e Kavus)
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
                })
            })
        );
        pointSeries.data.setAll([
            {
                geometry: {
                    type: 'Point',
                    coordinates: vkPointSeries
                }
            },
        ]);
        pointSeries.events.on('datavalidated', () => {
            // console.log(dictPointSeries);




        });





        // Add zoom control
        chart.set('zoomControl', am5map.ZoomControl.new(root, {}));

        // Cleanup on component unmount
        return () => {
            root.dispose();
        };
    }, [vkRegionName, vkPointSeries,]);

    return (
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
    );
};

export default LanguageRegionMapAm5;