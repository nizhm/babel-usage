const fn = [].map.bind([1, 2, 3]);
fn((num => {
  const context = this;
  console.log(JSON.stringify(context));
  console.log(num)
}));
