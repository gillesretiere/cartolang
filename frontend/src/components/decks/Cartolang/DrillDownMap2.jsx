import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5geodata_region_world_europeLow from '@amcharts/amcharts5-geodata/region/world/europeLow';
import am5geodata_region_world_africaLow from '@amcharts/amcharts5-geodata/region/world/africaLow';
import am5geodata_region_world_southAmericaLow from '@amcharts/amcharts5-geodata/region/world/southAmericaLow';
import am5geodata_region_world_asiaLow from '@amcharts/amcharts5-geodata/region/world/asiaLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const DrillDownMap2 = ({ onCountrySelect }) => {
  const chartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  // Paramètres de zoom pour chaque continent
  const continentSettings = {
    europe: { homeGeoPoint: { longitude: 10, latitude: 50 }, homeZoomLevel: 4 },
    africa: { homeGeoPoint: { longitude: 20, latitude: 0 }, homeZoomLevel: 3 },
    southAmerica: { homeGeoPoint: { longitude: -60, latitude: -15 }, homeZoomLevel: 3 },
    asia: { homeGeoPoint: { longitude: 100, latitude: 30 }, homeZoomLevel: 3 },
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
              geometry: am5geodata_region_world_europeLow.features[0].geometry,
            },
            {
              id: 'africa',
              properties: { name: 'Afrique' },
              geometry: am5geodata_region_world_africaLow.features[0].geometry,
            },
            {
              id: 'southAmerica',
              properties: { name: 'Amérique du Sud' },
              geometry: am5geodata_region_world_southAmericaLow.features[0].geometry,
            },
            {
              id: 'asia',
              properties: { name: 'Asie' },
              geometry: am5geodata_region_world_asiaLow.features[0].geometry,
            },
          ],
        },
      })
    );

    console.log (am5geodata_region_world_europeLow.features);

    continentSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0xaaaaaa),
      strokeWidth: 1,
    });

    continentSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x677935),
    });

    continentSeries.mapPolygons.template.states.create('active', {
      fill: am5.color(0x297373),
    });

    // Créer la série pour les pays (vide au départ)
    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: null,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0xaaaaaa),
      strokeWidth: 1,
    });

    countrySeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x677935),
    });

    countrySeries.mapPolygons.template.states.create('active', {
      fill: am5.color(0x297373),
    });

    // Liste des GeoJSON pour chaque continent
    const continentGeoJSON = {
      europe: am5geodata_region_world_europeLow,
      africa: am5geodata_region_world_africaLow,
      southAmerica: am5geodata_region_world_southAmericaLow,
      asia: am5geodata_region_world_asiaLow,
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
      chart.goHome();
      const settings = continentSettings[continentId];
      console.log(continentSettings);
      chart.animate(
        { key: 'zoom', to: settings.homeZoomLevel },
        800
      );
      chart.animate(
        { key: 'center', to: settings.homeGeoPoint },
        800
      );
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
      chart.goHome();
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
      {selectedContinent && continentSettings && (
        <p className="text-center mt-2 text-lg font-semibold">
          Continent sélectionné : {selectedContinent} {continentSettings[selectedContinent]?.name}
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

export default DrillDownMap2;