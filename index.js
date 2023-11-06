const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};

function deepEqual(actual, expected, path = "") {
  const keys1 = Object.keys(actual);
  const keys2 = Object.keys(expected);

  if (keys1.length !== keys2.length) {
    throw new Error(`${path}Objects have different number of keys`);
  }

  for (let key of keys1) {
    if (!keys2.includes(key)) {
      throw new Error(`${path}Key "${key}" is missing in the expected object`);
    }

    if (typeof actual[key] === "object" && typeof expected[key] === "object") {
      deepEqual(actual[key], expected[key], `${path}${key}.`);
    } else if (actual[key] !== expected[key]) {
      throw new Error(
        `${path}Values for key "${key}" are not equal: actual="${actual[key]}", expected="${expected[key]}"`,
      );
    }
  }
}

try {
  deepEqual(obj1, obj1);
  console.log("OK");
} catch (error) {
  console.error("Error:", error.message);
}

try {
  deepEqual(obj1, obj2);
  console.log("OK");
} catch (error) {
  console.error("Error:", error.message);
}

try {
  deepEqual(obj1, obj3);
  console.log("OK");
} catch (error) {
  console.error("Error:", error.message);
}
