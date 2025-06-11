const states = ['red', 'yellow', 'green'];
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % states.length;
  renderTrafficLight();
}, 1000);

const TrafficLight = ({ active }) => {
  return (
    <div className="traffic-light">
      <div className={`light red ${active === 'red' ? 'active' : ''}`}></div>
      <div className={`light yellow ${active === 'yellow' ? 'active' : ''}`}></div>
      <div className={`light green ${active === 'green' ? 'active' : ''}`}></div>
    </div>
  );
};

function renderTrafficLight() {
  ReactDOM.render(<TrafficLight active={states[currentIndex]} />, document.getElementById('root'));
}

renderTrafficLight();
