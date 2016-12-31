var roles = 
{
	harvester: require('role.harvester'),
	upgrader: require('role.upgrader'),
	builder: require('role.builder'),
	repairer: require('role.repairer'),
	wallRepairer: require('role.wallRepairer'),
	claimer: require('role.claimer'),
	miner: require('role.miner'),
	lorry: require('role.lorry')
};


Creep.prototype.run = 
function()
{
	roles[this.memory.role].run(this);
};


Creep.prototype.load =
/** @function 
	@param {bool} useContainer
	@param {bool} useSource */
function(fromStorage, fromSource)
{
/** @type {StructureContainer} */
		let container;
		// busca energia nos containers
		if (fromStorage) {
			// busca o container mais proximo
			container = this.pos.findClosestByPath
			(
				FIND_STRUCTURES, 
				{
					filter: s => 
						(
							s.structureType == STRUCTURE_CONTAINER || 
							s.structureType == STRUCTURE_STORAGE
						) && 
						s.store[RESOURCE_ENERGY] > 0
				}
			);
			// if one was found
			if (container != undefined) 
			{
				// tenta sugar energia, caso o container nao esteja perto,
				if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
				{
					// move para o container
					this.moveTo(container);
				}
			}
		}
		// se nao existem containeres e o creep deve buscar recursos das origens
		if (container == undefined && fromSource)
		{
			// busca o source mais proximo
			var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

			if (this.harvest(source) == ERR_NOT_IN_RANGE)
			{
				this.moveTo(source);
			}
		}

};