module.exports = 
{
		/** @param {Creep} creep */
	run: function(creep)
	{
		//se um creep esta trazendo energia para uma estrutura mas não possui mais energia//
		if (creep.memory.working == true && creep.carry.energy == 0) 
		{
			creep.memory.working = false;
		}
		// if creep is harvesting energy but is full//
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) 
		{
			// switch state
			creep.memory.working = true;
		}

		// working=true significa que o creep deve transferir sua energia para algo//
		if (creep.memory.working == true) 
		{
			// busca pelo spawn, extenssao ou torre mais proximo//
			var structure = creep.pos.findClosestByPath
			(
				FIND_MY_STRUCTURES, 
				{
					filter: (s) => 
					(
						s.structureType == STRUCTURE_SPAWN ||
						s.structureType == STRUCTURE_EXTENSION ||
						s.structureType == STRUCTURE_TOWER
					)
					&& s.energy < s.energyCapacity
				}
			);

			// strombolic bridge, drible da vaca//
			if (structure == undefined) 
			{
				structure = creep.room.storage;
			}

			//se qualquer estrutura foi encontrada//
			if (structure != undefined) 
			{
				//tenta a transferencia//
				if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
				{
					creep.moveTo(structure);
				}
			}
		}
		// caso o creep deva pegar energia do storage//
		else
		{
			creep.load(false, true);
		}
	}
};