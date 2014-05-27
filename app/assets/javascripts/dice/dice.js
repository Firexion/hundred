function randomInt( intMin, intMax ) {
  intMax = Math.round( intMax );
  intMin = Math.round( intMin );
  return intMin + Math.floor( intMax * (Math.random() % 1));
}

function getRollDescription( multiplier, numRolls, numSides, beforeMultiplyBonus, afterMultiplyBonus ) {
  var description = "";

  if( multiplier > 1 && numRolls == 1 && beforeMultiplyBonus == 0 ) {
    numRolls = multiplier;
    multiplier = 1;
  }

  if( multiplier == 1 ) {
    beforeMultiplyBonus += afterMultiplyBonus;
    afterMultiplyBonus = 0;
  }

  if( multiplier > 1 ) {
    description += multiplier + " * ( ";
  }

  description += numRolls + "d" + numSides;

  if( beforeMultiplyBonus > 0 ) {
    description += " + " + beforeMultiplyBonus;
  } else if( beforeMultiplyBonus < 0 ) {
    description += " - " + Math.abs( beforeMultiplyBonus );
  }

  if( multiplier > 1 ) {
    description += " )";
  }

  if( afterMultiplyBonus > 0 ) {
    description += " + " + afterMultiplyBonus;
  }
  else if( afterMultiplyBonus < 0 ) {
    description += " - " + Math.abs( afterMultiplyBonus );
  }

  return description;
}



var diceBySystem = [
    [2,3,4,6,8,10,12,20,100],
    ['1k1', '2k1', '2k2', '3k2', '4k2']
  ];
