import React, { useState, useEffect, } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import PropTypes from 'prop-types';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const LanguageRegionMapAm5 = ({ countryCode, vkRegionName, vkPointSeries, vkMapConfig }) => {


    const [geoJson, setGeoJson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger le GeoJSON dynamiquement
    // Charger le GeoJSON dynamiquement
    useEffect(() => {
        const fetchGeoJson = async () => {
            try {
                setLoading(true);
                // URL du fichier GeoJSON (par exemple, /public/geojson/maliLow.json)
                const response = await fetch(`/geojson/${countryCode}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch GeoJSON for ${countryCode}`);
                }
                const data = await response.json();
                setGeoJson(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (countryCode) {
            fetchGeoJson();
        }
    }, [countryCode]);

    useEffect(() => {
        // Get GeoJSON from registry
        if (!geoJson || loading) return;

        // Create root element
        const root = am5.Root.new('chartdiv');

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Créer la carte
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoMercator(),
                panX: 'none',
                panY: 'none',
                wheelY: 'none',
                wheelX: 'none',
                ...vkMapConfig,
            })
        );
        // Create main polygon series for the map
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: geoJson,
                idField: 'id',
                fill: am5.color(0xe0e0e0),
                stroke: am5.color(0x2c2f33),
                strokeWidth: 0.5,
                valueField: 'value',
                calculateAggregates: true,
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
                console.log(`DataItem ${index}:`, {
                    context: dataItem.dataContext,
                    hasPolygon: !!polygon,
                    regionName,
                    vkRegionName,
                });
                if (polygon && vkRegionName.includes(regionName)) {
                    polygon.setAll({
                        fill: am5.color(0xFF7061), // Orange for specified regions
                        fillOpacity: 1.0,
                        stroke: am5.color(0x2c2f33),
                        strokeWidth: 0.8,
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
                    fill: am5.color(0xF44336),
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
    }, [geoJson, loading, vkRegionName, vkPointSeries, vkMapConfig,]);

    return (
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
    );
};

LanguageRegionMapAm5.propTypes = {
    countryCode: PropTypes.string.isRequired,
    vkRegionName: PropTypes.arrayOf(PropTypes.string),
    vkPointSeries: PropTypes.arrayOf(PropTypes.number),
    vkMapConfig: PropTypes.shape({
        homeGeoPoint: PropTypes.shape({
            longitude: PropTypes.number,
            latitude: PropTypes.number,
        }),
        homeZoomLevel: PropTypes.number,
    }),
};


export default LanguageRegionMapAm5;