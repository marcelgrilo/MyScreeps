module.exports = 
{
	run: function (creep)
	{
		// busca o source.
		let source = Game.getObjectById(creep.memory.sourceId);
		// busca um container proximo ao source.
		let container = source.pos.findInRange
		(
			FIND_STRUCTURES, 
			1,
			{
				filter: s => s.structureType == STRUCTURE_CONTAINER
			}
		)[0];

		// se o creep estiver sobre o container
		if (creep.pos.isEqualTo(container.pos)) 
		{
			creep.harvest(source);
		}
		else 
		{
			creep.moveTo(container);
		}
	}
}