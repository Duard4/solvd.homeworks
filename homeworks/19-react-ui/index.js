const { useState } = React;

const AvatarApp = () => {
  const [avatars, setAvatars] = useState([]);

  const fetchAvatar = async () => {
    const response = await fetch('https://tinyfac.es/api/data?limit=50&quality=0');
    const data = await response.json();
    return data[Math.floor(Math.random() * data.length)].url;
  };

  const handleAddTile = async () => {
    const avatarUrl = await fetchAvatar();
    setAvatars([...avatars, { id: Date.now(), url: avatarUrl }]);
  };

  const handleRefreshTile = async (id) => {
    const avatarUrl = await fetchAvatar();
    setAvatars(
      avatars.map((avatar) => (avatar.id === id ? { ...avatar, url: avatarUrl } : avatar))
    );
  };

  const handleRefreshAll = async () => {
    const newAvatars = await Promise.all(
      avatars.map(async (avatar) => {
        const avatarUrl = await fetchAvatar();
        return { ...avatar, url: avatarUrl };
      })
    );
    setAvatars(newAvatars);
  };

  return (
    <div className="container">
      <ul className="avatar-grid">
        {avatars.map((avatar) => (
          <li key={avatar.id} className="tile">
            <img
              src={avatar.url}
              alt="Avatar"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRefreshTile(avatar.id)}
              title="Click to refresh this avatar"
            />
          </li>
        ))}
        <li>
          <button className="add-btn tile" onClick={handleAddTile}></button>
        </li>
      </ul>
      <button onClick={handleRefreshAll} className="refresh-btn">
        Refresh All
      </button>
    </div>
  );
};

ReactDOM.render(<AvatarApp />, document.getElementById('root'));
