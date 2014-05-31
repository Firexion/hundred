function randomInt( intMin, intMax ) {
  intMax = Math.round( intMax );
  intMin = Math.round( intMin );
  return intMin + Math.floor( intMax * (Math.random() % 1));
}

function getRollDescription( multiplier, numRolls, numSides, beforeMultiplyBonus, afterMultiplyBonus ) {
  var description = "";

  if( multiplier > 1 && numRolls === 1 && beforeMultiplyBonus.value === 0 ) {
    numRolls = multiplier;
    multiplier = 1;
  }
/*
  if( multiplier === 1 ) {
    if ((beforeMultiplyBonus.op === '+' && afterMultiplyBonus.op === '+') ||
	    (beforeMultiplyBonus.op === '-' && afterMultiplyBonus.op === '-')) {
	  beforeMultiplyBonus.value += afterMultiplyBonus.value;
	} else {
	  beforeMultiplyBonus.value -= afterMultiplyBonus.value;
	  if (beforeMultiplyBonus.value > 0 && beforeMultiplyBonus.op === '-') {
		beforeMultiplyBonus.op = '+';
	  } else if (beforeMultiplyBonus.value < 0 && beforeMultiplyBonus.op === '+') {

	  }
	}
    afterMultiplyBonus.value = 0;
  }
*/
  if( multiplier > 1 ) {
    description += multiplier + " * ( ";
  }

  description += numRolls + "d" + numSides;

  if( beforeMultiplyBonus.value !== 0  ) {
    description += " " + beforeMultiplyBonus.op + " " + beforeMultiplyBonus.value;
  }

  if( multiplier > 1 ) {
    description += " )";
  }

  if( afterMultiplyBonus.value !== 0 ) {
    description += " " + afterMultiplyBonus.op + " " + afterMultiplyBonus.value;
  }

  return description;
}



function saveCustomRoll (roll) {
	var newRoll = {
	  name: roll.name,
	  id: savedRollsBySystem[0].length,
	  multiplier: roll.multiplier,
	  numRolls: roll.numRolls,
	  numSides: roll.numSides,
	  beforeMultiplyBonus: {value: roll.beforeMultiplyBonus.value, op: roll.beforeMultiplyBonus.op},
	  afterMultiplyBonus: {value: roll.afterMultiplyBonus.value, op: roll.afterMultiplyBonus.op},
	  display: function() {
	    return getRollDescription(this.multiplier,this.numRolls,this.numSides,this.beforeMultiplyBonus,this.afterMultiplyBonus);
	  }
	};

	savedRollsBySystem[0].push(newRoll);

}

function editCustomRoll (roll) {
	savedRollsBySystem[0][roll.id] = roll;

}

var diceBySystem = [
    [2,3,4,6,8,10,12,20,100],
    ['1k1', '2k1', '2k2', '3k2', '4k2']
  ];

var savedRollsBySystem = [
  [{
	name: "Perception [Wis]",
	id: 0,
	multiplier: 1,
	numRolls: 1,
	numSides: 20,
	beforeMultiplyBonus: {value: 4, op: '+'},
	afterMultiplyBonus: {value: 0, op: '+'},
	display: function() {
	  return getRollDescription(this.multiplier,this.numRolls,this.numSides,this.beforeMultiplyBonus,this.afterMultiplyBonus);
	}
  },
  {
	name: "Attack [Str]",
	id: 1,
	multiplier: 1,
	numRolls: 1,
	numSides: 20,
	beforeMultiplyBonus: {value: 0, op: '-'},
	afterMultiplyBonus: {value: 0, op: '+'},
	display: function() {
	  return getRollDescription(this.multiplier,this.numRolls,this.numSides,this.beforeMultiplyBonus,this.afterMultiplyBonus);
	}
  },
  {
	name: "Damage [Str]",
	id: 2,
	multiplier: 2,
	numRolls: 3,
	numSides: 8,
	beforeMultiplyBonus: {value: 5, op: '+'},
	afterMultiplyBonus: {value: 6, op: '-'},
	display: function() {
	  return getRollDescription(this.multiplier,this.numRolls,this.numSides,this.beforeMultiplyBonus,this.afterMultiplyBonus);
	}
  }
  ],
  []
];
