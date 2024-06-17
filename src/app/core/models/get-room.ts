export interface GetRoom {
    id: number;
    description:string;
    airCondition:boolean;
    numberOfBeds:number;
    numberOfDisks:number;
    numberOfChairs:number; 
    numberOfCupboards: number;
    windowType: string;
    servicesPrice:number;
    insurancePrice:number;
    monthPrice:number;
    dayPrice:number;
    currentState:number;
    images?:string[];
}
