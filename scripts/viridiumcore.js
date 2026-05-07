const powerProduction = 16666.65;
const generationType = Stat.basePowerGeneration;
const coreGetelos = extend(CoreBlock, "core-getelos", {
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
    setStats() {
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
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
const productionEfficiency = 1.0;
coreGetelos.buildType = () => extend(CoreBlock.CoreBuild, coreGetelos, {
    getPowerProduction() {
        return powerProduction * productionEfficiency;
    }
});
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
var healChance = 0.01;
var healBullets = 10;
var cone = 360;
var healBulletInaccuracy = 6;
var healBulletSound = Sounds.shootLaser;
