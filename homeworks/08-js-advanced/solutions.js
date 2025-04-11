export function pluck(obj, path) {
  if (typeof obj !== 'object' || obj === null) return null;
  let current = obj;
  for (const step of path.split('.')) {
    current = current?.[step];
    if (current === undefined) return null;
  }
  return current;
}

export function clone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const clonedObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clonedObj[key] = clone(obj[key]);
  }
  return clonedObj;
}

export function moment(dateTimeStr) {
  const [date, time] = dateTimeStr.split(' ');
  const [d, m, y] = date.split('/');
  const [h, min, s] = (time || '00:00:00').split(':');
  return new Date(`${y}-${m}-${d}T${h}:${min}:${s}`);
}

export function offset(date) {
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;
  if (diffHours < 24) {
    return remainingMinutes
      ? `${diffHours} hour${diffHours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ago`
      : `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

export function randomDate(date1, date2) {
  return new Date(date2 - Math.random() * (date2 - date1));
}

export function objConcat(objArr) {
  return objArr.reduce((acc, obj) => {
    for (let key of Object.keys(obj)) acc[key] = obj[key];
    return acc;
  }, {});
}

export function NamedOne(firstName, lastName) {
  return {
    get firstName() {
      return firstName;
    },
    set firstName(value) {
      firstName = value;
      this.fullName = `${firstName} ${lastName}`;
    },

    get lastName() {
      return lastName;
    },
    set lastName(value) {
      lastName = value;
      this.fullName = `${firstName} ${lastName}`;
    },

    get fullName() {
      return `${firstName} ${lastName}`;
    },
    set fullName(value) {
      const parts = value.split(' ');
      if (parts.length === 2) {
        firstName = parts[0];
        lastName = parts[1];
      }
    },
  };
}

export function OnceNamedOne(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  Object.freeze(this);
}

export function humanReadable(seconds) {
  if (seconds < 0 || seconds > 359999) return '99:59:59';

  const pad = (num) => String(num).padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}
