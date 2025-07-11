import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5geodata_germanyLow from '@amcharts/amcharts5-geodata/germanyLow';
import am5geodata_ukLow from '@amcharts/amcharts5-geodata/ukLow';
import am5geodata_switzerlandLow from '@amcharts/amcharts5-geodata/switzerlandLow';
import am5geodata_polandLow from '@amcharts/amcharts5-geodata/polandLow';
import am5geodata_netherlandsLow from '@amcharts/amcharts5-geodata/netherlandsLow';
import am5geodata_denmarkLow from '@amcharts/amcharts5-geodata/denmarkLow';
import am5geodata_syriaLow from '@amcharts/amcharts5-geodata/syriaLow';
import am5geodata_chinaLow from '@amcharts/amcharts5-geodata/chinaLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const DrillDownMap = ({ onCountrySelect }) => {
  const chartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const colorIndexPolygon = am5.color(0xFF7061); //0xF23D3D

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

    // Créer la série principale (carte mondiale)
    const worldSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'], // Exclure l'Antarctique
      })
    );

    worldSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0xaaaaaa),
      strokeWidth: 1,
    });

    worldSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(colorIndexPolygon),
    });

    worldSeries.mapPolygons.template.states.create('active', {
      fill: am5.color(colorIndexPolygon),
    });

    // Créer la série pour les cartes des pays (vide au départ)
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

    // Liste des GeoJSON pour chaque pays
    const countryGeoJSON = {
      DE: am5geodata_germanyLow,
      GB: am5geodata_ukLow,
      CH: am5geodata_switzerlandLow,
      PL: am5geodata_polandLow,
      NL: am5geodata_netherlandsLow,
      DK: am5geodata_denmarkLow,
      SY: am5geodata_syriaLow,
      CN: am5geodata_chinaLow,
    };

    // Liste des coordonnées et niveaux de zoom pour chaque pays
    const countrySettings = {
      DE: { homeGeoPoint: { longitude: 10, latitude: 51 }, homeZoomLevel: 5 },
      GB: { homeGeoPoint: { longitude: -2, latitude: 54 }, homeZoomLevel: 5 },
      CH: { homeGeoPoint: { longitude: 8, latitude: 47 }, homeZoomLevel: 7 },
      PL: { homeGeoPoint: { longitude: 19, latitude: 52 }, homeZoomLevel: 6 },
      NL: { homeGeoPoint: { longitude: 5.5, latitude: 52.3 }, homeZoomLevel: 7 },
      DK: { homeGeoPoint: { longitude: 10, latitude: 56 }, homeZoomLevel: 6 },
      SY: { homeGeoPoint: { longitude: 38, latitude: 35 }, homeZoomLevel: 6 },
      CN: { homeGeoPoint: { longitude: 104, latitude: 35 }, homeZoomLevel: 4 },
    };

    // Gestion du clic sur un pays
    worldSeries.mapPolygons.template.events.on('click', (ev) => {
      const countryCode = ev.target.dataItem.dataContext.id;
      // Anyhow
      setSelectedCountry(countryCode);
      onCountrySelect(countryCode);
      if (countryGeoJSON[countryCode]) {
        countrySeries.set('geoJSON', countryGeoJSON[countryCode]);
        worldSeries.hide();
        countrySeries.show();
        chart.goHome();
        const settings = countrySettings[countryCode];
        chart.animate(
          { key: 'zoom', to: settings.homeZoomLevel },
          800
        );
        chart.animate(
          { key: 'center', to: settings.homeGeoPoint },
          800
        );
      }
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
      worldSeries.show();
      chart.goHome();
      backButton.hide();
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
    <div className="w-full h-[400px] bg-gray-100">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default DrillDownMap;