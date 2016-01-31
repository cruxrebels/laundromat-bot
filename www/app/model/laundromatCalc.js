
var MachineStatus = {
	free: 0,
	engaged:1,
	outoforder:2
};
var MACHINE_TIMEOUT = 30
var washers = localStorage.getItem("Washer");
if (washers == null){
	washers = []
	for (i = 0; i < 35; ++i){
		washers.push({
			id: i,
			status: MachineStatus.free,
			engagedTime: new Date(2010, 01, 01, 0, 0, 0, 0)
		});
	}
	localStorage.setItem("Washer", JSON.stringify(washers));
}

var dryers = localStorage.getItem("Dryer");
if (dryers == null){
	dryers = []
	for (i = 0; i < 35; ++i){
		dryers.push({
			id: i,
			status: MachineStatus.free,
			engagedTime: new Date(2010, 01, 01, 0, 0, 0, 0)
		});
	}
	localStorage.setItem("Dryer", JSON.stringify(dryers));
}

function engageMachine(count, type){
	var machines = localStorage.getItem(type);
	machines = JSON.parse(machines);
	currentDate = new Date();
	for (var i =0; i < machines.length && count > 0; ++i){
		machine = machines[i]
		if (machine.status == MachineStatus.free){
			--count;
			machine.status = MachineStatus.engaged;
			machine.engagedTime = currentDate
		}
	}
	localStorage.setItem(type, JSON.stringify(machines));
}

function getAvailableDryer(){
	var machines = localStorage.getItem("Dryer");
	machines = JSON.parse(machines);
	for (var i =0; i < machines.length; ++i){
		machine = machines[i]
		if (machine.status == MachineStatus.free){
			return machine.id;
		}
	}
	return -1
}

function registerForUpdate(){
	function updater() {
		currentDate = new Date();
		var washers = localStorage.getItem("Washer");
		washers = JSON.parse(washers);
		var washer_state = {
			free: 0,
			freeIn: null,
			outoforder:0,
			nextGoIds: []
		};
		for (var i=0; i < washers.length; ++i){
			washer=washers[i];
			if (washer.status == MachineStatus.free){
				++washer_state.free;			
			}
			else if (washer.status == MachineStatus.engaged){
				var timeDiff = parseInt((currentDate.getTime() - new Date(washer.engagedTime).getTime())/1000);
				if (timeDiff >= MACHINE_TIMEOUT){
					washer.status = MachineStatus.free;
					++washer_state.free;
					id = getAvailableDryer();
					if (id != -1)
						engageMachine(1, "Dryer");
				}
				else{
					var freeIn = MACHINE_TIMEOUT - timeDiff;
					if (washer_state.freeIn == null){
						washer_state.freeIn = freeIn;
						washer_state.nextGoIds.push(washer.id);
					}
					else if (washer_state.freeIn == freeIn){
						washer_state.nextGoIds.push(washer.id);
					}
					else if (washer_state.freeIn > freeIn){
						washer_state.freeIn = freeIn;
						washer_state.nextGoIds = [];
						washer_state.nextGoIds.push(washer.id);
					}

				}
			}
			else
				++washer_state.outoforder;
		}
		var dryers = localStorage.getItem("Dryer");
		dryers = JSON.parse(dryers);
		var dryer_state = {
			free: 0,
			freeIn: null,
			outoforder:0,
			nextGoIds: []
		};
		for (var i=0; i < dryers.length; ++i){
			dryer=dryers[i];
			if (dryer.status == MachineStatus.free){
				++dryer_state.free;
			}
			else if (dryer.status == MachineStatus.engaged){
				var timeDiff = parseInt((currentDate.getTime() - new Date(dryer.engagedTime).getTime())/1000);
				if (timeDiff >= MACHINE_TIMEOUT){
					dryer.status = MachineStatus.free;
					++dryer_state.free;
				}
				else {
					var freeIn = MACHINE_TIMEOUT - timeDiff;
					if (dryer_state.freeIn == null){
						dryer_state.freeIn = freeIn;
						dryer_state.nextGoIds.push(dryer.id);
					}
					else if (dryer_state.freeIn == freeIn){
							dryer_state.nextGoIds.push(dryer.id);
					}
					else if (dryer_state.freeIn > freeIn){
							dryer_state.freeIn = freeIn;
							dryer_state.nextGoIds = [];
							dryer_state.nextGoIds.push(dryer.id);
					}
				}
			}
			else
				++dryer_state.outoforder;
		}
		$("#lblFreeWasherCount").text(washer_state.free.toString());
		$("#lblEngagedWasherCount").text((washers.length - washer_state.free - washer_state.outoforder).toString());
		if (washer_state.freeIn != null){
			$("#divWasherMSG").css("visibility", "visible")
			$("#lblWasherIds").text((washer_state.nextGoIds.length > 1 ? "Machines ": "Machine ") + washer_state.nextGoIds.join(", "));
			$("#lblWasherFreeIn").text(washer_state.freeIn.toString());
		}
		else
			$("#divWasherMSG").css("visibility", "hidden")
		$("#lblFreeDryerCount").text(dryer_state.free.toString());
		$("#lblEngagedDryerCount").text((dryers.length - dryer_state.free - dryer_state.outoforder).toString());
		if (dryer_state.freeIn != null){
			$("#divDryerMSG").css("visibility", "visible")
			$("#lblDryerIds").text((dryer_state.nextGoIds.length > 1 ? "Machines ": "Machine ") + dryer_state.nextGoIds.join(", "));
			$("#lblDryerFreeIn").text(dryer_state.freeIn.toString());
		}
		else
			$("#divDryerMSG").css("visibility", "hidden")
		
		localStorage.setItem("Washer", JSON.stringify(washers));
		localStorage.setItem("Dryer", JSON.stringify(dryers));
	}
	setInterval(updater, 3000)
}

