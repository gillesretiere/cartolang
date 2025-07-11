import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_region_world_europeLow from '@amcharts/amcharts5-geodata/region/world/europeLow';
import am5geodata_region_world_africaLow from '@amcharts/amcharts5-geodata/region/world/africaLow';
import am5geodata_region_world_southAmericaLow from '@amcharts/amcharts5-geodata/region/world/southAmericaLow';
import am5geodata_region_world_asiaLow from '@amcharts/amcharts5-geodata/region/world/asiaLow';
import am5geodata_region_world_northAmericaLow from '@amcharts/amcharts5-geodata/region/world/northAmericaLow';
import am5geodata_region_world_oceaniaLow from '@amcharts/amcharts5-geodata/region/world/oceaniaLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const DrillDownMap5 = ({ onCountrySelect }) => {
  const chartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const selectedColor = am5.color(0x60B5FF);

  // Paramètres de zoom, noms et couleurs pour chaque continent
  const continentSettings = {
    europe: {
      name: 'Europe',
      homeGeoPoint: { longitude: 10, latitude: 50 },
      homeZoomLevel: 4,
      color: am5.color(0x4D96FF), // Bleu474E93
      vkColor: ['0x012A4A', '0x013A63', '0x01497C', '0x014F86', '0x2A6F97', '0x2C7DA0', '0x468FAF', '0x61A5C2'],
    },
    africa: {
      name: 'Afrique',
      homeGeoPoint: { longitude: 20, latitude: 0 },
      homeZoomLevel: 3,
      color: am5.color(0x6BCB77), // Vert
      vkColor: ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'],
    },
    southAmerica: {
      name: 'Amérique du Sud',
      homeGeoPoint: { longitude: -60, latitude: -15 },
      homeZoomLevel: 3,
      color: am5.color(0xFF8282), // Rouge
      vkColor: ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'],
    },
    asia: {
      name: 'Asie',
      homeGeoPoint: { longitude: 100, latitude: 30 },
      homeZoomLevel: 3,
      color: am5.color(0xFFD93D), // Jaune
      vkColor: ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'],
    },
    northAmerica: {
      name: 'Amérique du Nord',
      homeGeoPoint: { longitude: -100, latitude: 40 },
      homeZoomLevel: 3,
      color: am5.color(0xB7B1F2), // Violet
      vkColor: ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'],
    },
    oceania: {
      name: 'Océanie',
      homeGeoPoint: { longitude: 140, latitude: -25 },
      homeZoomLevel: 3,
      color: am5.color(0xFF9A00), // Cyan
      vkColor: ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'],
    },
  };

  useEffect(() => {
    // Créer la racine de la carte
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // Créer le composant de carte
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        homeZoomLevel: 1,
        homeGeoPoint: { longitude: 0, latitude: 20 },
      })
    );

    // Créer la série principale (continents)
    const continentSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: {
          type: 'FeatureCollection',
          features: [
            {
              id: 'europe',
              properties: { name: 'Europe' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_europeLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
            {
              id: 'africa',
              properties: { name: 'Afrique' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_africaLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
            {
              id: 'southAmerica',
              properties: { name: 'Amérique du Sud' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_southAmericaLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
            {
              id: 'asia',
              properties: { name: 'Asie' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_asiaLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
            {
              id: 'northAmerica',
              properties: { name: 'Amérique du Nord' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_northAmericaLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
            {
              id: 'oceania',
              properties: { name: 'Océanie' },
              geometry: {
                type: 'MultiPolygon',
                coordinates: am5geodata_region_world_oceaniaLow.features.reduce((acc, feature) => {
                  return acc.concat(feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
                }, []),
              },
            },
          ],
        },
      })
    );

    // Appliquer les couleurs spécifiques à chaque continent
    continentSeries.events.on('datavalidated', () => {
      continentSeries.mapPolygons.each((polygon) => {
        const continentId = polygon.dataItem.dataContext.id;
        polygon.set('fill', continentSettings[continentId].color);
      });
    });

    continentSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      strokeWidth: 0.1,
    });

    continentSeries.mapPolygons.template.states.create('hover', {
      fillOpacity: 0.8,
    });

    continentSeries.mapPolygons.template.states.create('active', {
      fillOpacity: 1,
    });

    // Créer la série pour les pays (vide au départ)
    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: null,
      })
    );

    const myArray = ['0x819A91', '0xA7C1A8', '0xD1D8BE', '0xEEEFE0', '0x727D73', '0xAAB99A', '0xD0DDD0', '0xF0F0D7'];
    countrySeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(am5.color(0xFF9A00)),
      strokeWidth: 1,
    });


    // Appliquer les couleurs spécifiques à chaque continent
    countrySeries.events.on('datavalidated', () => {
      countrySeries.mapPolygons.each((polygon) => {
        const continentId = polygon.dataItem.dataContext.id;
        console.log(continentId);
        console.log(continentSettings[selectedContinent].vkColor);
        console.log(myArray);
        const vc = continentSettings[selectedContinent].vkColor;
        let clr = (vc[(Math.random() * myArray.length) | 0]);
        polygon.set('fill', am5.color(parseInt(clr, 16)));
      });
    });

    countrySeries.mapPolygons.template.states.create('hover', {
      fill: selectedColor,
    });

    countrySeries.mapPolygons.template.states.create('active', {
      fill: selectedColor,
    });

    // Liste des GeoJSON pour chaque continent
    const continentGeoJSON = {
      europe: am5geodata_region_world_europeLow,
      africa: am5geodata_region_world_africaLow,
      southAmerica: am5geodata_region_world_southAmericaLow,
      asia: am5geodata_region_world_asiaLow,
      northAmerica: am5geodata_region_world_northAmericaLow,
      oceania: am5geodata_region_world_oceaniaLow,
    };

    // Gestion du clic sur un continent
    continentSeries.mapPolygons.template.events.on('click', (ev) => {
      const continentId = ev.target.dataItem.dataContext.id;
      setSelectedContinent(continentId);
      setSelectedCountry(null);
      onCountrySelect(null);
      countrySeries.set('geoJSON', continentGeoJSON[continentId]);
      continentSeries.hide();
      countrySeries.show();
      const settings = continentSettings[continentId];
      chart.zoomIn();

    });
    // Gestion du clic sur un pays
    countrySeries.mapPolygons.template.events.on('click', (ev) => {
      const countryCode = ev.target.dataItem.dataContext.id;
      setSelectedCountry(countryCode);
      onCountrySelect(countryCode);
    });

    // Bouton de retour à la carte mondiale
    const backButton = root.container.children.push(
      am5.Button.new(root, {
        label: am5.Label.new(root, { text: 'Retour à la carte mondiale' }),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        x: am5.p100,
        centerX: am5.p100,
        y: 10,
        visible: false,
      })
    );

    backButton.events.on('click', () => {
      countrySeries.set('geoJSON', null);
      countrySeries.hide();
      continentSeries.show();
      chart.zoomToPoint(
        { x: 0, y: 20 },
        1,
        true,
        800
      );
      backButton.hide();
      setSelectedContinent(null);
      setSelectedCountry(null);
      onCountrySelect(null);
    });

    countrySeries.events.on('datavalidated', () => {
      if (countrySeries.data.length > 0) {
        backButton.show();
      }
    });

    // Nettoyage à la désactivation du composant
    return () => {
      root.dispose();
    };
  }, [onCountrySelect]);

  return (
    <div className="w-full h-[500px] bg-gray-100">
      <div ref={chartRef} className="w-full h-full" />
      {selectedContinent && (
        <p className="text-center mt-2 text-lg font-semibold">
          Continent sélectionné : {continentSettings[selectedContinent].name}
        </p>
      )}
      {selectedCountry && (
        <p className="text-center mt-2 text-lg font-semibold">
          Pays sélectionné : {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default DrillDownMap5;