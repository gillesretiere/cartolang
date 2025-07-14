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

const DrillDownMap6 = ({ onCountrySelect }) => {
  const chartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  // Couleur pour les pays sélectionnés
  const selectedColor = am5.color(0xff007f);
  const vkColorPalette = [
    '0x8ecae6',
    '0x73bfdc',
    '0x58b4d1',
    '0x219ebc',
    '0x126782',
    '0x023047',
    '0xffb703',
    '0xfd9e02',
    '0xfb8500',
    '0xfb9017',
  ];

  // Paramètres de zoom, noms et couleurs pour chaque continent
  const continentSettings = {
    europe: {
      name: 'Europe',
      homeGeoPoint: { longitude: 10, latitude: 50 },
      homeZoomLevel: 12,
      color: am5.color(0x4D96FF),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
    },
    africa: {
      name: 'Afrique',
      homeGeoPoint: { longitude: 20, latitude: -10 },
      homeZoomLevel: 5,
      color: am5.color(0x6BCB77),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
    },
    southAmerica: {
      name: 'Amérique du Sud',
      homeGeoPoint: { longitude: -60, latitude: -30 },
      homeZoomLevel: 5,
      color: am5.color(0xFF8282),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
    },
    asia: {
      name: 'Asie',
      homeGeoPoint: { longitude: 100, latitude: 30 },
      homeZoomLevel: 3,
      color: am5.color(0xFFD93D),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
    },
    northAmerica: {
      name: 'Amérique du Nord',
      homeGeoPoint: { longitude: -100, latitude: 40 },
      homeZoomLevel: 3,
      color: am5.color(0xB7B1F2),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
    },
    oceania: {
      name: 'Océanie',
      homeGeoPoint: { longitude: 170, latitude: -35 },
      homeZoomLevel: 5,
      color: am5.color(0xFF9A00),
      strokeWidth: 0.1,
      vkColor: vkColorPalette,
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

    // Configurer le template des polygones
    continentSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      strokeWidth: 0.1,
      stroke: am5.color(0x000000),
    });

    // État hover
    continentSeries.mapPolygons.template.states.create('hover', {
      fillOpacity: 0.8,
    });

    // État actif (sélectionné)
    continentSeries.mapPolygons.template.states.create('active', {
      fillOpacity: 1,
      strokeWidth: 3,
      stroke: am5.color(0x000000),
    });

    // Créer la série pour les pays
    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: null,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color(0xFF9A00),
      strokeWidth: 1,
    });

    // Appliquer les couleurs aléatoires aux pays
    countrySeries.events.on('datavalidated', () => {
      countrySeries.mapPolygons.each((polygon) => {
        let randomColor = continentSettings[selectedContinent].vkColor[
          Math.floor(Math.random() * continentSettings[selectedContinent].vkColor.length)
        ];
        polygon.set('fill', am5.color(parseInt(randomColor, 16)));
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

      // Réinitialiser l'état actif de tous les polygones
      continentSeries.mapPolygons.each((polygon) => {
        polygon.states.apply('default');
      });

      // Activer l'état actif pour le polygone cliqué
      ev.target.states.apply('active');

      // Animation de pulsation
      const animation = ev.target.animate({
        key: 'fillOpacity',
        from: 0.1,
        to: 1.0,
        duration: 800,
        loops: 1,
      });

      // Attacher l'événement finished
      animation.events.on('finished', () => {
        // Après l’animation, passer à la série des pays
        countrySeries.set('geoJSON', continentGeoJSON[continentId]);
        continentSeries.hide();
        countrySeries.show();
        const settings = continentSettings[continentId];
        chart.zoomToGeoPoint(
          { longitude: settings.homeGeoPoint.longitude, latitude: settings.homeGeoPoint.latitude },
          settings.homeZoomLevel,
          true,
          800
        );
      });
      
      setTimeout(() => {
        if (!animation.isFinished()) {
          animation.stop();
          countrySeries.set('geoJSON', continentGeoJSON[continentId]);
          continentSeries.hide();
          countrySeries.show();
          const settings = continentSettings[continentId];
          chart.zoomToGeoPoint(
            { longitude: settings.homeGeoPoint.longitude, latitude: settings.homeGeoPoint.latitude },
            settings.homeZoomLevel,
            true,
            800
          );
        }
      }, 150);
    });

    // Gestion du clic sur un pays
    countrySeries.mapPolygons.template.events.on('click', (ev) => {
      const countryCode = ev.target.dataItem.dataContext.id;
      const countryName = ev.target.dataItem.dataContext.name;
      setSelectedCountry(countryCode);
      setSelectedCountryName(countryName);
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
  }, [onCountrySelect, selectedContinent]);

  return (
    <div className="w-full h-[200px] md:h-[400px] bg-gray-100">
      <div ref={chartRef} className="w-full h-full" />
      {selectedCountry && (
        <p className="text-center mt-2 text-lg font-semibold">
          Pays sélectionné : {selectedCountryName}
        </p>
      )}
      {selectedContinent && (
        <>
          <p className="font-articulat_cf font-bold text-center mt-2 text-md">
            Continent sélectionné : {continentSettings[selectedContinent].name}
          </p>
          <p className="font-articulat_cf font-bold text-center mt-2 text-sm">
            Cliquez une nouvelle fois pour zoomer
          </p>
        </>
      )}
    </div>
  );
};

export default DrillDownMap6;
