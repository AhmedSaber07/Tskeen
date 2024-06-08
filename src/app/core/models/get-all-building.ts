export interface GetAllBuilding {
      id: number;
      name:string;
      address:string;
      image:string;
      description?:string, 
      userGender?: number,
      gas?: boolean,
      ownerId?: string,
}
