// 
class Hero {
    constructor() {
        console.log("A new hero is born!");
    }
}
class Warrior extends Hero {
    constructor(caracteristic) {
        super();
    }
    get name() {
        return this._name;
    }
    set name(n) {
        this._name = n;
    }
    sayName() {
        console.log("je suis " + this.name);
    }
}
const carac = {
    intelligence: 1,
    strength: 10,
    weapon: "Marteau"
};
const w = new Warrior(carac);
const glace = {
    s1: "beurk",
    s2: "Chocolat",
    s3: "Fraise"
};
