// 

class Hero {
    constructor() {
        console.log("A new hero is born!")
    }

}

class Warrior extends Hero {
   
    private _name: string;
    constructor(caracteristic:ICaracteristic) {
        super()
    }

    get name(): string {
        return this._name;
    }

    set name(n: string) {
        this._name=n;
    }

    sayName() {
        console.log("je suis " + this.name)
    }
}

// let w: Warrior;
// w = new  Warrior();
// w.name="zorgul";
// console.log(w.name);

interface ICaracteristic {
    strength: number;
    intelligence:number;
    weapon:string
}

const carac:ICaracteristic = {
    intelligence:1,
    strength:10,
    weapon:"Marteau"
}

const w = new Warrior(carac);

interface Isaveur {
    s1: string,
    s2: "Vanille" | "Chocolat",
    s3?:"Fraise"
}

const glace : Isaveur = {
    s1: "beurk",
    s2: "Chocolat",
    s3: "Fraise"
}
