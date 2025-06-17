type LightColor = 'red' | 'yellow' | 'green';

// Reusable Light component
const Light: React.FC<{ color: LightColor; isActive: boolean }> = ({ color, isActive }) => {
  return <div className={`light ${color} ${isActive ? 'active' : ''}`}></div>;
};

// TrafficLight component
const TrafficLight: React.FC<{ active: LightColor }> = ({ active }) => {
  const colors: LightColor[] = ['red', 'yellow', 'green'];
  
  return (
    <div className="traffic-light">
      {colors.map((color) => (
        <Light key={color} color={color} isActive={active === color} />
      ))}
    </div>
  );
};

// App logic
const states: LightColor[] = ['red', 'yellow', 'green'];
let currentIndex = 0;

const renderTrafficLight = () => {
  ReactDOM.render(
    <TrafficLight active={states[currentIndex]} />,
    document.getElementById('root')
  );
};

setInterval(() => {
  currentIndex = (currentIndex + 1) % states.length;
  renderTrafficLight();
}, 1000);

// Initial render
renderTrafficLight();
