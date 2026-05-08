const powerUsage = 30.0; // Value for Consumtion

const verNode = extend(PowerNode, "consuming-node", {
    
    setBars() {
        this.super$setBars();
    }
});

verNode.buildType = () => extend(PowerNode.PowerNodeBuild, verNode, {
    manualEff: 0.0,

    updateTile() {
        this.super$updateTile();

        if (this.power != null && this.power.graph != null) {
            let graph = this.power.graph;
            let totalProd = graph.getPowerProduction() + graph.getBatteryStored();
            let totalNeeded = graph.getPowerNeeded();

            if (totalProd > totalNeeded) {
                this.manualEff = 1.0;
            } else {
                this.manualEff = 0.0;
            }
        } else {
            this.manualEff = 0.0;
        }
    },

    getPowerProduction() {
        return -powerUsage / 60;
    }
});
