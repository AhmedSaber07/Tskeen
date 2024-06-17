export interface AddEditFlat {
    Description: string;
    NumberOfFloor:number;
    NumberOfRooms:number;
    NumberOfBathroom:number;
    ThereIsWasher:boolean;
    ThereIsHeater:boolean;
    TV:boolean;
    Internet:boolean;
    FlatImagesFile:File[];
    WasherType:string;
    HeaterType:string;
    BuildingId :number;
}
