export interface ICategory {
    id: number;
    name: string;
    description: string;
    startColor: string;
    endColor: string;
    imgAddress: string;
    subCategories: [{name: string}];
}
