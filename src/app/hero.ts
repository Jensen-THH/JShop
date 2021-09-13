export interface Hero {
    _id: {
        $oid:string
    };
    name: string;
    price:{
        sale:string;
        old:string
    };
    // images:object;
    images:string[];
    
    sku:string;
    description:string;
    category:string;
    __v:number;
  }