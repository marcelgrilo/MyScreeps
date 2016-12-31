require('prototype.creep');
require('prototype.tower');
require('prototype.spawn');
require('data');

module.exports.loop = function () 
{

	
	//limpa a memoria de creeps mortos//
	for(var name in Memory.creeps) {
			if(!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

	//builder controller//

	//creeps// 
	for(var name in Game.creeps) 
	{
		Game.creep[name].run();
	}

	//torres//
	var towers = _.filter(Game.structures,s=>s.structureType==STRUCTURE_TOWER);
	for(let tower of towers)
	{
		tower.defend();
	}

	//spawners//
	for(let spawnName in Game.spawns)
	{
		Game.spawns[spawnName].spawn();
	}

}