class Serializable {
  constructor() {
    if (this.constructor === Serializable) {
      throw new Error('Serializable is an abstract class and cannot be instantiated directly');
    }
  }

  serialize() {
    return JSON.stringify({
      __type: this.constructor.name,
      data: this._serializeProps(this),
    });
  }

  wakeFrom(serialized) {
    const parsed = JSON.parse(serialized);

    if (parsed.__type !== this.constructor.name) {
      throw new Error(`Cannot wake ${this.constructor.name} from serialized ${parsed.__type}`);
    }

    return Object.assign(
      Object.create(this.constructor.prototype),
      this._deserializeData(parsed.data)
    );
  }

  _serializeProps(value) {
    // Handle primitives and special numbers
    if (value === null) return { __type: 'null', value: null };
    if (typeof value === 'string') return { __type: 'string', value };
    if (typeof value === 'number') {
      if (Object.is(value, NaN)) return { __type: 'number', value: 'NaN' };
      if (value === Infinity) return { __type: 'number', value: 'Infinity' };
      if (value === -Infinity) return { __type: 'number', value: '-Infinity' };
      if (Object.is(value, -0)) return { __type: 'number', value: 0 };
      return { __type: 'number', value };
    }

    // Handle complex types
    if (value instanceof Date) return { __type: 'date', value: value.toISOString() };

    if (Array.isArray(value)) {
      return {
        __type: 'array',
        value: value.map((item) => this._serializeProps(item)),
      };
    }

    if (typeof value === 'object') {
      const result = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          result[key] = this._serializeProps(value[key]);
        }
      }
      return { __type: 'object', value: result };
    }

    return undefined; // Skip unsupported types
  }

  _deserializeData(data) {
    if (!data || typeof data !== 'object') return data;

    const { __type, value } = data;

    switch (__type) {
      case 'null': {
        return null;
      }
      case 'string': {
        return value;
      }
      case 'number': {
        if (value === 'NaN') return NaN;
        if (value === 'Infinity') return Infinity;
        if (value === '-Infinity') return -Infinity;
        return value;
      }
      case 'date': {
        return new Date(value);
      }
      case 'array': {
        return value.map((item) => this._deserializeData(item));
      }
      case 'object': {
        const result = {};
        for (const key in value) {
          result[key] = this._deserializeData(value[key]);
        }
        return result;
      }
      default: {
        throw new Error(`Unsupported type: ${__type}`);
      }
    }
  }
}

// Example classes for testing
// Example 1: Simple user data with primitive types and Date
class UserDTO extends Serializable {
  constructor({ firstName, lastName, phone, birth } = {}) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.birth = birth;
  }

  printInfo() {
    console.log(
      `${this.firstName[0]}. ${this.lastName} - ${this.phone}, ${this.birth.toISOString()}`
    );
  }
}

// Create a user instance
let tolik = new UserDTO({
  firstName: 'Anatoliy',
  lastName: 'Nashovich',
  phone: '2020327',
  birth: new Date('1999-01-02'),
});

// Print original user info
console.log('Original user:');
tolik.printInfo(); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

// Serialize the user
const serialized = tolik.serialize();
console.log('Serialized data:', serialized);

// Clean up original instance
tolik = null;

// Resurrect user from serialized data
const resurrectedTolik = new UserDTO().wakeFrom(serialized);
console.log('Resurrected user is UserDTO instance:', resurrectedTolik instanceof UserDTO); // true
console.log('Resurrected user info:');
resurrectedTolik.printInfo(); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

// Example 2: Class cross-check
class Post extends Serializable {
  constructor({ content, date, author } = {}) {
    super();
    this.content = content;
    this.date = date;
    this.author = author;
  }
}

// Try to wake Post from User data (should fail)
try {
  console.log(new Post().wakeFrom(serialized));
} catch (error) {
  console.log('Error when waking wrong class (expected):', error.message);
}

// Example 3: Complex nested objects
class ComplexData extends Serializable {
  constructor() {
    super();
    this.nullValue = null;
    this.stringValue = 'test string';
    this.numberValue = 42;
    this.dateValue = new Date();
    this.objectValue = {
      nestedString: 'nested',
      nestedNumber: 100,
      nestedDate: new Date('2023-05-15'),
      deeplyNested: {
        level2: 'deep',
        level2Array: [1, 2, 'three', new Date('2024-01-01')],
      },
    };
    this.arrayValue = [
      'string in array',
      { objInArray: 'value', dateInObj: new Date('2022-12-31') },
      [1, 2, 3],
      null,
    ];
  }
}

// Create complex data instance
const complex = new ComplexData();
console.log('\nOriginal complex data:', complex);

// Serialize complex data
const serializedComplex = complex.serialize();
console.log('Serialized complex data:', serializedComplex);

// Resurrect complex data
const resurrectedComplex = new ComplexData().wakeFrom(serializedComplex);
console.log('Resurrected complex data:', resurrectedComplex);

// Example 4: Special number values
class SpecialNumbers extends Serializable {
  constructor() {
    super();
    this.nan = NaN;
    this.posInfinity = Infinity;
    this.negInfinity = -Infinity;
    this.negZero = -0;
    this.regularNumber = 123.456;
  }
}

// Create special numbers instance
const specialNums = new SpecialNumbers();
console.log('\nOriginal special numbers:');
console.log('NaN check:', Object.is(specialNums.nan, NaN));
console.log('Infinity check:', specialNums.posInfinity === Infinity);
console.log('Negative Infinity check:', specialNums.negInfinity === -Infinity);
console.log('Negative zero check:', Object.is(specialNums.negZero, -0));

// Serialize special numbers
const serializedSpecialNums = specialNums.serialize();
console.log('Serialized special numbers:', serializedSpecialNums);

// Resurrect special numbers
const resurrectedSpecialNums = new SpecialNumbers().wakeFrom(serializedSpecialNums);
console.log('Resurrected special numbers:');
console.log('NaN check:', Object.is(resurrectedSpecialNums.nan, NaN));
console.log('Infinity check:', resurrectedSpecialNums.posInfinity === Infinity);
console.log('Negative Infinity check:', resurrectedSpecialNums.negInfinity === -Infinity);
console.log('Negative zero converted to zero check:', resurrectedSpecialNums.negZero === 0);

// Example 5: Direct instantiation of abstract class (should fail)
try {
  const invalid = new Serializable();
  console.log('This should not appear ', invalid);
} catch (error) {
  console.log('\nError when instantiating abstract class (expected):', error.message);
}
