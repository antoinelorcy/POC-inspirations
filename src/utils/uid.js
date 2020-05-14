function uid() {
	function s4() {
	  const hexa = 16;
	  const multiplier = 0x10000;
	  return Math.floor((1 + Math.random()) * multiplier)
		.toString(hexa)
		.substring(1);
	}
	return (
	  s4() +
	  s4() +
	  "-" +
	  s4() +
	  "-" +
	  s4() +
	  "-" +
	  s4() +
	  "-" +
	  s4() +
	  s4() +
	  s4()
	);
  }
  
  export default uid;
  