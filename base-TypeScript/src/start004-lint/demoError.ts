(function() {
  interface person {
    name: string;
    age: number;
  }

  let tom: person = {
    name: 'Tom',
    age: 25
  };

  if (tom.age == 25) {
    console.log(tom.name + 'is 25 years old.');
  }
})();
