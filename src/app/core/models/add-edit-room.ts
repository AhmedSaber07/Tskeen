export interface AddEditRoom {
    Description: string;
    AirCondition:boolean;
    NumberOfBeds: number;
    NumberOfDisks:number;
    NumberOfChairs:number;
    NumberOfCupboards:number;
    WindowType:string;
    ServicesPrice:number;
    InsurancePrice:number; 
    MonthPrice:number;
    DayPrice:number;
    FlatId:number;
    RoomImagesFiles:File[];
}
