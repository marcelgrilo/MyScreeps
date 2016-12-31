/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.spawner');
 * mod.thing == 'a thing'; // true
 */

var roleSpawner = {


//TODO: mover para um modulo do gamecontroller.
	clear: function()
	{
		
	},

	/** @param {string} str **/
	spawnLog: function(str)
	{
		switch(str)
		{
			case -1: return "ERR_NOT_OWNER: You are not the owner of this spawn.";
			case -3: return "ERR_NAME_EXISTS: There is a creep with the same name already.";
			case -4: return "ERR_BUSY: The spawn is already in process of spawning another creep.";
			case -6: return "ERR_NOT_ENOUGH_ENERGY: The spawn and its extensions contain not enough energy to create a creep with the given body.";
			case -10: return "ERR_INVALID_ARGS: Body is not properly described";
			case -14: return "ERR_RCL_NOT_ENOUGH: Your Room Controller level is insufficient to use this spawn.";
			default: return str;
		}
		
	},



    /** @param {Spawn} spawn **/
    harvesterControl: function(spawn) {

		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

		if(harvesters.length < 5) {
			console.log('Harvesters: ' + harvesters.length);
			console.log(spawn);
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
			console.log('Spawning new harvester: ' + this.errLogger(newName));
		}
	},


	/** @param {Spawn} spawn **/
	upgraderControl: function(spawn) {

		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

		if(upgraders.length < 5) {
			console.log('Upgraders: ' + upgraders.length);
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
			console.log('Spawning new upgrader: ' + this.errLogger(newName));
		}

	},

		/** @param {Spawn} spawn **/
	builderControl: function(spawn) {

		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

		if(builders.length < 5) {
			console.log('builders: ' + builders.length);
			var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
			console.log('Spawning new builder: ' + this.errLogger(newName));
		}

	}
	
};

module.exports = roleSpawner;