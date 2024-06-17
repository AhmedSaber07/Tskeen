export interface GetFlat {
    id: number;
    discreption:string;
    numberOfFloor:number;
    numberOfRooms:number;
    numberOfBathroom:number;
    thereIsWasher:boolean; 
    washerType: string;
    thereIsHeater: boolean;
    heaterType:string;
    tv:boolean;
    internet:boolean;
    images?:string[];
}
