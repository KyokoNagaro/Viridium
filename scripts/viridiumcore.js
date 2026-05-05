//9 amount of power per tick * 60 ticks(1 sec.) = 540 units of power in the game per second
const powerProduction = 16666.65;
//for stats
const generationType = Stat.basePowerGeneration;
const coreGetelos = extend(CoreBlock, "core-getelos", {
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
    
	//for stats
    setStats() {
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	
	//for bars
    setBars() {
        this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
            () => Core.bundle.format("bar.poweroutput", powerProduction * 60), 
            () => Pal.powerBar, 
            () => 1
        ));
    },
    baseExplosiveness: 10,
    thrusterLength: 46 / 4,
});

//efficiency multiplier 
const productionEfficiency = 1.0;
coreGetelos.buildType = () => extend(CoreBlock.CoreBuild, coreGetelos, {
	//endowing the core with the ability to produce power
    getPowerProduction() {
        return powerProduction * productionEfficiency;
    }
});
//the bullet being created
const healBullet = extend(LaserBoltBulletType, {
    width: 3,
    height: 10,
    speed: 6,
    lifetime: 42.5,
    collidesTeam: true,
    healPercent: 1.25,
    displayAmmoMultiplier: false,
    backColor: Pal.heal,
    frontColor: Color.white,
    damage: 30,
    homingPower: 0.1,
    homingRange: 60,
});
//chance of bullet creating
var healChance = 0.01;
//amount of bullets
var healBullets = 10;
//all bullets will be summoned around the core
var cone = 360;
//the inaccuracy of bullets
var healBulletInaccuracy = 6;
//shoot sound
var healBulletSound = Sounds.shootLaser;
