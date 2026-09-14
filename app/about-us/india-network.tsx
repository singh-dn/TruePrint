const cities = [
  { name: "New Delhi", lon: 77.209, lat: 28.614, labelX: 14, labelY: -26, width: 88 },
  { name: "Ahmedabad", lon: 72.571, lat: 23.023, labelX: -93, labelY: -30, width: 108 },
  { name: "Mumbai", lon: 72.878, lat: 19.076, labelX: -77, labelY: 12, width: 82 },
  { name: "Hyderabad", lon: 78.486, lat: 17.385, labelX: 13, labelY: -16, width: 102 },
  { name: "Bengaluru", lon: 77.594, lat: 12.972, labelX: -92, labelY: 14, width: 99 },
  { name: "Chennai", lon: 80.27, lat: 13.083, labelX: 14, labelY: 14, width: 83 },
  { name: "Kolkata", lon: 88.364, lat: 22.573, labelX: -19, labelY: 16, width: 78 },
  { name: "Guwahati", lon: 91.737, lat: 26.144, labelX: 14, labelY: -32, width: 96 },
].map(city => ({ ...city, x: 18.44134268145433 + (city.lon - 68.143403) * 0.9271838545667874 * 20.78595112536624, y: 15 + (37.054484 - city.lat) * 20.78595112536624 }));

export default function IndiaNetwork() {
  const hub = cities[0];
  return (
    <figure className="aboutIndiaMap aboutReveal">
      <svg viewBox="0 0 600 660" role="img" aria-labelledby="india-network-title india-network-description">
        <title id="india-network-title">An illustrated network across India</title>
        <desc id="india-network-description">Dotted map with illustrative connections between New Delhi, Ahmedabad, Mumbai, Hyderabad, Bengaluru, Chennai, Kolkata and Guwahati. Markers do not represent TruePrint offices.</desc>
        <defs>
          <pattern id="india-dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.15" fill="#aebecb" /></pattern>
          <mask id="india-shape" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="660" style={{ maskType: "alpha" }}><image href="/india-network-outline.svg" width="600" height="660" /></mask>
        </defs>
        <rect width="600" height="660" fill="url(#india-dots)" mask="url(#india-shape)" />
        <g fill="none" stroke="#16a6d4" strokeWidth="1.4">
          {cities.slice(1).map((city, index) => {
            const curveX = (hub.x + city.x) / 2 + (city.x > hub.x ? 35 : -45);
            const curveY = (hub.y + city.y) / 2 - 60;
            const d = `M${hub.x},${hub.y} Q${curveX},${curveY} ${city.x},${city.y}`;
            return <g key={city.name}><path d={d} opacity="0.23" /><path className="aboutMapRoute" d={d} pathLength="1" style={{ animationDelay: `${index * -0.7}s` }} /></g>;
          })}
        </g>
        {cities.map((city, i) => <g key={city.name} className="aboutMapCity" transform={`translate(${city.x} ${city.y})`}>
          <circle className="aboutMapPulse" r="10" fill="#17b7dc" opacity="0.16" style={{ animationDelay: `${i * -0.4}s` }} />
          <circle r="4" fill="#059dca" stroke="white" strokeWidth="1.5" />
          <g transform={`translate(${city.labelX} ${city.labelY})`}><rect width={city.width} height="27" rx="7" fill="white" stroke="#e4eaf0" /><text x="10" y="18" fill="#17283a" fontSize="14" fontWeight="600">{city.name}</text></g>
        </g>)}
      </svg>
      <figcaption>ILLUSTRATIVE CONNECTIONS <span>Map data: Natural Earth</span></figcaption>
    </figure>
  );
}
