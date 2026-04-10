import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

function ThreatMap() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("attack", (data) => {
      setAttacks(prev => [data, ...prev.slice(0, 20)]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <ComposableMap>
      <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
        {({ geographies }) =>
          geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>

      {attacks.map((a, i) => (
        <Marker key={i} coordinates={[a.lng, a.lat]}>
          <circle r={5} fill="red" />
        </Marker>
      ))}
    </ComposableMap>
  );
}

export default ThreatMap;